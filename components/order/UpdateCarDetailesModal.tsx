import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";

import CustomModal from "@/components/common/CustomModal";
import Button from "@/components/common/Button";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import { updateCarDetails } from "@/store/actions/orders/carUpdateActions";

type UpdateCarDetailsModalProps = {
  isOpen: boolean;
  setOpened: (val: boolean) => void;
  orderId: string;
  onSuccess?: () => void;
};

const UpdateCarDetailsModal: React.FC<UpdateCarDetailsModalProps> = ({
  isOpen,
  setOpened,
  orderId,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.car);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    numberPlate: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updateCarDetails(orderId, formData));
      onSuccess?.();
      setOpened(false);
    } catch (error) {
      console.error("Error updating car details:", error);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      setOpened={setOpened}
      isBlur
      blurTint="dark"
      blurIntensity={25}
    >
      <View style={styles.modalBox}>
        <Text style={styles.title}>Update Car Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Car Brand"
          value={formData.brand}
          onChangeText={(text) => handleChange("brand", text)}
          placeholderTextColor={color.gray}
        />

        <TextInput
          style={styles.input}
          placeholder="Car Model"
          value={formData.model}
          onChangeText={(text) => handleChange("model", text)}
          placeholderTextColor={color.gray}
        />

        <TextInput
          style={styles.input}
          placeholder="Number Plate"
          value={formData.numberPlate}
          onChangeText={(text) => handleChange("numberPlate", text)}
          placeholderTextColor={color.gray}
        />

        <Button
          width={windowWidth(50)}
          height={windowHeight(5)}
          title="Update"
          backgroundColor={color.primary}
          onPress={handleSubmit}
          disabled={
            !formData.brand ||
            !formData.model ||
            !formData.numberPlate ||
            loading
          }
          titleStyle={{ fontSize: fontSizes.md }}
          isLoading={loading}
        />
      </View>
    </CustomModal>
  );
};

export default UpdateCarDetailsModal;

const styles = StyleSheet.create({
  modalBox: {
    width: windowWidth(85),
    backgroundColor: color.whiteColor,
    borderRadius: 16,
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(4),
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: color.appHeaderText,
    marginBottom: windowHeight(2),
  },
  input: {
    width: "100%",
    backgroundColor: color.whiteColor,
    borderRadius: 8,
    paddingHorizontal: windowWidth(3),
    paddingVertical: windowHeight(1.2),
    fontSize: fontSizes.md,
    color: color.blue,
    marginBottom: windowHeight(1.5),
  },
});
