import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserItem {
  id: number;
  username: string;
  email: string;
  balance: number;
  demoBalance: number;
  blocked: boolean;
  twoFactorEnabled: boolean;
  role: string;
  createdAt: string;
}

export interface UsersState {
  list: UserItem[];
  isLoading: boolean;
}

const mockUsers: UserItem[] = [
  { id: 1, username: "alex_predict", email: "alex@predict.com", balance: 4500, demoBalance: 10000, blocked: false, twoFactorEnabled: true, role: "USER", createdAt: "2026-01-15T12:00:00Z" },
  { id: 2, username: "mary_option", email: "mary@option.io", balance: 12500, demoBalance: 10000, blocked: false, twoFactorEnabled: false, role: "USER", createdAt: "2026-02-10T14:30:00Z" },
  { id: 3, username: "dmitry_trader", email: "dmitry@trade.ua", balance: 800, demoBalance: 50000, blocked: true, twoFactorEnabled: true, role: "USER", createdAt: "2026-03-01T09:15:00Z" },
  { id: 4, username: "aipa_bot", email: "support@aipa.org", balance: 500000, demoBalance: 1000000, blocked: false, twoFactorEnabled: true, role: "ADMIN", createdAt: "2025-12-01T00:00:00Z" },
  { id: 5, username: "crypto_max", email: "max@blockchain.net", balance: 0, demoBalance: 10000, blocked: false, twoFactorEnabled: false, role: "USER", createdAt: "2026-04-12T18:40:00Z" }
];

const initialState: UsersState = {
  list: mockUsers,
  isLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserItem[]>) {
      state.list = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    blockUser(state, action: PayloadAction<number>) {
      const user = state.list.find((u) => u.id === action.payload);
      if (user) {
        user.blocked = true;
      }
    },
    unblockUser(state, action: PayloadAction<number>) {
      const user = state.list.find((u) => u.id === action.payload);
      if (user) {
        user.blocked = false;
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },
    updateUserBalance(state, action: PayloadAction<{ id: number; amount: number; isDemo?: boolean }>) {
      const user = state.list.find((u) => u.id === action.payload.id);
      if (user) {
        if (action.payload.isDemo) {
          user.demoBalance = action.payload.amount;
        } else {
          user.balance = action.payload.amount;
        }
      }
    },
  },
});

export const { setUsers, setLoading, blockUser, unblockUser, deleteUser, updateUserBalance } = usersSlice.actions;
export default usersSlice.reducer;
