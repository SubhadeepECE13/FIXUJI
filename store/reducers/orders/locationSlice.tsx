import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: LocationState = {
  loading: false,
  data: null,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    sendLocationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendLocationSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    sendLocationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetLocationState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const {
  sendLocationStart,
  sendLocationSuccess,
  sendLocationFailure,
  resetLocationState,
} = locationSlice.actions;

export default locationSlice.reducer;
