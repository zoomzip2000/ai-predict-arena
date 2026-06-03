"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getByBitHistory, parseByBitKLineEvent, Candle } from "@/utils/bybit";
import { makeABet } from "@/api/binaryOptions";
import { useBinaryOptionsSocket } from "@/hooks/useBinaryOptionsSocket";
import { 
  BetRecord, 
  TimerData, 
  Coefficients, 
  Marker, 
  TimerType, 
  BetDirection, 
  NotificationDto 
} from "@/types/binaryOptions";
import { BalanceType, editRealBalance, editDemoBalance } from "@/store/slices/userSlice";
import { RootState } from "@/store";

interface BinaryOptionsContextValue {
  isSocketConnected: boolean;
  timer: TimerData;
  marker: Marker | null;
  bets: BetRecord[];
  coefficients: Coefficients;
  betPool: number;
  getSecondsTimerLeft: () => number;
  makeBet: (amount: number, direction: BetDirection) => Promise<boolean>;
  subscribeToKLine: (callback: (candle: Candle) => void) => void;
  getHistoryCandleChartData: () => Promise<Candle[]>;
}

const BinaryOptionsContext = createContext<BinaryOptionsContextValue | null>(null);

export const BinaryOptionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const balanceInUse = useSelector((state: RootState) => state.user.balanceInUse);
  const token = useSelector((state: RootState) => state.main.token);
  
  const [isSocketConnected, setIsSocketConnected] = useState(true);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [betPool, setBetPool] = useState<number>(0);
  const [coefficients, setCoefficients] = useState<Coefficients>({ up: 0, down: 0 });
  const [timer, setTimer] = useState<TimerData>({ type: TimerType.Bets, timeEnd: Date.now() });
  const [bets, setBets] = useState<BetRecord[]>([]);

  const kLineSubscribers = useRef<((candle: Candle) => void)[]>([]);
  const klineSocket = useRef<WebSocket | null>(null);

  const handleNotification = (notification: NotificationDto) => {
    // Notify in console/UI (simple logging or callback)
    console.log("WebSocket Notification:", notification);
  };

  // Bind WebSocket STOMP
  useBinaryOptionsSocket({
    token,
    balanceType: balanceInUse,
    userId: userInfo?.id || null,
    setIsSocketConnected,
    onTimerChange: setTimer,
    onCoefficientChange: setCoefficients,
    onBetPool: setBetPool,
    onMarkClosedPrice: setMarker,
    onBets: setBets,
    onNotification: handleNotification,
  });

  const getSecondsTimerLeft = () => {
    const res = Math.floor((timer.timeEnd - Date.now()) / 1000);
    return res < 0 ? 0 : res;
  };

  const subscribeToKLine = (callback: (candle: Candle) => void) => {
    kLineSubscribers.current.push(callback);
  };

  const getHistoryCandleChartData = async (): Promise<Candle[]> => {
    return getByBitHistory();
  };

  const initByBitLiveConnection = () => {
    if (klineSocket.current && klineSocket.current.readyState !== WebSocket.CLOSED) {
      return () => {};
    }

    klineSocket.current = new WebSocket("wss://stream.bybit.com/v5/public/linear");

    klineSocket.current.onopen = () => {
      const subscribeMessage = {
        op: "subscribe",
        args: ["kline.1.BTCUSDT"],
      };
      klineSocket.current?.send(JSON.stringify(subscribeMessage));
    };

    klineSocket.current.onmessage = (event) => {
      const newCandle = parseByBitKLineEvent(event);
      if (newCandle) {
        kLineSubscribers.current.forEach((cb) => cb(newCandle));
      }
    };

    klineSocket.current.onerror = (error) => {
      console.error("Bybit WebSocket error:", error);
    };

    klineSocket.current.onclose = () => {
      setTimeout(() => {
        if (klineSocket.current?.readyState === WebSocket.CLOSED) {
          initByBitLiveConnection();
        }
      }, 1500);
    };

    return () => {
      if (klineSocket.current) {
        klineSocket.current.close();
      }
    };
  };

  useEffect(() => {
    const unsubscribe = initByBitLiveConnection();
    return () => {
      kLineSubscribers.current = [];
      unsubscribe();
    };
  }, []);

  const makeBet = async (amount: number, direction: BetDirection): Promise<boolean> => {
    try {
      const currentBalance = balanceInUse === BalanceType.Real 
        ? userInfo?.balance || 0 
        : userInfo?.demoBalance || 0;

      if (currentBalance - amount < 0) {
        console.error("Insufficient balance");
        return false;
      }

      const { data } = await makeABet({
        amount,
        direction,
        balanceType: balanceInUse,
      });

      // Update Redux Balance locally
      const updateBalanceAction = balanceInUse === BalanceType.Real 
        ? editRealBalance 
        : editDemoBalance;
      dispatch(updateBalanceAction(currentBalance - amount));
      
      setBets(data);
      return true;
    } catch (error) {
      console.error("Error making binary options bet:", error);
      return false;
    }
  };

  const value = {
    isSocketConnected,
    timer,
    marker,
    bets,
    coefficients,
    betPool,
    getSecondsTimerLeft,
    makeBet,
    subscribeToKLine,
    getHistoryCandleChartData,
  };

  return (
    <BinaryOptionsContext.Provider value={value}>
      {children}
    </BinaryOptionsContext.Provider>
  );
};

export const useBinaryOptions = () => {
  const context = useContext(BinaryOptionsContext);
  if (!context) {
    throw new Error("useBinaryOptions must be used within a BinaryOptionsProvider");
  }
  return context;
};
