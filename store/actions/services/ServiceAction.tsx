import { appAxios } from "@/store/apiconfig";
import {
  fetchAddonsFailure,
  fetchAddonsStart,
  fetchAddonsSuccess,
} from "@/store/reducers/services/addOnsSlice";
import {
  fetchServicesFailure,
  fetchServicesStart,
  fetchServicesSuccess,
} from "@/store/reducers/services/serviceSlice";
import {
  updateServiceFailure,
  updateServiceStart,
  updateServiceSuccess,
} from "@/store/reducers/services/updateServiceSlice";
import { AppDispatch } from "@/store/Store";
import Toast from "react-native-toast-message";
import { triggerOrderRefetch } from "../carImage/refetchActions";

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

export const fetchAddonsByService =
  (service: string, variant: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchAddonsStart());

      const res = await appAxios.get(
        `/api/v1/getAddonsByService?service=${encodeURIComponent(
          service
        )}&variant=${encodeURIComponent(variant)}`
      );

      console.log(service, variant);

      dispatch(fetchAddonsSuccess(res.data?.addons || []));
    } catch (error: any) {
      dispatch(fetchAddonsFailure(error.message || "Failed to fetch addons"));
    }
  };

export interface UpdateServicePayload {
  addons: string[];
  variant: string;
  service: string;
  total: number;
}

export const updateServiceDetails =
  (orderDocId: string, payload: UpdateServicePayload) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(updateServiceStart());

      const finalPayload = {
        ...payload,
        addons: payload.addons.map((id) => String(id).trim()).filter(Boolean),
      };

      const endpoint = `/api/v1/updateService/${orderDocId}`;
      console.log("🔧 Updating Service:", endpoint);
      console.log("📦 Final Payload Sent:", finalPayload);

      const response = await appAxios.put(endpoint, finalPayload);

      dispatch(updateServiceSuccess(response.data));

      dispatch(triggerOrderRefetch(orderDocId));

      Toast.show({
        type: "success",
        text1: "Package Updated ",
        text2: "Service and add-ons updated successfully.",
      });

      return response.data;
    } catch (error: any) {
      console.error(" updateServiceDetails Error:", error.response || error);

      dispatch(
        updateServiceFailure(error?.response?.data?.message || "Update failed")
      );

      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error?.response?.data?.message || "Something went wrong.",
      });

      throw error;
    }
  };
