"use client";

import React from "react";
import { useTranslation } from "@/utils/intl";
import { Percent, ArrowUpRight, ChatCircleText, ShieldCheck, ClipboardText, CreditCard } from "@phosphor-icons/react";

export default function Benefits() {
  const { t } = useTranslation();

  const benefitsItems = [
    { id: 1, icon: <Percent className="text-secondary icon-lg" />, titleKey: "benefitsList_item-title_1", descKey: "benefitsList_item-descr_1" },
    { id: 2, icon: <ArrowUpRight className="text-secondary icon-lg" />, titleKey: "benefitsList_item-title_2", descKey: "benefitsList_item-descr_2" },
    { id: 3, icon: <ChatCircleText className="text-secondary icon-lg" />, titleKey: "benefitsList_item-title_3", descKey: "benefitsList_item-descr_3" },
    { id: 4, icon: <ShieldCheck className="text-secondary icon-lg" />, titleKey: "benefitsList_item-title_4", descKey: "benefitsList_item-descr_4" },
    { id: 5, icon: <ClipboardText className="text-secondary icon-lg" />, titleKey: "benefitsList_item-title_5", descKey: "benefitsList_item-descr_5" },
    { id: 6, icon: <CreditCard className="text-secondary icon-lg" />, titleKey: "benefitsList_item-title_6", descKey: "benefitsList_item-descr_6" },
  ];

  return (
    <section className="w-full mt-12 select-none">
      <h2 className="text-2xl font-extrabold text-text-primary mb-6 border-b border-nm-border pb-4">
        {t("sec_Benefits__title", "Преимущества")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefitsItems.map(item => (
          <div key={item.id} className="nm-card p-6 flex items-start gap-4">
            <div className="btn-icon active p-3 rounded-full text-secondary shrink-0">
              {item.icon}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-text-primary mb-0 uppercase leading-snug">
                {t(item.titleKey)}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-0">
                {t(item.descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
