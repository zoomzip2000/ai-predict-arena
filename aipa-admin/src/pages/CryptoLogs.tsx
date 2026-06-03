import React, { useState } from "react";
import { Check, X, ShieldCheck, ArrowSquareDown, ArrowSquareUp } from "@phosphor-icons/react";

interface CryptoTransaction {
  id: string;
  username: string;
  type: "DEPOSIT" | "WITHDRAWAL";
  amount: number;
  currency: string;
  address: string;
  txid: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUCCESS";
  date: string;
}

const initialTxList: CryptoTransaction[] = [
  {
    id: "tx-101",
    username: "alex_predict",
    type: "DEPOSIT",
    amount: 1500,
    currency: "USDT (TRC20)",
    address: "TTr8xZ4hQ65pG9hKjLmNoPqRsTuVwXyZ12",
    txid: "9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a",
    status: "SUCCESS",
    date: "2026-06-03 14:15",
  },
  {
    id: "tx-102",
    username: "mary_option",
    type: "WITHDRAWAL",
    amount: 850,
    currency: "USDT (TRC20)",
    address: "THyP67xKmZ90oPlKjGtRqWeTyUioPaSl98",
    txid: "pending_approval",
    status: "PENDING",
    date: "2026-06-03 16:30",
  },
  {
    id: "tx-103",
    username: "dmitry_trader",
    type: "WITHDRAWAL",
    amount: 120,
    currency: "USDT (TRC20)",
    address: "TUiOpLo98yT56Re43EwQ21AsDfGhJkLzXv",
    txid: "rejected_by_admin",
    status: "REJECTED",
    date: "2026-06-02 11:20",
  },
  {
    id: "tx-104",
    username: "crypto_max",
    type: "DEPOSIT",
    amount: 500,
    currency: "USDT (TRC20)",
    address: "TTr8xZ4hQ65pG9hKjLmNoPqRsTuVwXyZ12",
    txid: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d",
    status: "SUCCESS",
    date: "2026-06-01 19:40",
  },
];

export default function CryptoLogs() {
  const [txList, setTxList] = useState<CryptoTransaction[]>(initialTxList);

  const handleApprove = (id: string) => {
    if (window.confirm("Одобрить транзакцию вывода средств и отправить в блокчейн?")) {
      setTxList(
        txList.map((tx) =>
          tx.id === id
            ? { ...tx, status: "APPROVED", txid: "0x" + Math.random().toString(16).substr(2, 64) }
            : tx
        )
      );
    }
  };

  const handleReject = (id: string) => {
    if (window.confirm("Отклонить запрос на вывод средств и вернуть баланс пользователю?")) {
      setTxList(txList.map((tx) => (tx.id === id ? { ...tx, status: "REJECTED" } : tx)));
    }
  };

  const getStatusBadge = (status: CryptoTransaction["status"]) => {
    switch (status) {
      case "SUCCESS":
      case "APPROVED":
        return <span className="badge-nm badge-nm-success">Выполнено</span>;
      case "PENDING":
        return <span className="badge-nm badge-nm-warning">Ожидает</span>;
      case "REJECTED":
        return <span className="badge-nm badge-nm-danger">Отклонено</span>;
      default:
        return <span className="badge-nm">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-text-dark mb-1">
          Крипто процессинг и лог транзакций
        </h1>
        <p className="text-sm text-text-muted">
          Мониторинг автоматических депозитов USDT TRC-20 и ручное одобрение/отклонение заявок на вывод средств
        </p>
      </div>

      {/* Transactions Table Card */}
      <div className="nm-card p-6">
        <div className="overflow-x-auto">
          <table className="table-nm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Тип</th>
                <th>Пользователь</th>
                <th>Сумма</th>
                <th>Адрес получателя / Хэш TXID</th>
                <th>Дата</th>
                <th>Статус</th>
                <th style={{ textAlign: "right" }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {txList.map((tx) => (
                <tr key={tx.id}>
                  <td className="font-bold">#{tx.id}</td>
                  <td>
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      {tx.type === "DEPOSIT" ? (
                        <span className="text-success flex items-center gap-1">
                          <ArrowSquareDown size={18} /> Депозит
                        </span>
                      ) : (
                        <span className="text-danger flex items-center gap-1">
                          <ArrowSquareUp size={18} /> Вывод
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="font-bold text-text-dark">@{tx.username}</span>
                  </td>
                  <td className="font-black text-sm">{tx.amount.toLocaleString()} USDT</td>
                  <td>
                    <span className="block text-xs font-mono text-text-muted break-all max-w-xs truncate" title={tx.address}>
                      <b>Адрес:</b> {tx.address}
                    </span>
                    <span className="block text-[10px] font-mono text-text-gray break-all max-w-xs truncate mt-0.5" title={tx.txid}>
                      <b>TXID:</b> {tx.txid}
                    </span>
                  </td>
                  <td className="text-xs">{tx.date}</td>
                  <td>{getStatusBadge(tx.status)}</td>
                  <td style={{ textAlign: "right" }}>
                    {tx.status === "PENDING" ? (
                      <div className="inline-flex gap-2">
                        {/* Approve */}
                        <button
                          onClick={() => handleApprove(tx.id)}
                          className="btn-nm p-2 border-nm-border cursor-pointer rounded-lg text-success"
                          title="Одобрить выплату"
                        >
                          <Check size={16} />
                        </button>
                        {/* Reject */}
                        <button
                          onClick={() => handleReject(tx.id)}
                          className="btn-nm p-2 border-nm-border cursor-pointer rounded-lg text-danger"
                          title="Отклонить запрос"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-text-muted text-xs font-bold flex items-center justify-end gap-1">
                        <ShieldCheck size={16} /> Обработано
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
