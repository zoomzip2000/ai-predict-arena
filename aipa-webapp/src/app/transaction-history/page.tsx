"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Tabs from "@/components/ui/Tabs";
import { Table, Pagination } from "@/components/ui/Table";
import Preloader from "@/components/ui/Preloader";
import { useTransactionHistory, HistoryTab } from "@/hooks/useTransactionHistory";
import { TransactionItem, BidItem } from "@/api/transactionHistory";

export default function TransactionHistoryPage() {
  const {
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
  } = useTransactionHistory();

  const tabs = [
    { id: "deposit", label: "Депозиты" },
    { id: "withdrawal", label: "Выводы" },
    { id: "bids", label: "История ставок" },
  ];

  const formatTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timeStr;
    }
  };

  // 1. Column Specs for Deposits
  const depositColumns = [
    {
      header: "ID транзакции",
      key: "id",
      render: (row: TransactionItem) => <span className="text-text-secondary">#{row.id}</span>,
    },
    {
      header: "Дата и время",
      key: "operationTime",
      render: (row: TransactionItem) => <span>{formatTime(row.operationTime)}</span>,
    },
    {
      header: "Сумма",
      key: "amount",
      isNumeric: true,
      render: (row: TransactionItem) => (
        <span className="text-success font-extrabold">{row.amount.toLocaleString()} USDT</span>
      ),
    },
    {
      header: "Статус",
      key: "status",
      align: "center" as const,
      render: (row: TransactionItem) => {
        const isSuccess = row.status === "SUCCESS";
        return (
          <span
            className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-pill border ${
              isSuccess 
                ? "bg-success/10 border-success text-success" 
                : "bg-warning/10 border-warning text-warning"
            }`}
          >
            {isSuccess ? "Успешно" : "В обработке"}
          </span>
        );
      },
    },
  ];

  // 2. Column Specs for Withdrawals
  const withdrawColumns = [
    {
      header: "ID транзакции",
      key: "id",
      render: (row: TransactionItem) => <span className="text-text-secondary">#{row.id}</span>,
    },
    {
      header: "Дата и время",
      key: "operationTime",
      render: (row: TransactionItem) => <span>{formatTime(row.operationTime)}</span>,
    },
    {
      header: "Адрес вывода",
      key: "address",
      render: (row: TransactionItem) => (
        <span className="text-xs text-text-muted break-all select-all font-mono">
          {row.address || "TTr8x..."}
        </span>
      ),
    },
    {
      header: "Сумма",
      key: "amount",
      isNumeric: true,
      render: (row: TransactionItem) => (
        <span className="text-danger font-extrabold">{row.amount.toLocaleString()} USDT</span>
      ),
    },
    {
      header: "Статус",
      key: "status",
      align: "center" as const,
      render: (row: TransactionItem) => {
        const isSuccess = row.status === "SUCCESS";
        return (
          <span
            className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-pill border ${
              isSuccess 
                ? "bg-success/10 border-success text-success" 
                : "bg-warning/10 border-warning text-warning"
            }`}
          >
            {isSuccess ? "Выплачено" : "В обработке"}
          </span>
        );
      },
    },
  ];

  // 3. Column Specs for Bets History
  const bidColumns = [
    {
      header: "ID ставки",
      key: "id",
      render: (row: BidItem) => <span className="text-text-secondary">#{row.id}</span>,
    },
    {
      header: "Событие",
      key: "eventName",
      render: (row: BidItem) => <span className="font-bold text-text-primary">{row.eventName}</span>,
    },
    {
      header: "Прогноз",
      key: "prediction",
      render: (row: BidItem) => <span className="text-text-secondary">{row.prediction}</span>,
    },
    {
      header: "Кэф",
      key: "coefficient",
      isNumeric: true,
      render: (row: BidItem) => <span className="mono-data">x{row.coefficient.toFixed(2)}</span>,
    },
    {
      header: "Ставка",
      key: "amount",
      isNumeric: true,
      render: (row: BidItem) => <span className="mono-data">{row.amount.toLocaleString()} USDT</span>,
    },
    {
      header: "Результат",
      key: "status",
      align: "center" as const,
      render: (row: BidItem) => {
        const isWin = row.status === "WIN";
        const isPending = row.status === "PENDING";
        return (
          <span
            className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-pill border ${
              isWin 
                ? "bg-success/10 border-success text-success"
                : isPending 
                  ? "bg-warning/10 border-warning text-warning"
                  : "bg-danger/10 border-danger text-danger"
            }`}
          >
            {isWin ? "Выигрыш" : isPending ? "Ожидает" : "Проигрыш"}
          </span>
        );
      },
    },
  ];

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-10 py-8 select-none">
        {/* Navigation / Header Links for User Settings Dashboard */}
        <div className="flex items-center gap-6 mb-8 border-b border-nm-border pb-4">
          <a href="/account" className="text-sm font-semibold text-text-secondary hover:text-text-primary text-decoration-none transition-colors">
            Профиль
          </a>
          <span className="text-sm font-extrabold text-secondary border-b-2 border-secondary pb-4.5">
            История операций
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary mb-6">
          История транзакций и ставок
        </h1>

        {/* Tab Selection */}
        <div className="flex justify-start mb-6">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as HistoryTab)}
          />
        </div>

        {/* Tables Content Wrapper */}
        <div className="card p-6 rounded-lg border border-nm-border">
          {activeTab === "deposit" && (
            <>
              <Table columns={depositColumns} data={deposits} />
              {depositTotalPages > 1 && (
                <Pagination
                  currentPage={depositPage + 1}
                  totalPages={depositTotalPages}
                  onPageChange={(page) => fetchDeposits(page - 1)}
                />
              )}
            </>
          )}

          {activeTab === "withdrawal" && (
            <>
              <Table columns={withdrawColumns} data={withdrawals} />
              {withdrawTotalPages > 1 && (
                <Pagination
                  currentPage={withdrawPage + 1}
                  totalPages={withdrawTotalPages}
                  onPageChange={(page) => fetchWithdrawals(page - 1)}
                />
              )}
            </>
          )}

          {activeTab === "bids" && (
            <>
              <Table columns={bidColumns} data={bids} />
              {bidsTotalPages > 1 && (
                <Pagination
                  currentPage={bidsPage + 1}
                  totalPages={bidsTotalPages}
                  onPageChange={(page) => fetchBids(page - 1)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {isLoading && <Preloader />}
    </Layout>
  );
}
