import { IUser } from "@/store/actions/users/users.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUser | null;
  isLoactionPermission: "granted" | "denied" | null;
  isCameraPermission: "granted" | "denied" | null;
  error: string | null;
}
const initialState: UserState = {
  user: null,
  isCameraPermission: null,
  isLoactionPermission: null,
  error: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },

    setIsLocationPermission: (
      state,
      action: PayloadAction<"granted" | "denied">
    ) => {
      state.isLoactionPermission = action.payload;
    },
    setIsCameraPermission: (
      state,
      action: PayloadAction<"granted" | "denied">
    ) => {
      state.isCameraPermission = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;

      state.error = null;
    },
  },
});

export const {
  setError,
  setUser,

  setIsCameraPermission,
  setIsLocationPermission,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
