// import { appAxios } from "@/store/apiconfig";
// import {
//   setCarError,
//   setCarLoading,
//   setCarSuccess,
// } from "@/store/reducers/orders/carUpdateSlice";
// import { AppDispatch } from "@/store/Store";
// import Toast from "react-native-toast-message";

// interface UpdateCarPayload {
//   brand: string;
//   model: string;
//   numberPlate?: string;
// }

// export const updateCarDetails =
//   (orderId: string, payload: UpdateCarPayload) =>
//   async (dispatch: AppDispatch) => {
//     if (!orderId) {
//       console.error("[updateCarDetails] Missing orderId!");
//       Toast.show({
//         type: "error",
//         text1: "Order ID is missing. Cannot update car details.",
//       });
//       return;
//     }

//     console.log("[updateCarDetails] Called with:", { orderId, payload });

//     try {
//       dispatch(setCarLoading(true));

//       const response = await appAxios.put(
//         `api/v1/updateCarInfo/${orderId}`,
//         payload
//       );

//       console.log("[updateCarDetails] API Response:", response.data);

//       dispatch(setCarSuccess(response.data));

//       Toast.show({
//         type: "success",
//         text1: "Car details updated successfully!",
//       });

//       return response.data;
//     } catch (error: any) {
//       // More detailed logging
//       if (error.response) {
//         // Server responded with status code outside 2xx
//         console.error(
//           "[updateCarDetails] Server Error:",
//           error.response.status,
//           error.response.data
//         );
//         Toast.show({
//           type: "error",
//           text1: `Server Error: ${error.response.status}`,
//           text2: JSON.stringify(error.response.data),
//         });
//       } else if (error.request) {
//         // Request made but no response
//         console.error("[updateCarDetails] No response:", error.request);
//         Toast.show({
//           type: "error",
//           text1: "No response from server. Check your network.",
//         });
//       } else {
//         // Something else
//         console.error("[updateCarDetails] Error:", error.message);
//         Toast.show({
//           type: "error",
//           text1: "Error updating car details",
//           text2: error.message,
//         });
//       }

//       dispatch(setCarError(error.message));
//       throw error;
//     } finally {
//       dispatch(setCarLoading(false));
//     }
//   };

import { appAxios } from "@/store/apiconfig";
import {
  setCarError,
  setCarLoading,
  setCarSuccess,
} from "@/store/reducers/orders/carUpdateSlice";
import { AppDispatch } from "@/store/Store";
import Toast from "react-native-toast-message";

interface UpdateCarPayload {
  brand: string;
  model: string;
  numberPlate?: string;
}

export const updateCarDetails =
  (orderDocId: string, payload: UpdateCarPayload) =>
  async (dispatch: AppDispatch) => {
    if (!orderDocId) {
      Toast.show({
        type: "error",
        text1: "Order ID is missing. Cannot update car details.",
      });
      return;
    }

    try {
      dispatch(setCarLoading(true));

      const response = await appAxios.put(
        `/api/v1/updateCarInfo/${orderDocId}`,
        payload
      );
      console.log("car details update", response);

      dispatch(setCarSuccess(response.data));
      Toast.show({
        type: "success",
        text1: "Car details updated successfully!",
      });

      return response.data;
    } catch (error: any) {
      console.error("Error updating car:", error);
      dispatch(setCarError(error.message || "Failed to update car details"));
      Toast.show({
        type: "error",
        text1: "Failed to update car details",
        text2: error.message,
      });
      throw error;
    } finally {
      dispatch(setCarLoading(false));
    }
  };
