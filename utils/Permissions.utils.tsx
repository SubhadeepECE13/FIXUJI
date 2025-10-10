import {
  setIsCameraPermission,
  setIsLocationPermission,
} from "@/store/reducers/users/userSlice";
import { AppDispatch } from "@/store/Store";
import * as Location from "expo-location";
import { Linking, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const checkPermissions = async (dispatch: AppDispatch) => {
  const locationPermission = await Location.requestForegroundPermissionsAsync();

  if (locationPermission.status === "granted") {
    dispatch(setIsLocationPermission("granted"));
  } else {
    dispatch(setIsLocationPermission("denied"));
  }

  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  if (cameraPermission.status === "granted") {
    dispatch(setIsCameraPermission("granted"));
  } else {
    dispatch(setIsCameraPermission("denied"));
  }
};

export const openAppSettings = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  } else {
    Linking.openSettings();
  }
};
