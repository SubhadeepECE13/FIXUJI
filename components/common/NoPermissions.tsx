import { useAppSelector } from "@/store/Reduxhook";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { openAppSettings } from "@/utils/Permissions.utils";

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { ZoomInDown, ZoomOutDown } from "react-native-reanimated";

type NoPermissionProps = {
  resetPermissionCallCount: () => void;
};

const NoPermission = ({ resetPermissionCallCount }: NoPermissionProps) => {
  const { isCameraPermission, isLoactionPermission } = useAppSelector(
    (state) => state.user
  );

  const openPermissionSettings = () => {
    resetPermissionCallCount();
    openAppSettings();
  };

  if (isCameraPermission == "granted" && isLoactionPermission == "granted") {
    return null;
  }

  return (
    <Animated.View
      style={[styles.container, commonStyles.deepShadowContainer]}
      entering={ZoomInDown.duration(500).springify().damping(70).stiffness(150)}
      exiting={ZoomOutDown.duration(300)}
    >
      <Text style={styles.text}>
        {isCameraPermission !== "granted" ? "Camera" : null}
        {isCameraPermission !== "granted" && isLoactionPermission !== "granted"
          ? " and "
          : null}
        {isLoactionPermission !== "granted" ? "Location" : null} Permission
        Needed
      </Text>
      <TouchableOpacity
        onPress={openPermissionSettings}
        style={styles.retryButton}
      >
        <Text style={styles.retryText}>Settings</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: windowWidth(100),
    backgroundColor: color.red,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: windowHeight(2),
    zIndex: 1000,
  },
  text: {
    maxWidth: windowWidth(65),
    textAlign: "center",
    color: color.whiteColor,
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    marginTop: windowHeight(0.5),
  },
  retryButton: {
    paddingVertical: windowHeight(0.5),
    paddingHorizontal: windowWidth(4),
    backgroundColor: color.whiteColor,
    borderRadius: 5,
  },
  retryText: {
    color: color.red,
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
  },
});

export default NoPermission;
