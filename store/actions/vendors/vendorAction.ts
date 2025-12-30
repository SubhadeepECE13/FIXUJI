import { appAxios } from "@/store/apiconfig";
import {
  fetchVendorsFailure,
  fetchVendorsStart,
  fetchVendorsSuccess,
  updateVendorsFailure,
  updateVendorsStart,
  updateVendorsSuccess,
} from "@/store/reducers/vendor/vendorSlice";
import { AppDispatch } from "@/store/Store";
import Toast from "react-native-toast-message";
import { getAllOrders } from "../orders/OrderAction";

export interface VendorDetailes {
  id: string;
  vendor_name: string;
  vendor_img?: string;
  vendor_phone?: string;
  department?: string;
  role?: string;
  vendor_description?: string;
}

export const fetchVendors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchVendorsStart());

    const response = await appAxios.get("/api/v1/vendors?department=Siliguri");

    const vendorList = Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];

    console.log("Fetched vendor list:", vendorList);

    dispatch(fetchVendorsSuccess(vendorList as VendorDetailes[]));
  } catch (error: any) {
    console.log("Error fetching vendors:", error);
    dispatch(fetchVendorsFailure(error.message || "Failed to fetch vendors"));
  }
};

export interface VendorPayload {
  vendors: {
    name: string;
    role?: string;
    vendor_id: string;
  }[];
}

// export const updateVendorDetails =
//   (orderId: string, payload: VendorPayload) =>
//   async (dispatch: AppDispatch) => {
//     try {
//       dispatch(updateVendorsStart());

//       const response = await appAxios.put(
//         `/api/v1/updateStaffInfo/${orderId}`,
//         payload
//       );

//       dispatch(updateVendorsSuccess(response.data));
//       Toast.show({
//         type: "success",
//         text1: `${payload.vendors.length} vendor(s) updated successfully!`,
//       });

//       return response.data;
//     } catch (error: any) {
//       console.error("updateVendorDetails Error:", error);
//       dispatch(
//         updateVendorsFailure(error.message || "Failed to update vendors")
//       );
//       Toast.show({
//         type: "error",
//         text1: "Failed to update vendor info.",
//       });
//       throw error;
//     }
//   };
export const updateVendorDetails =
  (
    orderId: string,
    payload: VendorPayload,
    refreshParams?: {
      city: string;
      limit: number;
      page: number;
      search: string;
      status: string;
      operand: string;
    }
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(updateVendorsStart());

      const response = await appAxios.put(
        `/api/v1/updateStaffInfo/${orderId}`,
        payload
      );

      dispatch(updateVendorsSuccess(response.data));

      Toast.show({
        type: "success",
        text1: `${payload.vendors.length} vendor(s) updated successfully!`,
      });

      if (refreshParams) {
        await dispatch(getAllOrders(refreshParams));
      }

      return response.data;
    } catch (error: any) {
      console.error("updateVendorDetails Error:", error);
      dispatch(
        updateVendorsFailure(error.message || "Failed to update vendors")
      );

      Toast.show({ type: "error", text1: "Failed to update vendor info." });

      throw error;
    }
  };
