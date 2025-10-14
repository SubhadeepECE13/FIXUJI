// import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface OrderDetailsState {
//   orderDetails: ServiceBooking | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: OrderDetailsState = {
//   orderDetails: null,
//   loading: false,
//   error: null,
// };

// export const orderDetailsSlice = createSlice({
//   name: "orderDetails",
//   initialState,
//   reducers: {
//     fetchOrderDetailsStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchOrderDetailsSuccess: (
//       state,
//       action: PayloadAction<ServiceBooking>
//     ) => {
//       state.loading = false;
//       state.orderDetails = action.payload;
//     },
//     fetchOrderDetailsFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearOrderDetails: (state) => {
//       state.orderDetails = null;
//       state.error = null;
//       state.loading = false;
//     },
//   },
// });

// export const {
//   fetchOrderDetailsStart,
//   fetchOrderDetailsSuccess,
//   fetchOrderDetailsFailure,
//   clearOrderDetails,
// } = orderDetailsSlice.actions;

// export default orderDetailsSlice.reducer;
import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderDetailsState {
  orderDetails: ServiceBooking | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderDetailsState = {
  orderDetails: null,
  loading: false,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    fetchOrderDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrderDetailsSuccess(state, action: PayloadAction<ServiceBooking>) {
      state.loading = false;
      state.orderDetails = action.payload;
    },
    fetchOrderDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOrderDetailsStart,
  fetchOrderDetailsSuccess,
  fetchOrderDetailsFailure,
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
