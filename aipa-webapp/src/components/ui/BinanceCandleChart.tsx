"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  IChartApi,
  ISeriesApi,
  createSeriesMarkers,
  ISeriesMarkersPluginApi,
  Time,
  BarData,
} from "lightweight-charts";
import { useBinaryOptions } from "@/contexts/BinaryOptionsContext";
import { Marker, MarkerDirection } from "@/types/binaryOptions";
import { Candle } from "@/utils/bybit";
import Preloader from "./Preloader";

const convertMillisToChartTime = (timeInMillis: number): Time => {
  return Math.floor(timeInMillis / 1000) as Time;
};

export default function BinanceCandleChart() {
  const chartContainer = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const markersRef = useRef<ISeriesMarkersPluginApi<any> | null>(null);
  const candleFocused = useRef(false);

  const { marker, subscribeToKLine, getHistoryCandleChartData } = useBinaryOptions();
  
  const [legend, setLegend] = useState({
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    change: 0,
  });

  const updateLegend = ({ open, high, low, close }: BarData<Time>) => {
    const change = open ? ((close - open) / open) * 100 : 0;
    setLegend({ open, high, low, close, change });
  };

  const updateMarkerTo = (m: Marker) => {
    if (!seriesRef.current) return;
    
    // Clear previous markers
    if (markersRef.current) {
      markersRef.current.setMarkers([]);
    }

    const markerPosition = m.direction === MarkerDirection.Up ? "aboveBar" : "belowBar";
    const markerShape = m.direction === MarkerDirection.Up ? "arrowDown" : "arrowUp";
    const chartTime = convertMillisToChartTime(m.time);

    markersRef.current = createSeriesMarkers(seriesRef.current, [
      {
        time: chartTime,
        color: "#FFFFFF",
        text: `${m.price}`,
        position: markerPosition,
        shape: markerShape,
      },
    ]);
  };

  const handleCrosshairMove = (param: any) => {
    if (!param || param.time === undefined || !seriesRef.current) {
      candleFocused.current = false;
      return;
    }

    const hoveredCandle = param.seriesData.get(seriesRef.current);
    if (hoveredCandle) {
      candleFocused.current = true;
      updateLegend(hoveredCandle as BarData<Time>);
    }
  };

  useEffect(() => {
    if (!chartContainer.current) return;

    // Create chart
    chartRef.current = createChart(chartContainer.current, {
      layout: {
        background: { color: "#22242a" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "#2c2f37" },
        horzLines: { color: "#2c2f37" },
      },
      crosshair: {
        mode: 1, // Magnet
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });

    seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const loadData = async () => {
      if (!seriesRef.current || !chartRef.current) return;
      const data = await getHistoryCandleChartData();
      seriesRef.current.setData(data as any[]);
      
      const lastIdx = data.length - 1;
      if (lastIdx >= 0) {
        updateLegend(data[lastIdx] as any);
        chartRef.current.timeScale().setVisibleLogicalRange({
          from: lastIdx - 40,
          to: lastIdx + 10,
        });
      }
    };

    loadData();

    chartRef.current.subscribeCrosshairMove(handleCrosshairMove);

    // Live Kline WS callback
    subscribeToKLine((candle: Candle) => {
      if (seriesRef.current) {
        seriesRef.current.update(candle as any);
        if (!candleFocused.current) {
          updateLegend(candle as any);
        }
      }
    });

    const handleResize = () => {
      if (chartRef.current && chartContainer.current) {
        chartRef.current.resize(chartContainer.current.clientWidth, 400);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (marker) {
      updateMarkerTo(marker);
    }
  }, [marker]);

  return (
    <div className="nm-card p-6 flex flex-col gap-4">
      {/* Legend & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-text-muted border-b border-nm-border pb-4 select-none">
        <div className="flex flex-wrap gap-4">
          <span>O: <strong className="text-text-primary">{legend.open.toFixed(2)}</strong></span>
          <span>H: <strong className="text-success">{legend.high.toFixed(2)}</strong></span>
          <span>L: <strong className="text-danger">{legend.low.toFixed(2)}</strong></span>
          <span>C: <strong className="text-text-primary">{legend.close.toFixed(2)}</strong></span>
          <span className={legend.change >= 0 ? "text-success" : "text-danger"}>
            {legend.change >= 0 ? "+" : ""}{legend.change.toFixed(3)}%
          </span>
        </div>
        <span className="text-secondary uppercase tracking-widest font-sans font-bold">BTC/USDT 1m</span>
      </div>

      {/* Lightweight Chart Container */}
      <div ref={chartContainer} className="w-full h-[400px] rounded-lg overflow-hidden" />
    </div>
  );
}
