import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StartOrderState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: StartOrderState = {
  loading: false,
  success: false,
  error: null,
};

const startOrderSlice = createSlice({
  name: "startOrder",
  initialState,
  reducers: {
    startOrderStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    startOrderSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    startOrderFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetStartOrder(state) {
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  startOrderStart,
  startOrderSuccess,
  startOrderFail,
  resetStartOrder,
} = startOrderSlice.actions;

export default startOrderSlice.reducer;
