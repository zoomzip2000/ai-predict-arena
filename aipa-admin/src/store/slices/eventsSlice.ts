import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EventItem {
  uuid: string;
  name: string;
  category: string;
  status: "UNPUBLISHED" | "PUBLISHED" | "ACTIVE" | "EXPIRATED" | "CALCULATED" | "FINISHED" | "DELETED";
  coefficientYes: number;
  coefficientNo: number;
  resolution: "YES" | "NO" | null;
  expirationTime: string;
  imageLink: string | null;
}

export interface EventsState {
  list: EventItem[];
  isLoading: boolean;
}

const mockEvents: EventItem[] = [
  {
    uuid: "event-1",
    name: "Пройдет ли Биткоин отметку $150,000 в 2026 году?",
    category: "Crypto",
    status: "ACTIVE",
    coefficientYes: 1.85,
    coefficientNo: 2.15,
    resolution: null,
    expirationTime: "2026-12-31T23:59:59Z",
    imageLink: "/img/category_crypto.png"
  },
  {
    uuid: "event-2",
    name: "Одобрят ли спотовый ETF на Solana в первом полугодии?",
    category: "Finance",
    status: "PUBLISHED",
    coefficientYes: 2.45,
    coefficientNo: 1.62,
    resolution: null,
    expirationTime: "2026-06-30T18:00:00Z",
    imageLink: null
  },
  {
    uuid: "event-3",
    name: "Будет ли выпущена GPT-5 до конца лета 2026?",
    category: "AI",
    status: "ACTIVE",
    coefficientYes: 1.95,
    coefficientNo: 1.95,
    resolution: null,
    expirationTime: "2026-08-31T20:00:00Z",
    imageLink: "/img/category_ai.png"
  },
  {
    uuid: "event-4",
    name: "Индекс S&P500 закроет неделю выше 6100 пунктов?",
    category: "Stocks",
    status: "EXPIRATED",
    coefficientYes: 2.10,
    coefficientNo: 1.78,
    resolution: null,
    expirationTime: "2026-05-30T21:00:00Z",
    imageLink: null
  },
  {
    uuid: "event-5",
    name: "Первый полет Starship к Марсу состоится в 2026?",
    category: "Space",
    status: "UNPUBLISHED",
    coefficientYes: 3.20,
    coefficientNo: 1.38,
    resolution: null,
    expirationTime: "2026-10-15T12:00:00Z",
    imageLink: null
  },
  {
    uuid: "event-6",
    name: "Завершится ли интеграция Telegram Web3 Wallet в ЕС?",
    category: "Crypto",
    status: "FINISHED",
    coefficientYes: 1.50,
    coefficientNo: 2.80,
    resolution: "YES",
    expirationTime: "2026-04-10T15:00:00Z",
    imageLink: null
  }
];

const initialState: EventsState = {
  list: mockEvents,
  isLoading: false,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<EventItem[]>) {
      state.list = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    addEvent(state, action: PayloadAction<EventItem>) {
      state.list.unshift(action.payload);
    },
    updateEventStatus(state, action: PayloadAction<{ uuid: string; status: EventItem["status"] }>) {
      const event = state.list.find((e) => e.uuid === action.payload.uuid);
      if (event) {
        event.status = action.payload.status;
      }
    },
    resolveEvent(state, action: PayloadAction<{ uuid: string; resolution: "YES" | "NO" }>) {
      const event = state.list.find((e) => e.uuid === action.payload.uuid);
      if (event) {
        event.resolution = action.payload.resolution;
        event.status = "FINISHED";
      }
    },
    deleteEvent(state, action: PayloadAction<string>) {
      const event = state.list.find((e) => e.uuid === action.payload);
      if (event) {
        event.status = "DELETED";
      }
    },
  },
});

export const { setEvents, setLoading, addEvent, updateEventStatus, resolveEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
