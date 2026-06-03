import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Users, Calendar, Coins, ChartLineUp } from "@phosphor-icons/react";

export default function Home() {
  const users = useSelector((state: RootState) => state.users.list);
  const events = useSelector((state: RootState) => state.events.list);

  const activeEventsCount = events.filter((e) => e.status === "ACTIVE").length;
  const totalUsers = users.length;
  const blockedUsers = users.filter((u) => u.blocked).length;

  const cards = [
    {
      title: "Всего пользователей",
      value: totalUsers,
      subtext: `${blockedUsers} заблокировано`,
      icon: Users,
      color: "var(--nm-secondary)",
    },
    {
      title: "Активные предсказания",
      value: activeEventsCount,
      subtext: `${events.length} всего в системе`,
      icon: Calendar,
      color: "var(--nm-success)",
    },
    {
      title: "Общий оборот системы",
      value: "148,250 USDT",
      subtext: "+12.5% за эту неделю",
      icon: Coins,
      color: "var(--nm-info)",
    },
    {
      title: "Средняя маржа пулов",
      value: "5.0 %",
      subtext: "Комиссия на выигрыши",
      icon: ChartLineUp,
      color: "var(--nm-warning)",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-text-dark mb-1">
          Панель управления
        </h1>
        <p className="text-sm text-text-muted">
          Добро пожаловать в административную консоль AI Predict Arena
        </p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="nm-card flex items-center justify-between p-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  {card.title}
                </span>
                <span className="text-2xl font-black text-text-dark">
                  {card.value}
                </span>
                <span className="text-xs text-text-muted">
                  {card.subtext}
                </span>
              </div>
              <div 
                className="p-4 rounded-xl border border-nm-border nm-card-inset flex justify-center items-center"
                style={{ color: card.color }}
              >
                <Icon size={28} weight="bold" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Platform activity logs */}
        <div className="nm-card lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-lg font-extrabold text-text-dark mb-0">
            Последняя активность
          </h2>
          <hr className="border-nm-border my-0" />
          
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start p-3 rounded-lg border border-nm-border bg-bg-light/10">
              <div>
                <span className="text-xs font-bold text-text-muted">15 минут назад</span>
                <p className="text-sm text-text-dark mb-0 font-medium">Пользователь <b>alex_predict</b> сделал ставку <b>50 USDT</b> на событие #event-1</p>
              </div>
              <span className="badge-nm badge-nm-success">Ставка</span>
            </div>
            <div className="flex justify-between items-start p-3 rounded-lg border border-nm-border bg-bg-light/10">
              <div>
                <span className="text-xs font-bold text-text-muted">1 час назад</span>
                <p className="text-sm text-text-dark mb-0 font-medium">Пользователь <b>dmitry_trader</b> был заблокирован администратором</p>
              </div>
              <span className="badge-nm badge-nm-danger">Блок</span>
            </div>
            <div className="flex justify-between items-start p-3 rounded-lg border border-nm-border bg-bg-light/10">
              <div>
                <span className="text-xs font-bold text-text-muted">3 часа назад</span>
                <p className="text-sm text-text-dark mb-0 font-medium">Событие #event-6 рассчитано с результатом <b>YES</b></p>
              </div>
              <span className="badge-nm badge-nm-warning">Расчет</span>
            </div>
          </div>
        </div>

        {/* Quick configuration card */}
        <div className="nm-card flex flex-col gap-4">
          <h2 className="text-lg font-extrabold text-text-dark mb-0">
            Конфигурация
          </h2>
          <hr className="border-nm-border my-0" />
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-text-dark">Прием ставок</span>
                <p className="text-xs text-text-muted mb-0">Глобальная блокировка операций</p>
              </div>
              <span className="badge-nm badge-nm-success font-bold">Активно</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-text-dark">Бинарные опционы</span>
                <p className="text-xs text-text-muted mb-0">Трансляция Binance котировок</p>
              </div>
              <span className="badge-nm badge-nm-success font-bold">Включено</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-text-dark">Режим обслуживания</span>
                <p className="text-xs text-text-muted mb-0">Только для администраторов</p>
              </div>
              <span className="badge-nm badge-nm-danger font-bold">Выключен</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
