import { appAxios } from "@/store/apiconfig";
import {
  fetchServicesFailure,
  fetchServicesStart,
  fetchServicesSuccess,
} from "@/store/reducers/services/serviceSlice";
import { AppDispatch } from "@/store/Store";
import Toast from "react-native-toast-message";

export const fetchServices = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchServicesStart());
    const res = await appAxios.get(`/api/v1/getServices`);

    const data = Array.isArray(res.data) ? res.data : res.data?.services || [];

    dispatch(fetchServicesSuccess(data));
  } catch (error: any) {
    console.error("Error fetching services:", error);
    dispatch(fetchServicesFailure(error.message || "Failed to fetch services"));
    Toast.show({
      type: "error",
      text1: "Service fetch failed",
      text2: error.message || "Please try again",
    });
  }
};
