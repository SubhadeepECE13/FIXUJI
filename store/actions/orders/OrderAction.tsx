import { appAxios } from "@/store/apiconfig";
import { setIsOrderEnd, setOrders } from "@/store/reducers/orders/orderSlice";
import { setError, userSlice } from "@/store/reducers/users/userSlice";
import { AppDispatch } from "@/store/Store";
import { LOCK_CALL } from "@/store/API";
import { IUser } from "../users/users.types";
export interface CallLockRequest {
  callTo: string;
  callFrom: string;
  customerName: string;
  department: string;
}

export interface CallLockResponse {
  success: boolean;
  msg?: string;
  data?: any;
}
export const getAllOrders =
  ({
    city,
    limit = 10,
    page = 1,
    search = "",
    status,
    operand,
  }: {
    city: string;
    limit: number;
    page: number;
    search: string;
    status: string;
    operand: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const endpoint = `/api/v1/getRosterBydepartment/${city}`;
      console.log("city name :", city);

      const res = await appAxios.post<GetAllOrders>(endpoint, {
        status,
        operand,
      });

      console.log("Response Data:", res.data);
      console.log("url:", endpoint);

      if (res.data.data) {
        const totalPages = Math.ceil(res.data.data.length / limit);

        dispatch(setIsOrderEnd(page >= totalPages));
        dispatch(setOrders({ orders: res.data.data, page }));
      }
    } catch (error: any) {
      console.error(
        "API Error:",
        error.response?.data || error.message || error
      );
      dispatch(setError("Failed to fetch order data"));
      dispatch(setOrders({ orders: null, page: 1 }));
    }
  };

export const buildCallLockPayload = (
  order: Order,
  user: IUser
): CallLockRequest => {
  return {
    callTo: order.userData.phoneNumber,
    callFrom: user.vendor_phone,
    customerName: order.userData.displayName,
    department: order.department,
  };
};

export const lockCall =
  (callData: CallLockRequest) => async (dispatch: AppDispatch) => {
    console.log("lockCall thunk dispatched with payload:", callData); // Add here
    try {
      const res = await appAxios.post<CallLockResponse>(LOCK_CALL, callData);
      console.log("Call lock API response:", res.data);

      if (!res.data.success) {
        dispatch(setError(res.data.msg || "Failed to lock call"));
      }
      return res.data;
    } catch (error) {
      console.error("Call lock API error:", error);
      dispatch(setError("Call lock failed due to server error"));
      return { success: false, msg: "Server Error" };
    }
  };
