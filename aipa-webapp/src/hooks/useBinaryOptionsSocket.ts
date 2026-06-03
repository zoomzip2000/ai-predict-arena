"use client";

import React from "react";
import SockJS from "sockjs-client";
import { Stomp, CompatClient } from "@stomp/stompjs";
import { BalanceType } from "../store/slices/userSlice";
import { 
  TimerData, 
  Coefficients, 
  Marker, 
  BetRecord, 
  NotificationDto 
} from "../types/binaryOptions";

interface UseBinaryOptionsSocketArgs {
  token: string | null;
  balanceType: BalanceType;
  userId: string | null;
  setIsSocketConnected: (isConnected: boolean) => void;
  onTimerChange: (timer: TimerData) => void;
  onCoefficientChange: (coefficients: Coefficients) => void;
  onBetPool: (totalBetPool: number) => void;
  onMarkClosedPrice: (markClosedPrice: Marker) => void;
  onBets: (bets: BetRecord[]) => void;
  onNotification: (notification: NotificationDto) => void;
}

const getWebSocketUrl = (): string => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  return `${apiURL}/ws`;
};

export const useBinaryOptionsSocket = ({
  token,
  balanceType,
  userId,
  setIsSocketConnected,
  onTimerChange,
  onCoefficientChange,
  onBetPool,
  onMarkClosedPrice,
  onBets,
  onNotification,
}: UseBinaryOptionsSocketArgs) => {
  const stompClient = React.useRef<CompatClient | null>(null);

  React.useEffect(() => {
    // Disconnect previous instance if active
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.disconnect();
    }

    const wsUrl = getWebSocketUrl();
    const socket = new SockJS(wsUrl);
    stompClient.current = Stomp.over(socket);

    // Tune Stomp settings
    stompClient.current.heartbeat.outgoing = 4000;
    stompClient.current.heartbeat.incoming = 4000;
    stompClient.current.reconnect_delay = 500;
    
    // Disable debug output in production
    if (process.env.NODE_ENV === "production") {
      stompClient.current.debug = () => {};
    }

    const eventSuffix = balanceType === BalanceType.Demo ? "demo" : "real";

    stompClient.current.connect(
      token ? { Authorization: `Bearer ${token}` } : {},
      () => {
        if (!stompClient.current) return;

        // 1. Subscribe to Timer
        stompClient.current.subscribe(`/topic/binary-options/timer-${eventSuffix}`, (message) => {
          const data: TimerData = JSON.parse(message.body || "{}");
          onTimerChange(data);
        });

        // 2. Subscribe to Bet Pool
        stompClient.current.subscribe(`/topic/binary-options/bet-pool-${eventSuffix}`, (message) => {
          const data = JSON.parse(message.body || "{}");
          onBetPool(data.pool || 0);
        });

        // 3. Subscribe to Coefficients
        stompClient.current.subscribe(`/topic/binary-options/coefficient-change-${eventSuffix}`, (message) => {
          const data: Coefficients = JSON.parse(message.body || "{}");
          onCoefficientChange(data);
        });

        // 4. Subscribe to Closed Price Markers
        stompClient.current.subscribe(`/topic/binary-options/mark-closed-price-${eventSuffix}`, (message) => {
          const data: Marker = JSON.parse(message.body || "[]");
          onMarkClosedPrice(data);
        });

        // 5. Subscribe to Bets (User-Specific or General)
        if (userId && token) {
          stompClient.current.subscribe(`/user/${userId}/queue/binary-options/bets-${eventSuffix}`, (message) => {
            const data: BetRecord[] = JSON.parse(message.body || "[]");
            onBets(data);
          });
          
          stompClient.current.subscribe(`/user/${userId}/queue/binary-options/bet-result-notification-${eventSuffix}`, (message) => {
            const data: NotificationDto = JSON.parse(message.body || "{}");
            onNotification(data);
          });
        } else {
          stompClient.current.subscribe(`/topic/binary-options/bets-${eventSuffix}`, (message) => {
            const data: BetRecord[] = JSON.parse(message.body || "[]");
            onBets(data);
          });
        }

        setIsSocketConnected(true);
      },
      (error: any) => {
        console.error("Error connecting to WebSocket:", error);
        setIsSocketConnected(false);
      }
    );

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, [token, userId, balanceType]);
};
