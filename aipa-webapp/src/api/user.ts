import apiClient from "./apiClient";

export interface UserProfileInfo {
  id: string;
  username: string;
  balance: number;
  demoBalance: number;
  email?: string;
  twoFactorEnabled?: boolean;
  fromTelegram?: boolean;
}

export interface UserActivityItem {
  id: string | number;
  action: string;
  ipAddress: string;
  device: string;
  operationTime: string;
}

export interface UserSessionItem {
  id: string | number;
  ipAddress: string;
  device: string;
  location?: string;
  current?: boolean;
  lastActive: string;
}

export interface EditUsernameResponse {
  userId: string;
  token: string;
  refreshToken: string;
}

export const getUserInfoMethod = () => {
  return apiClient.get<UserProfileInfo>(`/api/profile`);
};

export const editUsernameMethod = (newUsername: string) => {
  return apiClient.put<EditUsernameResponse>(`/api/profile/username?newUsername=${newUsername}`);
};

export const getUserActivityMethod = () => {
  return apiClient.get<UserActivityItem[]>(`/api/profile/activity`);
};

export const getUserSessionsMethod = () => {
  return apiClient.get<UserSessionItem[]>(`/api/profile/session`);
};

export const terminateUserSessionMethod = (id: string | number) => {
  return apiClient.delete(`/api/profile/session?idSession=${id}`);
};

export const getUserBalanceMethod = () => {
  return apiClient.get<{ balance: number }>("/api/profile/balance");
};

export const checkUserEmailAvailabilityMethod = (email: string) => {
  return apiClient.post<{ available: boolean }>(`/api/auth/email-availability?email=${email}`);
};
