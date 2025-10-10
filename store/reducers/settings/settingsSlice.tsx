import { SettingsResponse } from "@/store/actions/settings/settings.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  data: SettingsResponse | null;
  error: string | null;
};

const initialState: SettingsState = {
  data: null,
  error: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<SettingsResponse>) {
      state.data = action.payload;
      state.error = null;
    },
    setSettingsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearSettings(state) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { setSettings, setSettingsError, clearSettings } =
  settingsSlice.actions;
export default settingsSlice.reducer;
