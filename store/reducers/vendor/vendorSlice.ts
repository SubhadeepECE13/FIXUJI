import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VendorDetailes } from "@/store/actions/vendors/vendorAction";

interface VendorState {
  vendors: VendorDetailes[];
  loading: boolean;
  error: string | null;
  updateResponse: any;
}

const initialState: VendorState = {
  vendors: [],
  loading: false,
  error: null,
  updateResponse: null,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    fetchVendorsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVendorsSuccess: (state, action: PayloadAction<VendorDetailes[]>) => {
      state.loading = false;
      state.vendors = action.payload;
    },
    fetchVendorsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateVendorsStart: (state) => {
      state.loading = true;
    },
    updateVendorsSuccess: (state, action) => {
      state.loading = false;
      state.updateResponse = action.payload;
    },
    updateVendorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVendorsStart,
  fetchVendorsSuccess,
  fetchVendorsFailure,
  updateVendorsStart,
  updateVendorsSuccess,
  updateVendorsFailure,
} = vendorSlice.actions;

export default vendorSlice.reducer;
