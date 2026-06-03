"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListCategory, CategoryDTO } from "@/api/category";
import { getListEventsForCategory, getListEventsForMainPage } from "@/api/events";
import { RootState } from "@/store";
import { getMarketCategory } from "@/store/slices/categorySlice";

export interface EventItem {
  id: string;
  uuid: string;
  title: string;
  categoryName: string;
  categoryUuid: string;
  subCategory: string;
  imageLink: string | null;
  imageUuid: string | null;
  startTime: string;
  finishTime: string;
  betEndTime: string;
  status: "ACTIVE" | "PASSIVE" | "EXPIRED" | "FINISHED" | "CLOSED" | "PUBLISHED" | "CANCELED" | "WAITING_UPDATE";
  bidUpCoefficient: number;
  bidDownCoefficient: number;
  totalAmount: number;
  expirationValue?: "BID_UP" | "BID_DOWN";
}

export function useActiveEvents() {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.main.lang);
  const categories = useSelector((state: RootState) => state.category.marketCategory);
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getListCategory(lang);
        if (res.status === 200) {
          const formatted = res.data.map((item: CategoryDTO) => ({
            label: item.categoryName,
            href: `/events?category=${item.categoryUuid}&label=${item.categoryName}`,
            uuid: item.categoryUuid,
            data: item.data,
          }));
          dispatch(getMarketCategory(formatted));
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchCategories();
  }, [lang, dispatch]);

  // Fetch events when selectedCategory or lang changes
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (selectedCategory === "all") {
          const res = await getListEventsForMainPage(lang);
          if (res.status === 200) {
            // Presentation returns events, let's map them
            setEvents(res.data || []);
          }
        } else {
          const res = await getListEventsForCategory(selectedCategory, 0, lang);
          if (res.status === 200) {
            setEvents(res.data.content || []);
          }
        }
      } catch (err: any) {
        console.error("Error loading events, loading fallback mock data:", err);
        const fallbackEvents: EventItem[] = [
          {
            id: "1",
            uuid: "9a20b44e-7678-4ffe-9650-5384bbfc1361",
            title: "Хто виграє вибори Макрон чи Ле Пен?",
            categoryName: "Выборы",
            categoryUuid: "all",
            subCategory: "Политика",
            imageLink: null,
            imageUuid: "555fd636-68e4-462b-b63c-3fea4f8c7f65",
            startTime: new Date(Date.now() - 86400000).toISOString(),
            finishTime: new Date(Date.now() + 86400000 * 5).toISOString(),
            betEndTime: new Date(Date.now() + 86400000 * 4).toISOString(),
            status: "ACTIVE",
            bidUpCoefficient: 1.85,
            bidDownCoefficient: 2.10,
            totalAmount: 12500,
          },
          {
            id: "2",
            uuid: "95d974c7-95cf-44b9-91f7-7f6109c2b440",
            title: "Превысит ли курс BTC отметку $150,000 к концу года?",
            categoryName: "Криптовалюта",
            categoryUuid: "all",
            subCategory: "Рынки",
            imageLink: null,
            imageUuid: "binance-chart",
            startTime: new Date(Date.now() - 86400000).toISOString(),
            finishTime: new Date(Date.now() + 86400000 * 30).toISOString(),
            betEndTime: new Date(Date.now() + 86400000 * 25).toISOString(),
            status: "ACTIVE",
            bidUpCoefficient: 1.65,
            bidDownCoefficient: 2.45,
            totalAmount: 43200,
          },
          {
            id: "3",
            uuid: "9a20b44e-7678-4ffe-9650-5384bbfc1362",
            title: "Удастся ли запуск Starship в рамках миссии Flight 7?",
            categoryName: "Космос",
            categoryUuid: "all",
            subCategory: "Технологии",
            imageLink: null,
            imageUuid: "starship",
            startTime: new Date(Date.now() - 86400000).toISOString(),
            finishTime: new Date(Date.now() + 86400000 * 2).toISOString(),
            betEndTime: new Date(Date.now() + 86400000 * 1).toISOString(),
            status: "ACTIVE",
            bidUpCoefficient: 1.95,
            bidDownCoefficient: 1.95,
            totalAmount: 8500,
          }
        ];
        setEvents(fallbackEvents);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, lang]);

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    events,
    isLoading,
    error,
  };
}
