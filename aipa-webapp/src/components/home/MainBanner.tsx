"use client";

import React from "react";
import { Question } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/utils/intl";

export default function MainBanner() {
  const { t } = useTranslation();

  return (
    <section
      className="w-full min-h-[300px] md:min-h-[500px] bg-contain bg-no-repeat bg-right md:bg-center flex items-center select-none rounded-2xl"
      style={{ backgroundImage: `url('/img/heroSphere.png')` }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-8 flex flex-col justify-center">
        <h1 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight md:leading-[60px] mb-4">
          {t("mainBanner_title_1", "Prediction Market")}
        </h1>
        
        <div className="max-w-[310px] mb-6">
          <p className="text-sm text-text-secondary leading-relaxed mb-0 font-normal">
            {t(
              "mainBannerText_1",
              "Predict events that will happen in the future, place bets on these events and earn on your intuition"
            )}
          </p>
        </div>

        <div>
          {/* Desktop FAQ Button */}
          <a
            href="https://faq.mycoin-pm.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex text-decoration-none"
          >
            <Button variant="primary" size="md">
              FAQ
            </Button>
          </a>

          {/* Mobile FAQ Button */}
          <a
            href="https://faq.mycoin-pm.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex md:hidden text-decoration-none"
          >
            <Button variant="primary" size="sm" className="flex items-center gap-2">
              <Question size={16} weight="bold" />
              <span>{t("faq", "FAQ")}</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
