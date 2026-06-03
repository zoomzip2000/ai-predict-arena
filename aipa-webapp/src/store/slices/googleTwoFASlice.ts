import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateGoogleTwoFAQr, checkTwoFAEnabledMethod } from "../../api/google2FA";
import { AppDispatch } from "../index";

interface GoogleTwoFAState {
  isTwoFAEnabled: boolean;
  qrCodeImage: string | null;
  secretKey: string | null;
}

const initialState: GoogleTwoFAState = {
  isTwoFAEnabled: false,
  qrCodeImage: null,
  secretKey: null,
};

export const googleTwoFASlice = createSlice({
  name: "googleTwoFA",
  initialState,
  reducers: {
    setQrData(state, action: PayloadAction<{ qrCodeImage: string; secretKey: string }>) {
      state.qrCodeImage = action.payload.qrCodeImage;
      state.secretKey = action.payload.secretKey;
    },
    toggleIsTwoFAEnabled(state, action: PayloadAction<boolean>) {
      state.isTwoFAEnabled = action.payload;
    },
  },
});

export const { setQrData, toggleIsTwoFAEnabled } = googleTwoFASlice.actions;

export const generateGoogleTwoFAQrAction = () => async (dispatch: AppDispatch) => {
  try {
    const res = await generateGoogleTwoFAQr();
    if (res && res.status === 200) {
      dispatch(setQrData(res.data));
    }
  } catch (e) {
    console.error(e);
  }
};

export const checkTwoFAEnabledAction = () => async (dispatch: AppDispatch) => {
  try {
    const res = await checkTwoFAEnabledMethod();
    if (res && res.status === 200) {
      if (res.data.message === "Please turn on 2FA on your profile") {
        dispatch(toggleIsTwoFAEnabled(false));
      } else {
        dispatch(toggleIsTwoFAEnabled(true));
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export default googleTwoFASlice.reducer;
