import React, { useState } from "react";
import { X, ShieldCheck, ShieldWarning } from "@phosphor-icons/react";
import { UserItem } from "../../store/slices/usersSlice";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserItem | null;
}

export default function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"info" | "history" | "bids">("info");

  if (!isOpen || !user) return null;

  // Mock operations history
  const mockHistory = [
    { type: "DEPOSIT", amount: 1500, status: "SUCCESS", date: "2026-05-12 14:20" },
    { type: "WITHDRAW", amount: 500, status: "SUCCESS", date: "2026-05-20 18:45" },
    { type: "DEPOSIT", amount: 200, status: "SUCCESS", date: "2026-06-01 09:12" },
  ];

  const mockBids = [
    { eventName: "Биткоин выше $150k в 2026?", prediction: "YES", coef: 1.85, amount: 100, result: "PENDING", date: "2026-06-02" },
    { eventName: "GPT-5 до конца лета 2026?", prediction: "YES", coef: 1.95, amount: 50, result: "WIN", date: "2026-05-28" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl p-6 nm-card border border-nm-border z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-nm-border pb-3">
          <h3 className="text-lg font-extrabold text-text-dark mb-0">
            Детали пользователя @{user.username}
          </h3>
          <button 
            onClick={onClose} 
            className="btn-icon active border border-nm-border cursor-pointer p-1 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-nm-border pb-2">
          {(["info", "history", "bids"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-sm font-bold border-none bg-transparent cursor-pointer transition-all ${
                activeTab === tab 
                  ? "text-secondary border-b-2 border-secondary font-black" 
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {tab === "info" ? "Основная информация" : tab === "history" ? "История операций" : "История прогнозов"}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="min-h-[250px] overflow-y-auto">
          {activeTab === "info" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="nm-card-inset p-4 flex flex-col gap-2">
                <span className="text-xs text-text-muted font-bold">ИМЯ ПОЛЬЗОВАТЕЛЯ</span>
                <span className="text-sm font-bold text-text-dark">@{user.username}</span>
                
                <span className="text-xs text-text-muted font-bold mt-2">EMAIL АДРЕС</span>
                <span className="text-sm font-bold text-text-dark">{user.email}</span>
                
                <span className="text-xs text-text-muted font-bold mt-2">РОЛЬ В СИСТЕМЕ</span>
                <span className="text-sm font-bold text-text-dark">{user.role}</span>
              </div>

              <div className="nm-card-inset p-4 flex flex-col gap-2">
                <span className="text-xs text-text-muted font-bold">РЕАЛЬНЫЙ БАЛАНС</span>
                <span className="text-sm font-black text-text-dark">{user.balance.toLocaleString()} USDT</span>
                
                <span className="text-xs text-text-muted font-bold mt-2">ДЕМО БАЛАНС</span>
                <span className="text-sm font-black text-text-dark">{user.demoBalance.toLocaleString()} USDT</span>

                <span className="text-xs text-text-muted font-bold mt-2">2FA ЗАЩИТА</span>
                <div className="flex items-center gap-1.5 text-sm font-bold">
                  {user.twoFactorEnabled ? (
                    <span className="text-success flex items-center gap-1"><ShieldCheck size={18} /> Подключена</span>
                  ) : (
                    <span className="text-text-muted flex items-center gap-1"><ShieldWarning size={18} /> Отключена</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <table className="table-nm">
              <thead>
                <tr>
                  <th>Тип</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {mockHistory.map((item, idx) => (
                  <tr key={idx}>
                    <td className="font-bold">{item.type === "DEPOSIT" ? "Депозит" : "Вывод средств"}</td>
                    <td className={item.type === "DEPOSIT" ? "text-success font-bold" : "text-danger font-bold"}>
                      {item.type === "DEPOSIT" ? "+" : "-"}{item.amount} USDT
                    </td>
                    <td><span className="badge-nm badge-nm-success">{item.status}</span></td>
                    <td className="text-xs">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "bids" && (
            <table className="table-nm">
              <thead>
                <tr>
                  <th>Событие</th>
                  <th>Прогноз</th>
                  <th>Коэффициент</th>
                  <th>Сумма</th>
                  <th>Результат</th>
                </tr>
              </thead>
              <tbody>
                {mockBids.map((bid, idx) => (
                  <tr key={idx}>
                    <td className="max-w-[200px] truncate font-bold text-xs">{bid.eventName}</td>
                    <td className="text-xs">{bid.prediction}</td>
                    <td className="mono-data">x{bid.coef.toFixed(2)}</td>
                    <td className="font-bold">{bid.amount} USDT</td>
                    <td>
                      <span className={`badge-nm ${bid.result === "WIN" ? "badge-nm-success" : "badge-nm-warning"}`}>
                        {bid.result === "WIN" ? "Выигрыш" : "В ожидании"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-end mt-2">
          <button onClick={onClose} className="btn-nm cursor-pointer">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
