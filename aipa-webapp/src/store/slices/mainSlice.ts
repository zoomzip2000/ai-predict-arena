import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

export interface MainState {
  lang: string;
  token: string | null;
  isTelegram: boolean | null;
  openMobMenu: boolean;
  openMobDetailsHistory: boolean;
}

const getBrowserLang = (): string => {
  if (typeof window === "undefined") return "EN";
  let browserLang = navigator.language || "";
  if (browserLang.includes('-')) {
    browserLang = browserLang.split('-')[0];
  }
  return browserLang.toLowerCase() === "uk" ? "UA" : browserLang.toUpperCase();
};

const initialState: MainState = {
  lang: "EN",
  token: null,
  isTelegram: null,
  openMobMenu: false,
  openMobDetailsHistory: false,
};

// Safety load from localStorage
if (typeof window !== "undefined") {
  initialState.token = localStorage.getItem("token");
  initialState.lang = localStorage.getItem("language") || getBrowserLang() || "EN";
}

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setIsTelegram(state, action: PayloadAction<boolean | null>) {
      state.isTelegram = action.payload;
    },
    setOpenMenu(state, action: PayloadAction<boolean>) {
      state.openMobMenu = action.payload;
    },
    setOpenMobDetailsHistory(state, action: PayloadAction<boolean>) {
      state.openMobDetailsHistory = action.payload;
    },
  },
});

export const {
  setLang,
  setToken,
  setOpenMenu,
  setOpenMobDetailsHistory,
  setIsTelegram,
} = mainSlice.actions;

export const changeLangActions = (lang: string) => async (dispatch: Dispatch) => {
  try {
    localStorage.setItem("language", lang);
    dispatch(setLang(lang));
  } catch (err) {
    console.error(err);
  }
};

export const saveTokenAction = (token: string | null) => async (dispatch: Dispatch) => {
  try {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    dispatch(setToken(token));
  } catch (err) {
    console.error(err);
  }
};

export const setIsTelegramAction = (payload: boolean | null) => async (dispatch: Dispatch) => {
  try {
    localStorage.setItem("isTelegram", String(payload));
    dispatch(setIsTelegram(payload));
  } catch (err) {
    console.error(err);
  }
};

export const setOpenMobMenuAction = (val: boolean) => async (dispatch: Dispatch) => {
  try {
    dispatch(setOpenMenu(val));
  } catch (err) {
    console.error(err);
  }
};

export const setOpenMobDetailsHistoryAction = (val: boolean) => async (dispatch: Dispatch) => {
  try {
    dispatch(setOpenMobDetailsHistory(val));
  } catch (err) {
    console.error(err);
  }
};

export default mainSlice.reducer;
