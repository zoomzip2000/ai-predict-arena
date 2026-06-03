import axios from "axios";

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const getByBitHistory = async (): Promise<Candle[]> => {
  try {
    const { data } = await axios.get("https://api.bybit.com/v5/market/kline", {
      params: { symbol: "BTCUSDT", interval: 1, limit: 500 },
    });
    
    // Check if ByBit returned successful status and list
    if (data?.result?.list) {
      const res = data.result.list.reverse().map((candle: any[]) => ({
        time: Math.floor(Number(candle[0]) / 1000),
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
      }));
      return res;
    }
  } catch (err) {
    console.error("Error fetching Bybit history:", err);
  }
  return [];
};

export const parseByBitKLineEvent = (event: MessageEvent<string>): Candle | null => {
  try {
    const data = JSON.parse(event.data);

    if (data.topic !== "kline.1.BTCUSDT" || !data.data || data.data.length === 0) {
      return null;
    }

    let parsedData = data.data[0];
    if (data.data.length > 1) {
      // ByBit sends two candles, subtract 600ms to align with close time
      parsedData = { ...data.data[0] };
      parsedData.timestamp -= 600;
    }

    return {
      time: Math.floor(parsedData.timestamp / 60000) * 60,
      open: parseFloat(parsedData.open),
      high: parseFloat(parsedData.high),
      low: parseFloat(parsedData.low),
      close: parseFloat(parsedData.close),
    };
  } catch (err) {
    console.error("Error parsing ByBit WS kline event:", err);
    return null;
  }
};
