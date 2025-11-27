import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateServiceState {
  loading: boolean;
  error: string | null;
  success: boolean;
  response: any | null;
}

const initialState: UpdateServiceState = {
  loading: false,
  error: null,
  success: false,
  response: null,
};

const updateServiceSlice = createSlice({
  name: "updateService",
  initialState,
  reducers: {
    updateServiceStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateServiceSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.response = action.payload;
    },
    updateServiceFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetUpdateState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.response = null;
    },
  },
});

export const {
  updateServiceStart,
  updateServiceSuccess,
  updateServiceFailure,
  resetUpdateState,
} = updateServiceSlice.actions;

export default updateServiceSlice.reducer;
