// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import { yupResolver } from "@hookform/resolvers/yup";
// import React, { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { StyleSheet, Text, View } from "react-native";
// import * as Yup from "yup";

// import Button from "@/components/common/Button";
// import CustomModal from "@/components/common/CustomModal";
// import Input from "@/components/common/Input";
// import { updateCarDetails } from "@/store/actions/orders/carUpdateActions";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import BrandSelectSheet from "./BrandSelectionModal";

// type UpdateCarDetailsModalProps = {
//   isOpen: boolean;
//   setOpened: (val: boolean) => void;
//   orderId: string;
//   onSuccess?: () => void;
//   // handleSendLocation: () => void;
//   orderDocId: string;
// };

// interface VehicleUpdateFormData {
//   brand: string;
//   model: string;
//   numberPlate?: string;
//   capturedImage?: string;
// }

// const validationSchema = Yup.object().shape({
//   brand: Yup.string().required("Brand Name is required"),
//   model: Yup.string().required("Car Model is required"),
//   numberPlate: Yup.string().optional(),
//   capturedImage: Yup.string().optional(),
// });

// const UpdateCarDetailsModal: React.FC<UpdateCarDetailsModalProps> = ({
//   isOpen,
//   setOpened,
//   orderId,
//   onSuccess,
//   // handleSendLocation,
//   orderDocId,
// }) => {
//   const dispatch = useAppDispatch();
//   const { loading } = useAppSelector((state) => state.car);
//   const [disabled, setDisabled] = useState(false);
//   const brandSheetRef = useRef<BottomSheetModal>(null);

//   const { control, handleSubmit, reset, setValue, watch, formState } =
//     useForm<VehicleUpdateFormData>({
//       resolver: yupResolver(validationSchema),
//       defaultValues: {
//         brand: "",
//         model: "",
//         numberPlate: "",
//         capturedImage: "",
//       },
//     });

//   const handleUpdate = async (data: VehicleUpdateFormData) => {
//     setDisabled(true);
//     try {
//       if (!orderDocId) {
//         throw new Error("Order ID is required to update car details.");
//       }
//       await dispatch(updateCarDetails(orderDocId, data));
//       onSuccess?.();
//       // if (handleSendLocation) {
//       //   handleSendLocation();
//       // }
//       reset();
//       setOpened(false);
//     } catch (error) {
//       console.error("Error updating car details:", error);
//     } finally {
//       setDisabled(false);
//     }
//   };

//   return (
//     <>
//       <CustomModal
//         isOpen={isOpen}
//         setOpened={setOpened}
//         isBlur
//         blurTint="dark"
//         blurIntensity={25}
//       >
//         <View style={styles.modalBox}>
//           <Text style={styles.title}>Update Car Details</Text>

//           <View style={styles.formContainer}>
//             {/* Brand Field */}
//             <Input
//               control={control}
//               name="brand"
//               type="select"
//               placeholder="Select Car Brand"
//               onSelectPress={() => {
//                 setOpened(false);
//                 setTimeout(() => brandSheetRef.current?.present?.(), 100);
//               }}
//             />

//             <Input
//               control={control}
//               name="model"
//               placeholder="Enter Car Model"
//             />

//             <Input
//               control={control}
//               name="numberPlate"
//               placeholder="Enter Number Plate"
//             />

//             <Input
//               control={control}
//               name="capturedImage"
//               type="image"
//               placeholder="Add Car Image"
//               orderId={orderId}
//             />
//           </View>

//           <Button
//             width={windowWidth(50)}
//             height={windowHeight(5)}
//             title="Update"
//             backgroundColor={color.primary}
//             onPress={handleSubmit(handleUpdate)}
//             disabled={disabled || loading}
//             titleStyle={{ fontSize: fontSizes.md }}
//             isLoading={loading}
//           />
//         </View>
//       </CustomModal>

//       {/* Brand Sheet */}
//       <BrandSelectSheet
//         ref={brandSheetRef}
//         onSelect={(brand) => {
//           setValue("brand", brand, { shouldValidate: true });
//           brandSheetRef.current?.close();
//           setOpened(true);
//         }}
//       />
//     </>
//   );
// };

// export default UpdateCarDetailsModal;

// const styles = StyleSheet.create({
//   modalBox: {
//     width: windowWidth(85),
//     backgroundColor: color.whiteColor,
//     borderRadius: windowWidth(5),
//     paddingVertical: windowHeight(2),
//     paddingHorizontal: windowWidth(4),
//     alignItems: "center",
//   },
//   title: {
//     fontSize: fontSizes.md,
//     fontFamily: fonts.bold,
//     color: color.primary,
//     marginBottom: windowHeight(2),
//   },
//   formContainer: {
//     width: windowWidth(75),
//     marginBottom: windowHeight(2),
//   },
//   errorText: {
//     color: "red",
//     fontSize: fontSizes.sm,
//     marginTop: 4,
//     alignSelf: "flex-start",
//   },
// });

import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import Button from "@/components/common/Button";
import CustomModal from "@/components/common/CustomModal";
import Input from "@/components/common/Input";
import { updateCarDetails } from "@/store/actions/orders/carUpdateActions";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BrandSelectSheet from "./BrandSelectionModal";

type UpdateCarDetailsModalProps = {
  isOpen: boolean;
  setOpened: (val: boolean) => void;
  orderId: string;
  orderDocId: string;
  onSuccess?: () => void;
};

interface VehicleUpdateFormData {
  brand: string;
  model: string;
  numberPlate?: string;
  capturedImage?: string;
}

const validationSchema = Yup.object().shape({
  brand: Yup.string().required("Brand Name is required"),
  model: Yup.string().required("Car Model is required"),
  numberPlate: Yup.string().optional(),
  capturedImage: Yup.string().optional(),
});

const UpdateCarDetailsModal: React.FC<UpdateCarDetailsModalProps> = ({
  isOpen,
  setOpened,
  orderId,
  orderDocId,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.car);
  const carData = useAppSelector(
    (state) => state.orderDetails?.orderDetails?.data.vehicle
  );

  const [disabled, setDisabled] = useState(false);
  const brandSheetRef = useRef<BottomSheetModal>(null);
  const carBrand = carData?.brand;
  const carModel = carData?.model;
  const carNumberplate = carData?.numberPlate;
  const { control, handleSubmit, reset, setValue } =
    useForm<VehicleUpdateFormData>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        brand: carBrand,
        model: carModel,
        numberPlate: carNumberplate,
        capturedImage: "",
      },
    });

  const handleUpdate = async (data: VehicleUpdateFormData) => {
    setDisabled(true);
    try {
      await dispatch(updateCarDetails(orderDocId, data));
      onSuccess?.();
      reset();
      setOpened(false);
    } catch (error) {
      console.error("Error updating car details:", error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        setOpened={setOpened}
        isBlur
        blurTint="dark"
        blurIntensity={25}
      >
        <View style={styles.modalBox}>
          <Text style={styles.title}>Update Car Details</Text>

          <View style={styles.formContainer}>
            {/* Brand Field */}
            <Input
              control={control}
              name="brand"
              type="select"
              placeholder="Select Car Brand"
              onSelectPress={() => {
                setOpened(false);
                setTimeout(() => brandSheetRef.current?.present?.(), 100);
              }}
            />

            <Input
              control={control}
              name="model"
              placeholder="Enter Car Model"
            />

            <Input
              control={control}
              name="numberPlate"
              placeholder="Enter Number Plate"
            />

            <Input
              control={control}
              name="capturedImage"
              type="image"
              placeholder="Add Car Image"
              orderId={orderId}
            />
          </View>

          <Button
            width={windowWidth(50)}
            height={windowHeight(5)}
            title="Update"
            backgroundColor={color.primary}
            onPress={handleSubmit(handleUpdate)}
            disabled={disabled || loading}
            titleStyle={{ fontSize: fontSizes.md }}
            isLoading={loading}
          />
        </View>
      </CustomModal>

      {/* Brand Bottom Sheet */}
      <BrandSelectSheet
        ref={brandSheetRef}
        onSelect={(brand) => {
          setValue("brand", brand, { shouldValidate: true });
          brandSheetRef.current?.close();
          setOpened(true);
        }}
      />
    </>
  );
};

export default UpdateCarDetailsModal;

const styles = StyleSheet.create({
  modalBox: {
    width: windowWidth(85),
    backgroundColor: color.whiteColor,
    borderRadius: windowWidth(5),
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(4),
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(2),
  },
  formContainer: {
    width: windowWidth(75),
    marginBottom: windowHeight(2),
  },
});
