import apiClient from "./apiClient";

export interface TransactionItem {
  id: string | number;
  amount: number;
  currency?: string;
  status: "SUCCESS" | "PENDING" | "FAILED" | "CANCELED";
  operationTime: string;
  address?: string;
  txHash?: string;
}

export interface BidItem {
  id: string | number;
  eventName: string;
  prediction: string;
  amount: number;
  coefficient: number;
  status: "WIN" | "LOSE" | "PENDING" | "CANCELED";
  operationTime: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page index
}

export const getDepositeList = (page: number) => {
  return apiClient.get<PaginatedResponse<TransactionItem>>(
    `/api/profile/history/deposit${page !== undefined ? `?page=${page}` : ""}`
  );
};

export const getWithdrawList = (page: number) => {
  return apiClient.get<PaginatedResponse<TransactionItem>>(
    `/api/profile/history/withdraw${page !== undefined ? `?page=${page}` : ""}`
  );
};

export const getBidsList = (page: number, lang?: string) => {
  return apiClient.get<PaginatedResponse<BidItem>>(
    `/api/profile/history/bid${page !== undefined ? `?page=${page}` : ""}`,
    {
      headers: {
        "X-localization": lang ? lang.toLowerCase() : "en",
      },
    }
  );
};
