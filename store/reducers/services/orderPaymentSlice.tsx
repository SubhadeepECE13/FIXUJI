import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  finalPayable: number;
  selectedAddons: { id: string; name: string; price: number }[];
}

const initialState: PaymentState = {
  finalPayable: 0,
  selectedAddons: [],
};

const orderPaymentSlice = createSlice({
  name: "orderPayment",
  initialState,
  reducers: {
    setFinalPayable: (state, action: PayloadAction<number>) => {
      state.finalPayable = action.payload;
    },
    addAddon: (
      state,
      action: PayloadAction<{ id: string; name: string; price: number }>
    ) => {
      if (!state.selectedAddons.find((i) => i.id === action.payload.id)) {
        state.selectedAddons.push(action.payload);
      }
    },
    removeAddon: (state, action: PayloadAction<string>) => {
      state.selectedAddons = state.selectedAddons.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setFinalPayable, addAddon, removeAddon } =
  orderPaymentSlice.actions;
export default orderPaymentSlice.reducer;
