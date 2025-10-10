import { AppDispatch } from "@/store/Store";

import { tokenStorage, userStorage } from "@/store/Storage";
import { resetAndNavigate } from "@/utils/Helpers";
import { clearUser, setError } from "@/store/reducers/users/userSlice";
import { LOGIN } from "@/store/API";
import { UserAuthResponse, UserResponse } from "./users.types";
import { appAxios } from "@/store/apiconfig";
import { setUser } from "../../reducers/users/userSlice";

interface Login {
  userName: string;
  password: string;
}

export interface SettingsResponse {
  mainUrl: string;
  phoneNumberForNotifications: number[];
  quality: number;
  tolerance: {
    time: number;
    distance: number;
  };
  messageFlag: boolean;
  paymentLink: string;
  callMaskingNumber: string;
  permissionFlag: {
    ivr: boolean;
    image_click: boolean;
    update_service: boolean;
  };
  version: string;
  appLink: string;
}
export const login = (data: Login) => async (dispatch: AppDispatch) => {
  try {
    const res = await appAxios.post<UserAuthResponse>(LOGIN, data);
    console.log("API response data:", res.data);
    if (res.data.success) {
      tokenStorage.set("app_access_token", res.data.token);
      userStorage.set("user_id", res.data.user.id);
      console.log("user id new one is this ", res.data.user.id);

      await dispatch(getUserData());
      resetAndNavigate("/(routes)/dashboard");
    } else {
      dispatch(setError(res.data.msg || "Invalid credentials"));
    }
  } catch (error) {
    dispatch(setError("Invalid credentials"));
  }
};

export const logout = () => (dispatch: any) => {
  tokenStorage.clearAll();
  userStorage.clearAll();

  dispatch(clearUser());

  resetAndNavigate("/(routes)/login");
};

// export const getUserData = () => async (dispatch: AppDispatch) => {
//   try {
//     console.log("user details called");

//     const res = await appAxios.get<UserResponse>("/api/v1/me");

//     if (res.data.success) {
//       dispatch(setUser(res.data.user));
//     } else {
//       logout();
//     }
//   } catch (error) {
//     dispatch(setError("Failed to fetch user data"));
//     logout();
//   }
// };

export const getUserData = () => async (dispatch: AppDispatch) => {
  try {
    const res = await appAxios.get<UserResponse>("/api/v1/me");

    if (res.data.success) {
      const userWithId = {
        ...res.data.user,
        id: res.data.id,
      };
      dispatch(setUser(userWithId));
    } else {
      logout();
    }
  } catch (error) {
    dispatch(setError("Failed to fetch user data"));
    logout();
  }
};
