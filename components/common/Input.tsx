import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  Alert,
  Platform,
  ActionSheetIOS,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CustomIcon } from "./Icon";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import color from "@/themes/Colors.themes";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { uploadCarImage } from "@/store/actions/carImage/uploadCarImage.action";

interface InputProps {
  control: Control<any>;
  name: string;
  title?: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  secureTextEntry?: boolean;
  inputStyle?: TextStyle;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  type?: "text" | "select" | "image";
  onSelectPress?: () => void;
  orderId?: string;
}

export default function Input({
  control,
  name,
  title,
  placeholder,
  keyboardType,
  disabled,
  secureTextEntry,
  inputStyle,
  containerStyle,
  titleStyle,
  type = "text",
  onSelectPress,
  orderId,
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { loading: imageUploading } = useAppSelector(
    (state) => state.carImageUpload
  );

  const requestPermissions = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraStatus.status !== "granted" ||
      galleryStatus.status !== "granted"
    ) {
      Alert.alert(
        "Permission Required",
        "Camera and gallery permissions are needed."
      );
      return false;
    }
    return true;
  };

  const pickImage = async (onChange: (val: string) => void) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const openCamera = async () => {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const selectedUri = result.assets[0].uri;

        if (!orderId) {
          Alert.alert("Error", "Order ID is missing for image upload.");
          return;
        }
        console.log("Order Id for uploading Image Car ", orderId);

        try {
          const uploadedUrl = await dispatch(
            uploadCarImage(orderId, selectedUri)
          );

          onChange(uploadedUrl);
        } catch (err) {
          console.error("Upload failed", err);
          Alert.alert("Upload Failed", "Please try again.");
        }
      }
    };

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Take Photo"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) openCamera();
        }
      );
    } else {
      openCamera();
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={[containerStyle, { marginVertical: windowHeight(0.6) }]}>
          {title && (
            <Text
              style={[styles.title, { color: color.titleText }, titleStyle]}
            >
              {title}
            </Text>
          )}

          {type === "text" && (
            <View>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: color.lightGray,
                    borderColor: error ? color.red : color.appHeaderText,
                    fontFamily: fonts.regular,
                  },
                  inputStyle,
                ]}
                value={value}
                onChangeText={onChange}
                editable={!disabled}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                keyboardType={keyboardType}
                placeholderTextColor={color.appHeaderText}
              />

              {secureTextEntry && (
                <TouchableOpacity
                  style={[styles.eye, { top: "29%" }]}
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                >
                  <CustomIcon
                    type="Ionicons"
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={windowHeight(2.5)}
                    color="gray"
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {type === "select" && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.selectBox,
                { borderColor: error ? color.red : color.appHeaderText },
              ]}
              onPress={onSelectPress}
            >
              <Text
                style={{
                  color: value ? color.regularText : color.placeholderText,
                  fontFamily: fonts.regular,
                }}
              >
                {value || placeholder}
              </Text>
              <CustomIcon
                type="Ionicons"
                name="chevron-down"
                size={windowHeight(2.2)}
                color={color.primary}
              />
            </TouchableOpacity>
          )}

          {type === "image" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => pickImage(onChange)}
              style={[
                styles.imageBox,
                {
                  borderColor: error ? color.red : color.appHeaderText,
                  backgroundColor: value ? color.whiteColor : color.lightGray,
                },
              ]}
            >
              {imageUploading ? (
                <View style={styles.imagePlaceholderContainer}>
                  <CustomIcon
                    type="Ionicons"
                    name="cloud-upload-outline"
                    size={windowHeight(2.6)}
                    color={color.primary}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: fontSizes.rg,
                      marginLeft: windowWidth(2),
                      color: color.primary,
                    }}
                  >
                    Uploading image...
                  </Text>
                </View>
              ) : value ? (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: `${value}?t=${Date.now()}` }}
                    style={styles.imagePreview}
                  />
                  <View style={styles.imageTextContainer}>
                    <Text style={styles.imageTitle}>Car Image</Text>
                    <Text style={styles.imageSubtitle}>Tap to retake</Text>
                  </View>
                  <CustomIcon
                    type="MaterialCommunityIcons"
                    name="camera-retake-outline"
                    size={windowHeight(2.6)}
                    color={color.primary}
                  />
                </View>
              ) : (
                <View style={styles.imagePlaceholderContainer}>
                  <View style={styles.imageIconCircle}>
                    <CustomIcon
                      type="MaterialCommunityIcons"
                      name="camera-plus-outline"
                      size={windowHeight(2.6)}
                      color={color.primary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.imagePlaceholderTitle}>
                      {placeholder}
                    </Text>
                    <Text style={styles.imagePlaceholderSubtitle}>
                      Tap to capture photo
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          )}

          {error && (
            <Text style={[styles.warning]}>{error.message || "Error"}</Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.rg,
    marginBottom: windowHeight(0.3),
    marginLeft: windowWidth(0.8),
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    height: windowHeight(5),
    color: color.regularText,
    paddingHorizontal: windowWidth(3),
    opacity: 0.8,
  },
  selectBox: {
    borderWidth: 1,
    borderRadius: 10,
    height: windowHeight(5.2),
    paddingHorizontal: windowWidth(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: color.lightGray,
  },
  warning: {
    color: color.red,
    fontSize: fontSizes.sm,
    marginTop: windowHeight(0.2),
    marginLeft: windowWidth(0.8),
  },
  eye: {
    position: "absolute",
    right: windowWidth(2.8),
    zIndex: 1,
    opacity: 0.6,
  },
  imageBox: {
    borderWidth: 1,
    borderRadius: windowHeight(1.2),
    paddingVertical: windowHeight(1.5),
    paddingHorizontal: windowWidth(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight(0.5),
  },
  imagePreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  imagePreview: {
    width: windowWidth(13),
    height: windowWidth(13),
    borderRadius: windowHeight(1.5),
    marginRight: windowWidth(3),
    borderWidth: 1,
    borderColor: color.borderColor,
  },
  imageTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  imageTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.rg,
    color: color.background,
  },
  imageSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    color: color.placeholderText,
  },
  imagePlaceholderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  imageIconCircle: {
    width: windowWidth(10),
    height: windowWidth(10),
    borderRadius: windowWidth(5),
    backgroundColor: color.whiteColor,
    borderWidth: 1,
    borderColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: windowWidth(3),
  },
  imagePlaceholderTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.rg,
    color: color.placeholderText,
  },
  imagePlaceholderSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    color: color.appHeaderText,
  },
});
