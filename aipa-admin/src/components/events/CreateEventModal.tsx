import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import { EventItem } from "../../store/slices/eventsSlice";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: EventItem) => void;
}

export default function CreateEventModal({ isOpen, onClose, onSave }: CreateEventModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Crypto");
  const [coefYes, setCoefYes] = useState("1.95");
  const [coefNo, setCoefNo] = useState("1.95");
  const [expTime, setExpTime] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !expTime) return;

    const newEvent: EventItem = {
      uuid: `event-${Date.now()}`,
      name,
      category,
      status: "UNPUBLISHED",
      coefficientYes: parseFloat(coefYes) || 1.95,
      coefficientNo: parseFloat(coefNo) || 1.95,
      resolution: null,
      expirationTime: new Date(expTime).toISOString(),
      imageLink: null,
    };

    onSave(newEvent);
    // Reset fields
    setName("");
    setCategory("Crypto");
    setCoefYes("1.95");
    setCoefNo("1.95");
    setExpTime("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg p-6 nm-card border border-nm-border z-10">
        <div className="flex items-center justify-between mb-4 border-b border-nm-border pb-3">
          <h3 className="text-lg font-extrabold text-text-dark mb-0">
            Создать новое предсказание
          </h3>
          <button 
            onClick={onClose} 
            className="btn-icon active border border-nm-border cursor-pointer p-1 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Question Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-text-body">Вопрос предсказания</label>
            <textarea
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control-nm"
              rows={3}
              placeholder="Например: Преодолеет ли Ethereum $10,000 к концу года?"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-body">Категория</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control-nm cursor-pointer"
              >
                <option value="Crypto">Crypto (Криптовалюты)</option>
                <option value="AI">AI (Нейросети)</option>
                <option value="Finance">Finance (Финансы)</option>
                <option value="Stocks">Stocks (Акции)</option>
                <option value="Space">Space (Космос)</option>
              </select>
            </div>

            {/* Expiration date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-body">Время завершения</label>
              <input
                type="datetime-local"
                value={expTime}
                onChange={(e) => setExpTime(e.target.value)}
                className="form-control-nm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Coefficient YES */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-body">Коэффициент ДА</label>
              <input
                type="number"
                step="0.01"
                min="1.01"
                value={coefYes}
                onChange={(e) => setCoefYes(e.target.value)}
                className="form-control-nm"
                required
              />
            </div>

            {/* Coefficient NO */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-body">Коэффициент НЕТ</label>
              <input
                type="number"
                step="0.01"
                min="1.01"
                value={coefNo}
                onChange={(e) => setCoefNo(e.target.value)}
                className="form-control-nm"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 border-t border-nm-border pt-4">
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
              Создать событие
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
