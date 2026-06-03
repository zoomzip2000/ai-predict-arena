import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsdtCommissionMethod, CommissionResponse } from "../../api/wallet";

interface CommissionsState {
  commissions: CommissionResponse | null;
  isLoading: boolean;
  isError: any;
}

const initialState: CommissionsState = {
  commissions: null,
  isLoading: false,
  isError: null,
};

export const getUsdtCommissionAction = createAsyncThunk(
  "commissions/getUsdtCommissionAction",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUsdtCommissionMethod();
      if (res.status === 200 || res.status === 201) {
        return res.data;
      }
      return rejectWithValue("Unexpected response status");
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const commissionsSlice = createSlice({
  name: "commissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsdtCommissionAction.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUsdtCommissionAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.commissions = action.payload || null;
      })
      .addCase(getUsdtCommissionAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default commissionsSlice.reducer;
