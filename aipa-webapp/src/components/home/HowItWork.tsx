"use client";

import React from "react";
import { useTranslation } from "@/utils/intl";
import { UserPlus, Wallet, Eye, HandPointing, Trophy } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function HowItWork() {
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.main.token);

  const steps = [
    { id: 1, icon: <UserPlus className="text-secondary icon-md" />, titleKey: "howItWork__item_title_1", descKey: "howItWork__item_descr_1" },
    { id: 2, icon: <Wallet className="text-secondary icon-md" />, titleKey: "howItWork__item_title_2", descKey: "howItWork__item_descr_2" },
    { id: 3, icon: <Eye className="text-secondary icon-md" />, titleKey: "howItWork__item_title_3", descKey: "howItWork__item_descr_3" },
    { id: 4, icon: <HandPointing className="text-secondary icon-md" />, titleKey: "howItWork__item_title_4", descKey: "howItWork__item_descr_4" },
    { id: 5, icon: <Trophy className="text-secondary icon-md" />, titleKey: "howItWork__item_title_5", descKey: "howItWork__item_descr_5" },
  ];

  return (
    <section className="w-full mt-12 select-none">
      <h2 className="text-2xl font-extrabold text-text-primary mb-8 border-b border-nm-border pb-4">
        {t("sec_HowItWork__title", "Как это работает?")}
      </h2>
      
      <div className="flex flex-col gap-6">
        {steps.map(step => (
          <div 
            key={step.id} 
            className="nm-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-nm-border"
          >
            {/* Step Number Circle (Neumorphic Inset) */}
            <div className="nm-card-inset w-12 h-12 flex items-center justify-center rounded-full shrink-0 font-mono font-bold text-secondary text-lg">
              {step.id}
            </div>

            {/* Content Details */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-text-primary uppercase mb-1 leading-snug">
                {t(step.titleKey)}
              </h3>
              <p className="text-xs text-text-muted mb-0 leading-relaxed">
                {t(step.descKey)}
              </p>
            </div>

            {/* Icon Box */}
            <div className="btn-icon active p-3 rounded-full text-secondary shrink-0">
              {step.icon}
            </div>
          </div>
        ))}
      </div>

      {!token && (
        <div className="mt-8 flex justify-center">
          <Link href="/sign-up" style={{ textDecoration: "none" }}>
            <Button variant="secondary" size="lg" pill>
              {t("create_account", "Создать аккаунт")}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
