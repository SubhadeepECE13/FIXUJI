// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppDispatch } from "@/store/Store";
// import { appAxios } from "@/store/apiconfig";

// import Toast from "react-native-toast-message";
// import { AddonType } from "@/store/actions/services/services.action";

// interface AddonState {
//   loading: boolean;
//   data: AddonType[];
//   error: string | null;
// }

// const initialState: AddonState = {
//   loading: false,
//   data: [],
//   error: null,
// };

// const addonSlice = createSlice({
//   name: "addons",
//   initialState,
//   reducers: {
//     fetchAddonsStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchAddonsSuccess: (state, action: PayloadAction<AddonType[]>) => {
//       state.loading = false;
//       state.data = action.payload;
//     },
//     fetchAddonsFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     resetAddonsState: (state) => {
//       state.loading = false;
//       state.data = [];
//       state.error = null;
//     },
//   },
// });

// export const {
//   fetchAddonsStart,
//   fetchAddonsSuccess,
//   fetchAddonsFailure,
//   resetAddonsState,
// } = addonSlice.actions;

// export default addonSlice.reducer;

// // 🔹 Thunk
// export const fetchAddonsByServiceVariant =
//   (service: string, variant: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(fetchAddonsStart());
//       const response = await appAxios.get(
//         `/api/v1/getAddonsByServiceVariant?service=${encodeURIComponent(
//           service
//         )}&variant=${encodeURIComponent(variant)}`
//       );

//       const addons = Array.isArray(response.data?.addons)
//         ? response.data.addons
//         : [];

//       dispatch(fetchAddonsSuccess(addons));
//     } catch (error: any) {
//       console.error("Error fetching addons:", error);
//       dispatch(fetchAddonsFailure(error.message || "Failed to fetch addons"));
//       Toast.show({
//         type: "error",
//         text1: "Failed to load addons",
//         text2: error.message || "Please try again",
//       });
//     }
//   };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddonVariant {
  vehicle_type: string;
  duration: number;
  display_price: number;
  actual_price: number;
}

export interface AddonItem {
  id: string;
  addon_name: string;
  addon_desc?: string;
  addon_img?: string;
  addon_type?: string;
  sort_order?: number;
  recommended?: boolean;
  variant: AddonVariant[];
}

interface AddonState {
  loading: boolean;
  data: AddonItem[];
  error: string | null;
}

const initialState: AddonState = {
  loading: false,
  data: [],
  error: null,
};

export const addonSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    fetchAddonsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAddonsSuccess: (state, action: PayloadAction<AddonItem[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAddonsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchAddonsStart, fetchAddonsSuccess, fetchAddonsFailure } =
  addonSlice.actions;

export default addonSlice.reducer;
