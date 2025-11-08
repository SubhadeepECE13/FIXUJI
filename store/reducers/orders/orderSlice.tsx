import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  orders: Order[] | null;
  order: Order | null;
  error: string | null;
  isOrderEnd: boolean;
  success: string | null;
  isOwnOrder: boolean;
}

const initialState: OrderState = {
  orders: null,
  order: null,
  error: null,
  isOrderEnd: false,
  success: null,
  isOwnOrder: true,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<{ orders: Order[] | null; page: number }>
    ) => {
      if (action.payload.page === 1) {
        state.orders = action.payload.orders;
      } else if (state.orders) {
        const incoming = action.payload.orders || [];
        const existingIds = new Set(state.orders.map((order) => order.id));
        const nonDuplicate = incoming.filter(
          (order) => !existingIds.has(order.id)
        );
        state.orders = [...state.orders, ...nonDuplicate];
      } else {
        state.orders = action.payload.orders;
      }
    },
    setIsOrderEnd: (state, action: PayloadAction<boolean>) => {
      state.isOrderEnd = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order | null>) => {
      state.order = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload;
    },
    clearOrder: (state) => {
      return initialState;
    },
    setIsOwnOrder: (state, action: PayloadAction<boolean>) => {
      state.isOwnOrder = action.payload;
    },
  },
});

export const {
  setError,
  setOrders,
  setSuccess,
  clearOrder,
  setIsOrderEnd,
  setIsOwnOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
