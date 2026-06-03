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
  imageLink: string;
  imageUuid: string;
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
        console.error("Error loading events:", err);
        setError("Не удалось загрузить события");
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
