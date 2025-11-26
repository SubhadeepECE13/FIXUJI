import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: UploadState = {
  loading: false,
  data: null,
  error: null,
};

const uploadCarImageSlice = createSlice({
  name: "carImageUpload",
  initialState,
  reducers: {
    uploadStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    uploadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetUploadState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const { uploadStart, uploadSuccess, uploadFailure, resetUploadState } =
  uploadCarImageSlice.actions;

export default uploadCarImageSlice.reducer;
