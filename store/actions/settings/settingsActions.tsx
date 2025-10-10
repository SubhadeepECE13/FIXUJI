import { AppDispatch } from "@/store/Store";
import { SettingsResponse } from "./settings.types";
import { appAxios } from "@/store/apiconfig";
import {
  setSettings,
  setSettingsError,
} from "@/store/reducers/settings/settingsSlice";

export const getSettings = () => async (dispatch: AppDispatch) => {
  try {
    const res = await appAxios.get<{ data: SettingsResponse }>(
      "/api/v1/settings"
    );
    dispatch(setSettings(res.data.data));
  } catch (error) {
    dispatch(setSettingsError("Failed to fetch settings"));
  }
};
