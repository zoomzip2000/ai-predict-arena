"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import BinanceCandleChart from "@/components/ui/BinanceCandleChart";
import { BinaryOptionsProvider, useBinaryOptions } from "@/contexts/BinaryOptionsContext";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/FormControl";
import { Card, CardBody } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { BetDirection } from "@/types/binaryOptions";
import { Clock, TrendUp, ShieldCheck } from "@phosphor-icons/react";

function BinaryOptionsContent() {
  const {
    timer,
    betPool,
    coefficients,
    bets,
    getSecondsTimerLeft,
    makeBet,
  } = useBinaryOptions();

  const [betAmount, setBetAmount] = useState<string>("10");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Timer countdown local display state
  const [timeLeft, setTimeLeft] = useState<number>(0);

  React.useEffect(() => {
    setTimeLeft(getSecondsTimerLeft());
    const interval = setInterval(() => {
      setTimeLeft(getSecondsTimerLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handlePlaceBet = async (direction: BetDirection) => {
    const amountVal = parseFloat(betAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      setFeedback({ type: "error", msg: "Введите корректную сумму" });
      return;
    }
    
    setIsSubmitting(true);
    setFeedback(null);
    
    const success = await makeBet(amountVal, direction);
    if (success) {
      setFeedback({ type: "success", msg: "Опцион успешно открыт!" });
      setTimeout(() => setFeedback(null), 3000);
    } else {
      setFeedback({ type: "error", msg: "Ошибка: недостаточно средств" });
    }
    setIsSubmitting(false);
  };

  const columns = [
    { key: "id", header: "ID сделки" },
    { key: "betDirection", header: "Направление", render: (r: any) => r.betDirection === "BID_UP" ? "▲ ВВЕРХ" : "▼ ВНИЗ" },
    { key: "betAmount", header: "Сумма (AIPA)", isNumeric: true, render: (r: any) => `${r.betAmount} AIPA` },
    { key: "status", header: "Статус", render: (r: any) => r.status === "ACTIVE" ? "Открыт" : "Закрыт" },
    { key: "winAmount", header: "Выплата", isNumeric: true, render: (r: any) => r.winAmount ? `${r.winAmount} AIPA` : "—" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
      {/* Chart Section */}
      <div className="lg:col-span-2 flex flex-col gap-6 w-full">
        <BinanceCandleChart />
        
        {/* User Open Options Bets Table */}
        <Card>
          <CardBody className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider margin-0 mb-2">
              Ваши опционы (Текущий раунд)
            </h3>
            <Table columns={columns} data={bets} />
          </CardBody>
        </Card>
      </div>

      {/* Bets Action Dashboard */}
      <aside className="flex flex-col gap-6 w-full">
        {/* Betting Panel */}
        <div className="nm-card p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-nm-border pb-4">
            <TrendUp size={20} className="text-secondary" />
            <h2 className="text-base font-extrabold text-text-primary margin-0">Панель управления</h2>
          </div>

          {/* Time & Pool Inset Displays */}
          <div className="grid grid-cols-2 gap-4">
            <div className="nm-card-inset p-3 text-center">
              <span className="text-[10px] text-text-muted block uppercase font-bold">Раунд</span>
              <span className="text-base font-bold text-text-primary mt-1 block">
                {timer.type === "BETS" ? "Прием ставок" : "Экспирация"}
              </span>
            </div>
            <div className="nm-card-inset p-3 text-center">
              <span className="text-[10px] text-text-muted block uppercase font-bold">Таймер</span>
              <span className="text-base font-mono font-bold text-secondary mt-1 block flex items-center justify-center gap-1">
                <Clock size={16} /> {timeLeft} сек
              </span>
            </div>
          </div>

          <div className="nm-card-inset p-4 text-center font-mono">
            <span className="text-[10px] text-text-muted block uppercase font-bold font-sans">Общий пул раунда</span>
            <span className="text-lg font-bold text-text-primary mt-1 block">
              {betPool.toLocaleString()} AIPA
            </span>
          </div>

          {/* Amount Input */}
          <Input
            label="Сумма опциона"
            type="number"
            placeholder="10.00"
            addonText="AIPA"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            disabled={isSubmitting || timer.type !== "BETS"}
          />

          {feedback && (
            <div className={`p-3 rounded-lg text-xs font-semibold ${
              feedback.type === "success" 
                ? "bg-success/10 text-success border border-success/20" 
                : "bg-danger/10 text-danger border border-danger/20"
            }`}>
              {feedback.msg}
            </div>
          )}

          {/* Actions Up/Down */}
          <div className="flex flex-col gap-3">
            <Button
              variant="success"
              size="lg"
              onClick={() => handlePlaceBet(BetDirection.Up)}
              disabled={isSubmitting || timer.type !== "BETS"}
              className="w-full flex items-center justify-center gap-2"
            >
              ВВЕРХ ({coefficients.up?.toFixed(2)}x)
            </Button>
            <Button
              variant="danger"
              size="lg"
              onClick={() => handlePlaceBet(BetDirection.Down)}
              disabled={isSubmitting || timer.type !== "BETS"}
              className="w-full flex items-center justify-center gap-2"
            >
              ВНИЗ ({coefficients.down?.toFixed(2)}x)
            </Button>
          </div>
        </div>

        {/* Security / Emulation Notice */}
        <div className="nm-card p-6 bg-gradient-to-br from-bg-secondary/40 to-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-secondary" />
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider margin-0">Эмуляция торгов</h4>
          </div>
          <p className="text-xs text-text-muted leading-relaxed margin-0">
            Все расчеты проводятся с использованием виртуального баланса AIPA. Опционы автоматически экспирируются каждую минуту по котировкам BTC/USDT Bybit.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default function BinaryOptionsPage() {
  return (
    <BinaryOptionsProvider>
      <Layout>
        <BinaryOptionsContent />
      </Layout>
    </BinaryOptionsProvider>
  );
}
