import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store/Store";
import { appAxios } from "@/store/apiconfig";

import Toast from "react-native-toast-message";
import { ServiceType } from "@/store/actions/services/services.action";

interface ServiceState {
  loading: boolean;
  data: ServiceType[];
  error: string | null;
}

const initialState: ServiceState = {
  loading: false,
  data: [],
  error: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchServicesSuccess: (state, action: PayloadAction<ServiceType[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchServicesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetServiceState: (state) => {
      state.loading = false;
      state.data = [];
      state.error = null;
    },
  },
});

export const {
  fetchServicesStart,
  fetchServicesSuccess,
  fetchServicesFailure,
  resetServiceState,
} = serviceSlice.actions;

export default serviceSlice.reducer;
