import axios from "axios";

// Helpers inside the API module to maintain modularity & separation of concerns
const formatDateTimeForHeader = (date: Date, url?: string): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  
  const timezoneOffsetMinutes = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffsetMinutes / 60));
  const timezoneSign = timezoneOffsetMinutes < 0 ? "+" : "-";
  const timezone = `${timezoneSign}${String(timezoneOffsetHours).padStart(2, "0")}00`;

  if (url === "/api/deposit/payment-address") {
    return `${day}-${month}-${year} ${hours}:${minutes} ${timezone}`;
  }
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const getPublicIp = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;
  const cachedIp = localStorage.getItem("publicIp");
  if (cachedIp) return cachedIp;

  try {
    const response = await axios.get("https://api.ipify.org?format=json", { timeout: 3000 });
    const ip = response.data.ip;
    localStorage.setItem("publicIp", ip);
    return ip;
  } catch (error) {
    console.error("Error fetching public IP:", error);
    return null;
  }
};

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://api.mycoin-pm.com";

const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer_${token}`;
      }
      
      config.headers["X-Local-DateTime"] = formatDateTimeForHeader(new Date(), config.url);
      
      const ip = await getPublicIp();
      if (ip) {
        config.headers["X-Forwarded-For"] = ip;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorStatus = error.response?.status;
    const errorMessage = error.response?.data?.message || "";

    if (errorStatus === 401 || errorStatus === 403) {
      if (errorMessage === "User is blocked" || errorMessage === "User is deleted") {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/sign-in";
        }
        return Promise.reject(error);
      }

      // Refresh token logic
      if (!error.config._retry) {
        error.config._retry = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const res = await axios.post(
              "/api/auth/refreshtoken",
              { refreshToken },
              {
                baseURL,
                headers: {
                  "Is-Admin": "false",
                },
              }
            );
            const newToken = res.data.token;
            const newRefreshToken = res.data.refreshToken;
            
            localStorage.setItem("token", newToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            
            error.config.headers["Authorization"] = `Bearer_${newToken}`;
            return apiClient.request(error.config);
          }
        } catch (err) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/sign-in";
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { formatDateTimeForHeader, getPublicIp };
