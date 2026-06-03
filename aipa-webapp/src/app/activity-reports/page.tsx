"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/utils/intl";

export default function ActivityReportsPage() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-6 py-8 select-none flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-text-primary mb-0 border-b border-nm-border pb-4">
          {t("reportsPage_title", "Отчеты")}
        </h1>

        <div className="nm-card p-6 border border-nm-border">
          <div 
            className="text-xs text-text-body leading-relaxed flex flex-col gap-4 font-normal"
            dangerouslySetInnerHTML={{
              __html: t("reportsPageText", "Отчеты о деятельности...")
            }}
          />
        </div>

        {/* Support Ukraine / Banner Image */}
        <div className="nm-card overflow-hidden border border-nm-border flex justify-center p-4">
          <img 
            src="/img/img_pizdecRF.png" 
            alt="Support Ukraine Banner" 
            className="rounded max-w-full h-auto object-cover" 
          />
        </div>
      </div>
    </Layout>
  );
}
