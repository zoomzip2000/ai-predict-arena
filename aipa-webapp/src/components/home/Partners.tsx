"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/utils/intl";

export default function Partners() {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center my-12 select-none">
      <h2 className="text-xl md:text-2xl font-bold uppercase text-text-primary tracking-wider mb-6 text-center leading-normal">
        {t("partners_title", "Наши партнеры")}
      </h2>
      
      <div className="flex items-center justify-center">
        <Link
          href="https://datami.ua/"
          target="_blank"
          rel="noreferrer"
          className="block w-[158px] h-[49px] md:w-[359px] md:h-[111px] bg-contain bg-center bg-no-repeat transition-all hover:opacity-80 rounded-xl"
          style={{ backgroundImage: `url('/icon/partner2.png')` }}
          aria-label="Partner Link"
        />
      </div>
    </div>
  );
}
