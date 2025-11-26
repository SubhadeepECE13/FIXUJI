import { appAxios } from "@/store/apiconfig";
import {
  uploadFailure,
  uploadStart,
  uploadSuccess,
} from "@/store/reducers/carImage/uploadImageSlice";

import { AppDispatch } from "@/store/Store";
import Toast from "react-native-toast-message";

interface UploadResponse {
  msg: string;
  url: string;
}

export const uploadCarImage =
  (orderId: string, imageUri: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(uploadStart());

      const formData = new FormData();
      const filename = imageUri.split("/").pop()!;
      const type = `image/${filename.split(".").pop()}`;

      formData.append("file", {
        uri: imageUri,
        name: filename,
        type,
      } as any);

      const response = await appAxios.post<UploadResponse>(
        `/api/v1/upload/${orderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(
        "Order Id For Image Uploading ..............................@@@@@>>>>@>@>@>@ "
      );

      dispatch(uploadSuccess(response.data));

      Toast.show({
        type: "success",
        text1: "Image uploaded successfully!",
      });

      return response.data.url;
    } catch (error: any) {
      console.error("Error uploading car image:", error);
      dispatch(uploadFailure(error.message || "Upload failed"));
      Toast.show({
        type: "error",
        text1: "Image upload failed",
        text2: error.message || "Please try again",
      });
      throw error;
    }
  };
