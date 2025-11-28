import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddonType {
  id: string;
  name: string;
  price: number;
  // realId: string;
}

interface OrderPaymentState {
  finalPayable: Record<string, number>;
  selectedAddons: Record<string, AddonType[]>;
}

const initialState: OrderPaymentState = {
  finalPayable: {},
  selectedAddons: {},
};

const orderPaymentSlice = createSlice({
  name: "orderPayment",
  initialState,
  reducers: {
    setFinalPayable: (
      state,
      action: PayloadAction<{ orderId: string; amount: number }>
    ) => {
      state.finalPayable[action.payload.orderId] = action.payload.amount;
    },

    loadInitialAddons: (
      state,
      action: PayloadAction<{ orderId: string; addons: AddonType[] }>
    ) => {
      state.selectedAddons[action.payload.orderId] = action.payload.addons;
    },

    addAddon: (
      state,
      action: PayloadAction<{ orderId: string; addon: AddonType }>
    ) => {
      const list = state.selectedAddons[action.payload.orderId] || [];
      if (!list.some((item) => item.id === action.payload.addon.id)) {
        list.push(action.payload.addon);
      }
      state.selectedAddons[action.payload.orderId] = list;
    },

    removeAddon: (
      state,
      action: PayloadAction<{ orderId: string; addonId: string }>
    ) => {
      state.selectedAddons[action.payload.orderId] = (
        state.selectedAddons[action.payload.orderId] || []
      ).filter((i) => i.id !== action.payload.addonId);
    },
  },
});

export const { setFinalPayable, addAddon, removeAddon, loadInitialAddons } =
  orderPaymentSlice.actions;
export default orderPaymentSlice.reducer;
