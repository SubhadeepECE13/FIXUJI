import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null as string | null,
  data: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCarLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCarError: (state, action) => {
      state.error = action.payload;
    },
    setCarSuccess: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCarLoading, setCarError, setCarSuccess } = carSlice.actions;
export default carSlice.reducer;
