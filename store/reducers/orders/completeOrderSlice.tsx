import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompleteOrderState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CompleteOrderState = {
  loading: false,
  success: false,
  error: null,
};

const completeOrderSlice = createSlice({
  name: "completeOrder",
  initialState,
  reducers: {
    completeOrderStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    completeOrderSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    completeOrderFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetCompleteOrder(state) {
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  completeOrderStart,
  completeOrderSuccess,
  completeOrderFail,
  resetCompleteOrder,
} = completeOrderSlice.actions;

export default completeOrderSlice.reducer;
