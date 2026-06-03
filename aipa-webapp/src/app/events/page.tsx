"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { PredCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import { useActiveEvents, EventItem } from "@/hooks/useActiveEvents";
import Preloader from "@/components/ui/Preloader";

function EventsListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    events,
    isLoading,
    error,
  } = useActiveEvents();

  // Sync category param with active category state
  React.useEffect(() => {
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    router.push(`/events?category=${catId}`);
  };

  const handlePredictClick = (eventUuid: string, type: "BID_UP" | "BID_DOWN") => {
    router.push(`/events/${eventUuid}?type=${type}`);
  };

  const handleCardHeaderClick = (eventUuid: string) => {
    router.push(`/events/${eventUuid}`);
  };

  const tabList = [
    { id: "all", label: "Все категории" },
    ...categories.map(cat => ({ id: cat.uuid, label: cat.label }))
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto select-none">
      <div className="flex flex-col gap-4 border-b border-nm-border pb-4">
        <h1 className="text-3xl font-extrabold text-text-primary mb-0">
          Рынок прогнозов
        </h1>
        <p className="text-xs text-text-muted mb-0">
          Выберите категорию интереса и сделайте свой аналитический прогноз
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Categories Tab Selector */}
        <div className="flex overflow-x-auto pb-2">
          <Tabs
            tabs={tabList}
            activeTab={selectedCategory}
            onChange={handleCategoryChange}
            variant="pill"
          />
        </div>

        {/* Loading / Error / Empty States */}
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <div className="nm-card p-6 text-center text-red-500 font-bold border border-nm-border">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="nm-card p-12 text-center text-text-muted font-semibold border border-nm-border">
            Нет активных предсказаний в этой категории
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: EventItem) => {
              const yesPercent = event.bidUpCoefficient ? Math.round((1 / event.bidUpCoefficient) * 100) : 50;
              const poolFormatted = event.totalAmount ? event.totalAmount.toLocaleString() : "0";

              return (
                <PredCard
                  key={event.uuid}
                  category={event.categoryName}
                  timeLeft={event.status === "ACTIVE" ? "Активно" : "Ожидание"}
                  amount={poolFormatted}
                  description={event.title}
                  onHeaderClick={() => handleCardHeaderClick(event.uuid)}
                  items={[
                    { label: "Коэф Да", value: `${event.bidUpCoefficient?.toFixed(2)}x` },
                    { label: "Коэф Нет", value: `${event.bidDownCoefficient?.toFixed(2)}x` },
                  ]}
                >
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-secondary">Да {yesPercent}%</span>
                      <span className="text-danger">Нет {100 - yesPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-bg-secondary rounded-pill overflow-hidden flex">
                      <div className="h-full bg-secondary" style={{ width: `${yesPercent}%` }}></div>
                      <div className="h-full bg-danger" style={{ width: `${100 - yesPercent}%` }}></div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="success"
                      size="sm"
                      className="w-full"
                      onClick={() => handlePredictClick(event.uuid, "BID_UP")}
                      disabled={event.status !== "ACTIVE"}
                    >
                      ▲ ДА
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-full"
                      onClick={() => handlePredictClick(event.uuid, "BID_DOWN")}
                      disabled={event.status !== "ACTIVE"}
                    >
                      ▼ НЕТ
                    </Button>
                  </div>
                </PredCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventsListPage() {
  return (
    <Layout>
      <Suspense fallback={<Preloader />}>
        <EventsListContent />
      </Suspense>
    </Layout>
  );
}
