import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/users/userSlice";
import orderReducer from "../reducers/orders/orderSlice";
import settingsReducer from "../reducers/settings/settingsSlice";
import orderDetailsReducer from "./orders/orderDetailesSlice";
import vendorReducer from "./vendor/vendorSlice";
import carReducer from "./orders/carUpdateSlice";
import locationReducer from "./orders/locationSlice";
import serviceReducer from "./services/serviceSlice";
import uploadCarImageReducer from "./carImage/uploadImageSlice";
import addonReducer from "./services/addOnsSlice";
import orderPaymentSliceReducer from "./services/orderPaymentSlice";
import updateServiceReducer from "./services/updateServiceSlice";
const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  settings: settingsReducer,
  orderDetails: orderDetailsReducer,
  vendor: vendorReducer,
  car: carReducer,
  location: locationReducer,
  services: serviceReducer,
  carImageUpload: uploadCarImageReducer,
  addons: addonReducer,
  orderPayment: orderPaymentSliceReducer,
  updateService: updateServiceReducer,
});

export default rootReducer;
