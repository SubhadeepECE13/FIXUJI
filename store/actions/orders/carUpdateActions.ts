import { appAxios } from "@/store/apiconfig";
import {
  setCarError,
  setCarLoading,
  setCarSuccess,
} from "@/store/reducers/orders/carUpdateSlice";
import { AppDispatch } from "@/store/Store";
import Toast from "react-native-toast-message";

export const updateCarDetails =
  (
    orderId: string,
    payload: { brand: string; model: string; numberPlate: string }
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setCarLoading(true));
      const response = await appAxios.put(
        `api/v1/updateCarInfo/${orderId}`,
        payload
      );
      console.log("payload", payload);

      console.log("response", response);

      Toast.show({
        type: "success",
        text1: "Car details updated successfully!",
      });
      dispatch(setCarSuccess(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(setCarError(error.message));
      throw error;
    } finally {
      dispatch(setCarLoading(false));
    }
  };
