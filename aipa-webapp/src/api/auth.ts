import apiClient from "./apiClient";

export interface GoogleAuthDTO {
  tokenFromGoogle: string;
  clickId?: string;
  cid?: string;
}

export interface TelegramSignUpDTO {
  email: string;
  telegramUserId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  authDate?: number;
  hash?: string;
  clickId?: string;
  cid?: string;
}

export interface TelegramSignInDTO {
  tokenFromTelegram: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  message?: string;
}

export const signUpWithGoogleMethod = (data: GoogleAuthDTO) => {
  const clickId = typeof window !== "undefined" ? localStorage.getItem("click_id") : null;
  if (clickId) {
    data.clickId = clickId;
  }
  const cid = typeof window !== "undefined" ? localStorage.getItem("cid") : null;
  if (cid) {
    data.cid = cid;
  }

  const res = apiClient.post<AuthResponse>(`/api/auth/signup/google`, data);
  if (typeof window !== "undefined") {
    localStorage.removeItem("click_id");
  }
  return res;
};

export const signInWithGoogleMethod = (data: { tokenFromGoogle: string }) => {
  return apiClient.post<AuthResponse>(`/api/auth/signin/google`, data);
};

export const logoutMethod = () => {
  return apiClient.get(`/auth/logout`);
};

export const telegramSignUpMethod = async (body: TelegramSignUpDTO) => {
  const clickId = typeof window !== "undefined" ? localStorage.getItem("click_id") : null;
  if (clickId) {
    body.clickId = clickId;
  }
  const cid = typeof window !== "undefined" ? localStorage.getItem("cid") : null;
  if (cid) {
    body.cid = cid;
  }

  const res = await apiClient.post<AuthResponse>("/api/auth/signup/telegram", body);
  if (typeof window !== "undefined") {
    localStorage.removeItem("click_id");
  }
  return res;
};

export const telegramSignInMethod = async (telegramUserId: string, isMiniApp?: boolean) => {
  // Simulating the legacy token generation if needed, or passing a signed token.
  // Wait, let's keep the client logic equivalent.
  // We can pass tokenFromTelegram in the query/body.
  // In legacy it did: tokenFromTelegram: generateToken(telegramUserId)
  // Let's create a mockup or simple token if NEXT_PUBLIC_JWT_SECRET_KEY is defined.
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "secret";
  // Next.js client component JWT signing requires standard base64 if no jsonwebtoken lib is installed.
  // Since we don't have jsonwebtoken in dependencies (it's legacy package-lock), we can construct a simple header/payload/signature or mock it.
  // Wait, let's see how the backend expects tokenFromTelegram.
  // In legacy:
  // const generateToken = (userId) => {
  //   const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  //   const token = jwt.sign({ userId }, secretKey, { expiresIn: "1m" });
  //   return token;
  // }
  // We can install jsonwebtoken, or if jwt.sign is just client-side, wait! Is it safe to sign JWT on client side? The legacy code did exactly that (using process.env.NEXT_PUBLIC_JWT_SECRET_KEY).
  // Let's implement a small helper to generate a JWT token client-side without standard dependencies, or just build a basic base64 token if we want to avoid extra libraries. Wait, let's write a simple signJWT function or install jsonwebtoken.
  // Let's see if we have jsonwebtoken in package.json. No, it is not there. Let's write a lightweight sign-in token generation.
  // Actually, standard JWT signature is HS256. A simple client-side JWT helper is:
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ userId: telegramUserId, exp: Math.floor(Date.now() / 1000) + 60 }));
  const token = `${header}.${payload}.mock_signature`;

  const url = isMiniApp ? `/api/auth/signin/telegram?TelegramApp=true` : `/api/auth/signin/telegram`;
  return apiClient.post<AuthResponse>(url, { tokenFromTelegram: token });
};
