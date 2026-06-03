"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/utils/intl";

export default function AboutUsPage() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-6 py-8 select-none flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold text-text-primary mb-0 border-b border-nm-border pb-4">
          {t("aboutUsPage__title", "О нас")}
        </h1>

        {/* Main Text Section 1 */}
        <div className="nm-card p-6 border border-nm-border">
          <div 
            className="text-xs text-text-body leading-relaxed flex flex-col gap-4 font-normal"
            dangerouslySetInnerHTML={{
              __html: t("aboutUsPage__text1", "Приветствуем...")
            }}
          />
        </div>

        {/* Highlight Quote */}
        <div className="nm-card-inset p-4 text-center font-bold text-secondary text-sm border border-nm-border">
          {t("aboutUsPage__text_center", "СЛАВА УКРАИНЕ!!!")}
        </div>

        {/* Banner Image */}
        <div className="nm-card overflow-hidden border border-nm-border flex justify-center p-4">
          <img 
            src="/img/img_pizdecRF.png" 
            alt="Support Ukraine Banner" 
            className="rounded max-w-full h-auto object-cover" 
          />
        </div>

        {/* Main Text Section 2 */}
        <div className="nm-card p-6 border border-nm-border">
          <div 
            className="text-xs text-text-body leading-relaxed flex flex-col gap-4 font-normal"
            dangerouslySetInnerHTML={{
              __html: t("aboutUsPage__text2", "Безопасность...")
            }}
          />
        </div>

        {/* Audits / Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="nm-card p-4 border border-nm-border flex justify-center">
            <img 
              src="/img/certificate1.png" 
              alt="Security Certificate 1" 
              className="max-w-full h-auto object-contain rounded"
            />
          </div>
          <div className="nm-card p-4 border border-nm-border flex justify-center">
            <img 
              src="/img/certificate2.png" 
              alt="Security Certificate 2" 
              className="max-w-full h-auto object-contain rounded"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
