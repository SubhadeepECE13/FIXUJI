import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseToastProps, ToastConfig } from "react-native-toast-message";
import { CustomIcon } from "./Icon";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";

export const CustomToastConfig: ToastConfig = {
  success: ({ text1 }: BaseToastProps) => (
    <View style={[styles.container, { backgroundColor: color.green }]}>
      <CustomIcon
        type="MaterialCommunityIcons"
        name={"check-circle"}
        size={windowHeight(2.5)}
        color={color.whiteColor}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: color.whiteColor }]}>{text1}</Text>
      </View>
    </View>
  ),
  error: ({ text1 }: BaseToastProps) => (
    <View style={[styles.container, { backgroundColor: color.red }]}>
      <CustomIcon
        type="MaterialCommunityIcons"
        name={"close-circle"}
        size={windowHeight(2.5)}
        color={color.whiteColor}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: color.whiteColor }]}>{text1}</Text>
      </View>
    </View>
  ),
  info: ({ text1 }: BaseToastProps) => (
    <View style={[styles.container, { backgroundColor: color.blue }]}>
      <CustomIcon
        type="MaterialCommunityIcons"
        name={"information"}
        size={windowHeight(2.5)}
        color={color.whiteColor}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: color.whiteColor }]}>{text1}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: windowHeight(1.5),
    paddingHorizontal: windowWidth(4),
    borderRadius: windowHeight(1),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: windowHeight(0.2) },
    shadowOpacity: 0.3,
    shadowRadius: windowHeight(0.5),
    elevation: 5,
    marginHorizontal: windowWidth(4),
    marginTop: windowHeight(5),
  },
  textContainer: {
    flex: 1,
    marginLeft: windowWidth(3),
  },
  title: {
    fontSize: fontSizes.smMd,
    fontFamily: fonts.semiBold,
    marginTop: windowHeight(0.3),
  },
  message: {
    fontSize: fontSizes.rg,
    marginTop: windowHeight(0.5),
  },
});

export default CustomToastConfig;
