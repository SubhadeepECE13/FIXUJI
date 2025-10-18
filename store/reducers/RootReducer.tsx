import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/users/userSlice";
import orderReducer from "../reducers/orders/orderSlice";
import settingsReducer from "../reducers/settings/settingsSlice";
import orderDetailsReducer from "./orders/orderDetailesSlice";
import vendorReducer from "./vendor/vendorSlice";
import carReducer from "./orders/carUpdateSlice";
const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  settings: settingsReducer,
  orderDetails: orderDetailsReducer,
  vendor: vendorReducer,
  car: carReducer,
});

export default rootReducer;
