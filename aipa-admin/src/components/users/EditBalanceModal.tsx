import React, { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import { UserItem } from "../../store/slices/usersSlice";

interface EditBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserItem | null;
  onSave: (id: number, amount: number, isDemo: boolean) => void;
}

export default function EditBalanceModal({ isOpen, onClose, user, onSave }: EditBalanceModalProps) {
  const [balanceVal, setBalanceVal] = useState("0");
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (user) {
      setBalanceVal((isDemo ? user.demoBalance : user.balance).toString());
    }
  }, [user, isDemo]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(balanceVal);
    if (!isNaN(parsedAmount)) {
      onSave(user.id, parsedAmount, isDemo);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md p-6 nm-card border border-nm-border z-10">
        <div className="flex items-center justify-between mb-4 border-b border-nm-border pb-3">
          <h3 className="text-lg font-extrabold text-text-dark mb-0">
            Редактирование баланса
          </h3>
          <button 
            onClick={onClose} 
            className="btn-icon active border border-nm-border cursor-pointer p-1 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="p-3 rounded-lg border border-nm-border bg-bg-light/10 text-xs">
            Користувач: <b className="text-text-dark">@{user.username}</b> ({user.email})
          </div>

          {/* Balance Type Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-text-body">Тип баланса</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsDemo(false)}
                className={`py-2 rounded-lg border text-sm font-bold cursor-pointer transition-all ${
                  !isDemo 
                    ? "nm-card-inset text-secondary" 
                    : "nm-card text-text-muted border-nm-border"
                }`}
              >
                Реальный (USDT)
              </button>
              <button
                type="button"
                onClick={() => setIsDemo(true)}
                className={`py-2 rounded-lg border text-sm font-bold cursor-pointer transition-all ${
                  isDemo 
                    ? "nm-card-inset text-secondary" 
                    : "nm-card text-text-muted border-nm-border"
                }`}
              >
                Демо (USDT)
              </button>
            </div>
          </div>

          {/* Amount input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-text-body">Сумма баланса</label>
            <input
              type="number"
              step="any"
              value={balanceVal}
              onChange={(e) => setBalanceVal(e.target.value)}
              className="form-control-nm"
              placeholder="0.00"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-nm cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-nm btn-nm-primary cursor-pointer"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
