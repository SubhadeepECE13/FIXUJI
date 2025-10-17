import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/users/userSlice";
import orderReducer from "../reducers/orders/orderSlice";
import settingsReducer from "../reducers/settings/settingsSlice";
import orderDetailsReducer from "./orders/orderDetailesSlice";
import vendorReducer from "./vendor/vendorSlice";
const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  settings: settingsReducer,
  orderDetails: orderDetailsReducer,
  vendor: vendorReducer,
});

export default rootReducer;
