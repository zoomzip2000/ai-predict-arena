"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentEvent, createBidEvent } from "@/api/events";
import { getUserInfoAction } from "@/store/slices/userSlice"; // we will define getUserInfoAction thunk or use direct API call
import { RootState } from "@/store";
import { EventItem } from "./useActiveEvents";

export function useEventDetail(uuid: string) {
  const lang = useSelector((state: RootState) => state.main.lang);
  const token = useSelector((state: RootState) => state.main.token);
  const balanceType = useSelector((state: RootState) => state.user.balanceInUse);

  const [event, setEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Bet popup states
  const [isBetOpen, setIsBetOpen] = useState<boolean>(false);
  const [betType, setBetType] = useState<"BID_UP" | "BID_DOWN" | null>(null);
  const [betAmount, setBetAmount] = useState<string>("");
  const [isSubmittingBet, setIsSubmittingBet] = useState<boolean>(false);
  const [betFeedback, setBetFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Load event details
  const fetchDetail = async (showLoader = false) => {
    if (showLoader) setIsLoading(true);
    try {
      const res = await getCurrentEvent(uuid, lang);
      if (res.status === 200) {
        setEvent(res.data);
      } else {
        setError("Событие не найдено");
      }
    } catch (err) {
      console.error("Error loading event detail:", err);
      setError("Ошибка при загрузке события");
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (uuid) {
      fetchDetail(true);
    }
  }, [uuid, lang]);

  // Polling coefficients every 6 seconds
  useEffect(() => {
    if (!uuid) return;
    const interval = setInterval(() => {
      fetchDetail(false);
    }, 6000);
    return () => clearInterval(interval);
  }, [uuid, lang]);

  const openBetModal = (type: "BID_UP" | "BID_DOWN") => {
    setBetType(type);
    setBetAmount("");
    setBetFeedback(null);
    setIsBetOpen(true);
  };

  const handlePlaceBet = async () => {
    if (!token) {
      setBetFeedback({ type: "error", msg: "Необходимо войти в систему" });
      return;
    }
    if (!betType || !event) return;
    const amountNum = parseFloat(betAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setBetFeedback({ type: "error", msg: "Укажите корректную сумму ставки" });
      return;
    }

    setIsSubmittingBet(true);
    setBetFeedback(null);
    try {
      const res = await createBidEvent({
        eventUuid: event.uuid,
        bidType: betType,
        amount: amountNum,
        balanceType: balanceType,
      });

      if (res.status === 200) {
        setBetFeedback({ type: "success", msg: "Ставка успешно размещена!" });
        // Refresh detail
        fetchDetail(false);
        // We can close modal after 1.5 seconds
        setTimeout(() => {
          setIsBetOpen(false);
          setBetAmount("");
        }, 1500);
      } else {
        setBetFeedback({ type: "error", msg: res.data?.message || "Ошибка при размещении ставки" });
      }
    } catch (err: any) {
      console.error("Error placing bet:", err);
      setBetFeedback({ type: "error", msg: err.response?.data?.message || "Ошибка соединения с сервером" });
    } finally {
      setIsSubmittingBet(false);
    }
  };

  return {
    event,
    isLoading,
    error,
    isBetOpen,
    setIsBetOpen,
    betType,
    betAmount,
    setBetAmount,
    isSubmittingBet,
    betFeedback,
    openBetModal,
    handlePlaceBet,
  };
}
