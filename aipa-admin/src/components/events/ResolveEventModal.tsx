import React from "react";
import { X, CheckCircle, Warning } from "@phosphor-icons/react";
import { EventItem } from "../../store/slices/eventsSlice";

interface ResolveEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onResolve: (uuid: string, resolution: "YES" | "NO") => void;
}

export default function ResolveEventModal({ isOpen, onClose, event, onResolve }: ResolveEventModalProps) {
  if (!isOpen || !event) return null;

  const handleChoose = (resolution: "YES" | "NO") => {
    if (window.confirm(`Вы уверены, что хотите рассчитать событие как "${resolution === "YES" ? "ДА" : "НЕТ"}"? Это действие необратимо и переведет балансы пользователей!`)) {
      onResolve(event.uuid, resolution);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md p-6 nm-card border border-nm-border z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-nm-border pb-3">
          <h3 className="text-lg font-extrabold text-text-dark mb-0">
            Расчет исхода предсказания
          </h3>
          <button 
            onClick={onClose} 
            className="btn-icon active border border-nm-border cursor-pointer p-1 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Warning info */}
        <div className="p-3 rounded-lg border border-nm-warning/20 bg-bg-light/10 text-xs flex gap-2.5 items-start">
          <Warning size={20} className="text-warning shrink-0" />
          <div>
            <p className="margin-0 font-bold text-text-dark">Внимание!</p>
            <p className="margin-0 text-text-muted mt-0.5 leading-relaxed">
              Выбор исхода события завершит прием ставок, рассчитает коэффициенты и начислит выигрыши на балансы пользователей.
            </p>
          </div>
        </div>

        {/* Event description */}
        <div className="p-4 nm-card-inset flex flex-col gap-1.5">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">ВОПРОС СОБЫТИЯ</span>
          <span className="text-sm font-bold text-text-dark">{event.name}</span>
        </div>

        {/* Resolution Options */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={() => handleChoose("YES")}
            className="btn-nm btn-nm-primary justify-center py-3 text-success border-success/30 hover:border-success hover:bg-success hover:text-white cursor-pointer"
          >
            <CheckCircle size={20} /> Рассчитать как "ДА"
          </button>

          <button
            onClick={() => handleChoose("NO")}
            className="btn-nm btn-nm-primary justify-center py-3 text-danger border-danger/30 hover:border-danger hover:bg-danger hover:text-white cursor-pointer"
          >
            <CheckCircle size={20} /> Рассчитать как "НЕТ"
          </button>
        </div>

        <div className="flex justify-end mt-2 border-t border-nm-border pt-3">
          <button onClick={onClose} className="btn-nm cursor-pointer">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
