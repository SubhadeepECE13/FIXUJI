import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/users/userSlice";
import orderReducer from "../reducers/orders/orderSlice";
import settingsReducer from "../reducers/settings/settingsSlice";
const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  settings: settingsReducer,
});

export default rootReducer;
