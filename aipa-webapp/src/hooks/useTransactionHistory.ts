import { useState, useEffect } from "react";
import {
  getDepositeList,
  getWithdrawList,
  getBidsList,
  TransactionItem,
  BidItem,
} from "../api/transactionHistory";

export type HistoryTab = "deposit" | "withdrawal" | "bids";

export const useTransactionHistory = () => {
  const [activeTab, setActiveTab] = useState<HistoryTab>("deposit");
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [deposits, setDeposits] = useState<TransactionItem[]>([]);
  const [withdrawals, setWithdrawals] = useState<TransactionItem[]>([]);
  const [bids, setBids] = useState<BidItem[]>([]);

  // Pagination states (API uses 0-indexed pages)
  const [depositPage, setDepositPage] = useState(0);
  const [withdrawPage, setWithdrawPage] = useState(0);
  const [bidsPage, setBidsPage] = useState(0);

  const [depositTotalPages, setDepositTotalPages] = useState(1);
  const [withdrawTotalPages, setWithdrawTotalPages] = useState(1);
  const [bidsTotalPages, setBidsTotalPages] = useState(1);

  const fetchDeposits = async (page: number) => {
    try {
      setIsLoading(true);
      const res = await getDepositeList(page);
      if (res?.status === 200) {
        setDeposits(res.data.content || []);
        setDepositTotalPages(res.data.totalPages || 1);
        setDepositPage(page);
      }
    } catch (e) {
      console.error("Error fetching deposits:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWithdrawals = async (page: number) => {
    try {
      setIsLoading(true);
      const res = await getWithdrawList(page);
      if (res?.status === 200) {
        setWithdrawals(res.data.content || []);
        setWithdrawTotalPages(res.data.totalPages || 1);
        setWithdrawPage(page);
      }
    } catch (e) {
      console.error("Error fetching withdrawals:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBids = async (page: number) => {
    try {
      setIsLoading(true);
      const res = await getBidsList(page, "ru");
      if (res?.status === 200) {
        setBids(res.data.content || []);
        setBidsTotalPages(res.data.totalPages || 1);
        setBidsPage(page);
      }
    } catch (e) {
      console.error("Error fetching bids:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // On tab switch, trigger fetch if lists are empty
  useEffect(() => {
    if (activeTab === "deposit" && deposits.length === 0) {
      fetchDeposits(0);
    } else if (activeTab === "withdrawal" && withdrawals.length === 0) {
      fetchWithdrawals(0);
    } else if (activeTab === "bids" && bids.length === 0) {
      fetchBids(0);
    }
  }, [activeTab]);

  // Initial load
  useEffect(() => {
    fetchDeposits(0);
    fetchWithdrawals(0);
    fetchBids(0);
  }, []);

  return {
    activeTab,
    setActiveTab,
    isLoading,
    deposits,
    withdrawals,
    bids,
    depositPage,
    withdrawPage,
    bidsPage,
    depositTotalPages,
    withdrawTotalPages,
    bidsTotalPages,
    fetchDeposits,
    fetchWithdrawals,
    fetchBids,
  };
};
