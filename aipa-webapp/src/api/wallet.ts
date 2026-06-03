import apiClient from "./apiClient";

export interface DepositAddressResponse {
  address: string;
  finishTransactionTime: string; // ISO datetime string or formatted string
}

export interface WithdrawFundsDTO {
  userAddress: string;
  amount: number;
  withdrawTime: string;
  code: string;
}

export interface CommissionResponse {
  commissionUSDT: number;
}

export interface PermissionsResponse {
  depositCryptoUSDT: "ON" | "OFF";
  depositP2p: "ON" | "OFF";
  depositExchanger: "ON" | "OFF";
  depositVisaEur: "ON" | "OFF";
  withdrawCryptoUSDT: "ON" | "OFF";
  withdrawP2p: "ON" | "OFF";
  withdrawExchanger: "ON" | "OFF";
  withdrawVisaEur: "ON" | "OFF";
}

export const generateAddressQrMethod = () => {
  return apiClient.get<string>("/api/deposit/generate");
};

export const borrowPaymentAddressMethod = (code: string) => {
  return apiClient.post<DepositAddressResponse>("/api/deposit/payment-address", { code });
};

export const withdrawFundsMethod = (data: WithdrawFundsDTO) => {
  return apiClient.post("/api/transaction/withdraw", {
    from: "0x1EcC8Dd323d9E8A3b1489f62c3734ee0c79beCDe",
    to: data.userAddress,
    operationTime: data.withdrawTime,
    amount: data.amount,
    validateCodeDto: {
      code: data.code,
    },
  });
};

export const getUsdtCommissionMethod = () => {
  return apiClient.get<CommissionResponse>("/api/transaction/check-commissionUSDT");
};

export const getDepositWithdrawPermissionsMethod = () => {
  return apiClient.get<PermissionsResponse>("/api/permissions");
};
