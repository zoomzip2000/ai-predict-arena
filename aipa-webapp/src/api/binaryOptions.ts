import apiClient from "./apiClient";
import { BetRecord, BetDirection } from "../types/binaryOptions";
import { BalanceType } from "../store/slices/userSlice";

export interface BinaryOptionBetDTO {
  amount: number;
  direction: BetDirection;
  balanceType: BalanceType;
}

export const makeABet = (data: BinaryOptionBetDTO) => {
  return apiClient.post<BetRecord[]>(`/api/binary-options/bid`, data);
};
