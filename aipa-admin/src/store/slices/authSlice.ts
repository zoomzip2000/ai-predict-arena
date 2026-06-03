import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthorized: boolean;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  isAuthorized: typeof window !== "undefined" ? !!localStorage.getItem("adminToken") : false,
  token: typeof window !== "undefined" ? localStorage.getItem("adminToken") : null,
  role: typeof window !== "undefined" ? localStorage.getItem("adminRole") : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<{ token: string; role: string }>) {
      state.isAuthorized = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      if (typeof window !== "undefined") {
        localStorage.setItem("adminToken", action.payload.token);
        localStorage.setItem("adminRole", action.payload.role);
      }
    },
    clearAuthData(state) {
      state.isAuthorized = false;
      state.token = null;
      state.role = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
      }
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
