"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import MainBanner from "@/components/home/MainBanner";
import CategoryList from "@/components/home/CategoryList";
import EventCard from "@/components/home/EventCard";
import Partners from "@/components/home/Partners";
import HowItWork from "@/components/home/HowItWork";
import Benefits from "@/components/home/Benefits";
import Preloader from "@/components/ui/Preloader";
import { useActiveEvents } from "@/hooks/useActiveEvents";

export default function Home() {
  const {
    categories,
    events,
    isLoading,
  } = useActiveEvents();

  // Map category links (matching CategoryList props format)
  const categoryLinks = categories.map((cat) => ({
    uuid: cat.uuid,
    label: cat.label,
    href: `/events?category=${cat.uuid}`,
    data: cat.data,
  }));

  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        {/* 1. Promo banner */}
        <MainBanner />

        {/* 2. Category list */}
        {categoryLinks.length > 0 && <CategoryList categoryList={categoryLinks} />}

        {/* Height filler */}
        <div className="h-9 w-full"></div>

        {/* 3. Event listing section */}
        <div className="w-full max-w-[970px] mx-auto px-4">
          {isLoading ? (
            <Preloader />
          ) : events.length === 0 ? (
            <div className="nm-card p-10 text-center text-text-muted font-semibold rounded-2xl border border-nm-border">
              Нет активных предсказаний на данный момент
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {events.map((event) => (
                <EventCard key={event.uuid} item={event} mainPage={true} />
              ))}
            </div>
          )}
        </div>

        {/* 4. Partners block */}
        <Partners />

        {/* 5. Informational sections */}
        <div className="w-full max-w-[970px] mx-auto px-4 flex flex-col gap-12 mt-12 border-t border-nm-border pt-12">
          <HowItWork />
          <Benefits />
        </div>
      </div>
    </Layout>
  );
}
