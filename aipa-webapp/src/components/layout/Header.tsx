"use client";

import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { User, CurrencyDollar, Play, Moon, Sun, List } from "@phosphor-icons/react";
import { setBalanceInUse, BalanceType } from "@/store/slices/userSlice";
import { setOpenMobMenuAction } from "@/store/slices/mainSlice";
import { RootState, AppDispatch } from "@/store";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const balanceInUse = useSelector((state: RootState) => state.user.balanceInUse);
  const [theme, setTheme] = React.useState<"dark" | "light">("light");

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      const htmlEl = document.documentElement;
      if (nextTheme === "light") {
        htmlEl.classList.add("light");
      } else {
        htmlEl.classList.remove("light");
      }
    }
  };

  const handleBalanceToggle = () => {
    const nextType = balanceInUse === BalanceType.Demo ? BalanceType.Real : BalanceType.Demo;
    dispatch(setBalanceInUse(nextType));
  };

  const getBalance = () => {
    if (!userInfo) return "12,450"; // default mock
    return balanceInUse === BalanceType.Demo 
      ? userInfo.demoBalance.toLocaleString() 
      : userInfo.balance.toLocaleString();
  };

  return (
    <header className="kit-header select-none">
      <Link href="/" className="kit-logo text-decoration-none">
        AI Predict <span className="text-secondary font-bold">Arena</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link href="/binary-options" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors text-decoration-none">
          Опционы
        </Link>
        <Link href="/events" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors text-decoration-none">
          События
        </Link>
        <Link href="/withdrawal" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors text-decoration-none">
          Депозит/Вывод
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        {/* Toggle Balance Type Button */}
        <div 
          onClick={handleBalanceToggle}
          className="flex items-center gap-2 bg-bg-secondary px-4 py-1.5 rounded-pill cursor-pointer border border-nm-border hover:shadow-soft-sm nm-shadow-inset-sm transition-all"
        >
          <CurrencyDollar className="text-secondary icon-sm" />
          <span className="mono-data font-bold text-text-primary text-sm">{getBalance()}</span>
          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-bg-white/10 text-secondary">
            {balanceInUse === BalanceType.Demo ? "Demo" : "USDT"}
          </span>
        </div>

        {/* Stream Overlay Link */}
        <Link 
          href="/stream" 
          className="btn btn-secondary btn-sm btn-pill"
          style={{ textDecoration: "none" }}
        >
          <Play weight="fill" className="icon-sm" />
          Стрим
        </Link>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="btn-icon active hover:shadow-soft-sm border border-nm-border"
        >
          {theme === "dark" ? <Sun className="icon-sm text-yellow-500" /> : <Moon className="icon-sm" />}
        </button>

        {/* User Account Link */}
        <Link href="/account" className="btn-icon active border border-nm-border">
          <User className="icon-sm" />
        </Link>

        {/* Burger menu for mobile */}
        <button
          onClick={() => dispatch(setOpenMobMenuAction(true))}
          className="btn-icon active border border-nm-border flex md:hidden cursor-pointer"
        >
          <List className="icon-sm" />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <HeaderMobile />
    </header>
  );
}
