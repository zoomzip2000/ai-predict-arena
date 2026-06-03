import apiClient from "./apiClient";

export interface GoogleTwoFAData {
  qrCodeImage: string; // Base64 image
  secretKey: string;
}

export interface ToggleTwoFAResponse {
  status: number;
  message?: string;
}

export const generateGoogleTwoFAQr = () => {
  return apiClient.get<GoogleTwoFAData>(`/api/code/generate`);
};

export const turnOnTwoFAMethod = (code: string) => {
  return apiClient.put<ToggleTwoFAResponse>("/api/code/on", { code });
};

export const validate2FACodeMethod = (code: string) => {
  return apiClient.post<boolean>("/api/code/validate", { code });
};

export const checkTwoFAEnabledMethod = () => {
  return apiClient.post<{ message: string }>("/api/code/bunch");
};

export const disableGoogleTwoFA = (code: string) => {
  return apiClient.put<ToggleTwoFAResponse>(`/api/code/off`, { code });
};
