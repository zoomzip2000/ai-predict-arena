"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { 
  X, House, CurrencyDollar, Play, Question, Info, 
  ShieldCheck, ClockCounterClockwise, FileText, Percent, ChatTeardropText, 
  BookOpen, Globe, CaretRight, CaretLeft, Check 
} from "@phosphor-icons/react";
import { RootState, AppDispatch } from "@/store";
import { setOpenMobMenuAction, changeLangActions } from "@/store/slices/mainSlice";
import { useTranslation } from "@/utils/intl";

export default function HeaderMobile() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.main.openMobMenu);
  const currentLang = useSelector((state: RootState) => state.main.lang) || "EN";
  const { t } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(setOpenMobMenuAction(false));
  };

  const handleLangChange = (lang: string) => {
    dispatch(changeLangActions(lang));
    setShowLangMenu(false);
  };

  const languages = [
    { code: "EN", name: "English" },
    { code: "RU", name: "Русский" },
    { code: "UA", name: "Українська" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer Container */}
      <div className="relative w-4/5 max-w-sm h-full nm-bg shadow-2xl flex flex-col justify-between p-6 overflow-y-auto z-10 transition-transform duration-300 ease-out border-r border-nm-border">
        <div>
          {/* Header Panel */}
          <div className="flex items-center justify-between mb-8 border-b border-nm-border pb-4">
            <span className="text-lg font-extrabold text-text-primary">
              AI Predict <span className="text-secondary font-bold">Arena</span>
            </span>
            <button 
              onClick={handleClose}
              className="btn-icon active border border-nm-border"
            >
              <X size={20} />
            </button>
          </div>

          {showLangMenu ? (
            /* Language Selection Submenu */
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setShowLangMenu(false)}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors border-none bg-transparent p-0 mb-4 cursor-pointer"
              >
                <CaretLeft size={18} />
                <span className="text-sm font-semibold">{t("back", "Назад")}</span>
              </button>

              <h3 className="text-base font-extrabold text-text-primary mb-2">
                {t("selectLanguage", "Выберите язык")}
              </h3>

              <div className="flex flex-col gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`flex items-center justify-between w-full p-4 rounded-xl border border-nm-border transition-all cursor-pointer ${
                      currentLang === lang.code 
                        ? "nm-card-inset text-secondary font-bold" 
                        : "nm-card text-text-primary hover:shadow-soft-sm"
                    }`}
                  >
                    <span>{lang.name}</span>
                    {currentLang === lang.code && <Check size={18} />}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Main Menu Navigation List */
            <div className="flex flex-col gap-3">
              <Link 
                href="/" 
                onClick={handleClose}
                className="flex items-center gap-4 p-4 rounded-xl border border-nm-border nm-card text-text-primary text-decoration-none hover:shadow-soft-sm transition-all"
              >
                <House size={20} className="text-secondary" />
                <span className="text-sm font-bold">{t("market", "Рынок предсказаний")}</span>
              </Link>

              <Link 
                href="/binary-options" 
                onClick={handleClose}
                className="flex items-center gap-4 p-4 rounded-xl border border-nm-border nm-card text-text-primary text-decoration-none hover:shadow-soft-sm transition-all"
              >
                <Play size={20} className="text-secondary" />
                <span className="text-sm font-bold">{t("binaryOptions", "Опционы")}</span>
              </Link>

              <Link 
                href="/withdrawal" 
                onClick={handleClose}
                className="flex items-center gap-4 p-4 rounded-xl border border-nm-border nm-card text-text-primary text-decoration-none hover:shadow-soft-sm transition-all"
              >
                <CurrencyDollar size={20} className="text-secondary" />
                <span className="text-sm font-bold">{t("withdrawal_title", "Депозит / Вывод")}</span>
              </Link>

              <Link 
                href="/transaction-history" 
                onClick={handleClose}
                className="flex items-center gap-4 p-4 rounded-xl border border-nm-border nm-card text-text-primary text-decoration-none hover:shadow-soft-sm transition-all"
              >
                <ClockCounterClockwise size={20} className="text-secondary" />
                <span className="text-sm font-bold">{t("historyLink", "История операций")}</span>
              </Link>

              <hr className="border-nm-border my-2" />

              <Link 
                href="/about-us" 
                onClick={handleClose}
                className="flex items-center gap-4 p-3 text-text-secondary hover:text-text-primary text-decoration-none transition-all"
              >
                <Info size={18} className="text-secondary" />
                <span className="text-sm font-semibold">{t("AboutUs", "О нас")}</span>
              </Link>

              <Link 
                href="/rules" 
                onClick={handleClose}
                className="flex items-center gap-4 p-3 text-text-secondary hover:text-text-primary text-decoration-none transition-all"
              >
                <BookOpen size={18} className="text-secondary" />
                <span className="text-sm font-semibold">{t("rulesLink", "Регламент")}</span>
              </Link>

              <Link 
                href="/commissions" 
                onClick={handleClose}
                className="flex items-center gap-4 p-3 text-text-secondary hover:text-text-primary text-decoration-none transition-all"
              >
                <Percent size={18} className="text-secondary" />
                <span className="text-sm font-semibold">{t("commissionsLink", "Комиссии")}</span>
              </Link>

              <Link 
                href="/safety" 
                onClick={handleClose}
                className="flex items-center gap-4 p-3 text-text-secondary hover:text-text-primary text-decoration-none transition-all"
              >
                <ShieldCheck size={18} className="text-secondary" />
                <span className="text-sm font-semibold">{t("safetyLink", "Безопасность")}</span>
              </Link>

              <Link 
                href="/activity-reports" 
                onClick={handleClose}
                className="flex items-center gap-4 p-3 text-text-secondary hover:text-text-primary text-decoration-none transition-all"
              >
                <FileText size={18} className="text-secondary" />
                <span className="text-sm font-semibold">{t("reportsPage_title", "Отчеты")}</span>
              </Link>
            </div>
          )}
        </div>

        {/* Language Selection Trigger */}
        {!showLangMenu && (
          <button
            onClick={() => setShowLangMenu(true)}
            className="flex items-center justify-between w-full p-4 rounded-xl border border-nm-border nm-card text-text-primary hover:shadow-soft-sm transition-all mt-6 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-secondary" />
              <span className="text-sm font-bold">{t("language", "Язык")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <span className="text-xs uppercase font-bold">{currentLang}</span>
              <CaretRight size={16} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
