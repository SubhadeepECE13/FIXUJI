import { AppDispatch } from "@/store/Store";
import { fetchOrderDetailsByDocId } from "../orders/OrderAction";

export const triggerOrderRefetch =
  (orderDocId: string) => async (dispatch: AppDispatch) => {
    try {
      console.log("🔄 Refetching order details for:", orderDocId);
      await dispatch(fetchOrderDetailsByDocId(orderDocId));
    } catch (error) {
      console.error("❌ Failed to refetch order:", error);
    }
  };
