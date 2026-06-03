import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { setToken } from "./mainSlice";
import {
  getUserInfoMethod,
  editUsernameMethod,
  getUserActivityMethod,
  getUserSessionsMethod,
  terminateUserSessionMethod,
  getUserBalanceMethod,
  UserProfileInfo,
  UserActivityItem,
  UserSessionItem,
} from "../../api/user";

export enum BalanceType {
  Demo = "Demo",
  Real = "Real",
}

export interface UserInfo {
  id: string;
  username: string;
  balance: number;
  demoBalance: number;
  email?: string;
  twoFactorEnabled?: boolean;
  fromTelegram?: boolean;
}

export interface UserState {
  userInfo: UserInfo | null;
  balanceInUse: BalanceType;
  userActivity: UserActivityItem[];
  userSessions: UserSessionItem[];
  userError: boolean;
  userBalance: number | null;
  isLoading: boolean;
  isTelegram: boolean;
}

const initialState: UserState = {
  userInfo: null,
  balanceInUse: BalanceType.Demo,
  userActivity: [],
  userSessions: [],
  userError: false,
  userBalance: null,
  isLoading: false,
  isTelegram: false,
};

if (typeof window !== "undefined") {
  initialState.isTelegram = localStorage.getItem("isTelegram") === "true";
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo | null>) {
      state.userInfo = action.payload;
    },
    setBalanceInUse(state, action: PayloadAction<BalanceType>) {
      state.balanceInUse = action.payload;
    },
    editRealBalance(state, action: PayloadAction<number>) {
      if (state.userInfo) state.userInfo.balance = action.payload;
    },
    editDemoBalance(state, action: PayloadAction<number>) {
      if (state.userInfo) state.userInfo.demoBalance = action.payload;
    },
    editUsername(
      state,
      action: PayloadAction<{ newUsername: string; userId: string; refreshToken: string; token: string }>
    ) {
      if (state.userInfo) {
        state.userInfo.id = action.payload.userId;
        state.userInfo.username = action.payload.newUsername;
      }
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("token", action.payload.token);
    },
    setUserActivity(state, action: PayloadAction<UserActivityItem[]>) {
      state.userActivity = action.payload;
    },
    setUserSessions(state, action: PayloadAction<UserSessionItem[]>) {
      state.userSessions = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.userError = action.payload;
    },
    setUserBalance(state, action: PayloadAction<number>) {
      state.userBalance = action.payload;
      if (state.userInfo) {
        state.userInfo.balance = action.payload;
      }
    },
    setLoader(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setTelegram(state, action: PayloadAction<boolean>) {
      state.isTelegram = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setBalanceInUse,
  editRealBalance,
  editDemoBalance,
  editUsername,
  setUserActivity,
  setUserSessions,
  setError,
  setUserBalance,
  setLoader,
  setTelegram,
} = userSlice.actions;

export const logoutUserAction = () => (dispatch: Dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  dispatch(setToken(null));
  dispatch(setUserInfo(null));
};

export const setIsTelegramAction = (value: boolean) => (dispatch: Dispatch) => {
  localStorage.setItem("isTelegram", String(value));
  dispatch(setTelegram(value));
};

// Async Actions
export const getUserInfoAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await getUserInfoMethod();
    if (res && res.status === 200) {
      if (typeof window !== "undefined") {
        localStorage.setItem("userId", res.data?.id);
      }
      dispatch(setUserInfo(res.data));
    }
  } catch (err) {
    console.error(err);
  }
};

export const editUsernameAction = (newUsername: string) => async (dispatch: Dispatch) => {
  try {
    const res = await editUsernameMethod(newUsername);
    if (res && res.status === 200) {
      const { userId, token, refreshToken } = res.data;
      dispatch(editUsername({ newUsername, userId, refreshToken, token }));
      dispatch(setToken(token));
    }
  } catch (err) {
    console.error(err);
  }
};

export const getUserActivityAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await getUserActivityMethod();
    if (res && res.status === 200) {
      dispatch(setUserActivity(res.data));
    }
  } catch (err) {
    console.error(err);
  }
};

export const getUserSessionsAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await getUserSessionsMethod();
    if (res && res.status === 200) {
      dispatch(setUserSessions(res.data));
    }
  } catch (err) {
    console.error(err);
  }
};

export const terminateUserSessionsAction =
  ({ id, device, isCurrentIp }: { id: string | number; device: string; isCurrentIp: boolean }) =>
  async (dispatch: any) => {
    try {
      const res = await terminateUserSessionMethod(id);
      if (res && res.status === 200) {
        if (isCurrentIp) {
          dispatch(logoutUserAction());
        } else {
          dispatch(getUserSessionsAction());
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

export const getUserBalanceAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await getUserBalanceMethod();
    if (res && res.status === 200) {
      dispatch(setUserBalance(res.data.balance));
    }
  } catch (e) {
    console.error(e);
  }
};

export const selectUserBalance = (state: { user: UserState }) => state.user.userBalance;
export const selectIsTelegram = (state: { user: UserState }) => state.user.isTelegram;

export default userSlice.reducer;
