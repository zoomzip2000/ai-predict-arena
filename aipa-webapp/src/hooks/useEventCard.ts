"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const getDateWithTZ = (dateStr: string | Date | undefined) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export function useEventCard(eventUuid: string, initialUp: number, initialDown: number) {
  const router = useRouter();
  const authToken = useSelector((state: RootState) => state.main.token);
  
  const [isAnimatedChange, setIsAnimatedChange] = useState(false);
  const prevValues = useRef({ up: initialUp, down: initialDown });

  // Watch for changes in coefficients to trigger brief flashing animation (like in original MyCoin)
  useEffect(() => {
    if (prevValues.current.up !== initialUp || prevValues.current.down !== initialDown) {
      setIsAnimatedChange(false);
      // Wait for a tick to restart animation
      const raf = requestAnimationFrame(() => {
        setIsAnimatedChange(true);
      });
      
      const timer = setTimeout(() => {
        setIsAnimatedChange(false);
      }, 3000);

      prevValues.current = { up: initialUp, down: initialDown };
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [initialUp, initialDown]);

  const handlePredictClick = (type: "BID_UP" | "BID_DOWN") => {
    if (authToken) {
      router.push(`/events/${eventUuid}?type=${type}`);
    } else {
      router.push("/sign-in");
    }
  };

  const handleDetailsClick = (categoryUuid: string, status: string) => {
    if (status === "CANCELED") {
      router.push(`/events/${eventUuid}?status=canceled`);
    } else if (status === "PUBLISHED") {
      router.push(`/events?category=${categoryUuid}`);
    } else {
      router.push(`/events/${eventUuid}`);
    }
  };

  return {
    isAnimatedChange,
    handlePredictClick,
    handleDetailsClick,
  };
}
