import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type HeaderProps = {
  title: string;
  isBack: boolean;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  onPressLeftIcon?: () => void;
  rightIconName?: keyof typeof Feather.glyphMap;
  onPressRightIcon?: () => void;
  date?: string;
};

const Header = ({
  isBack = true,
  isLeftIcon = false,
  isRightIcon = true,
  onPressLeftIcon = () => {
    router.back();
  },
  onPressRightIcon = () => {
    router.navigate("/(routes)/profile");
  },
  rightIconName = "user",
  title,
  date = "",
}: HeaderProps) => {
  const newDate = new Date(date);
  return (
    <View style={[styles.header, commonStyles.whiteContainer]}>
      {isBack ? (
        <TouchableOpacity
          onPress={onPressLeftIcon}
          style={[styles.icon, styles.leftIcon]}
        >
          <Feather name="chevron-left" size={26} color="black" />
        </TouchableOpacity>
      ) : isLeftIcon ? (
        <TouchableOpacity
          onPress={onPressLeftIcon}
          style={[styles.icon, styles.rightIcon]}
        >
          <MaterialIcons name="route" size={26} color={color.whiteColor} />
        </TouchableOpacity>
      ) : (
        <View style={[styles.icon, { width: windowWidth(10) }]}></View>
      )}
      <Text style={styles.titleText}>{title}</Text>
      {isRightIcon ? (
        <TouchableOpacity
          onPress={onPressRightIcon}
          style={[styles.icon, styles.rightIcon]}
        >
          {date !== "" ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.dateText}>{newDate.getDate()}</Text>
            </View>
          ) : (
            <Feather name={rightIconName} size={26} color={color.whiteColor} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={[styles.icon, { width: windowWidth(10) }]}></View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: windowHeight(7),
    paddingHorizontal: windowWidth(4),
    zIndex: 100,
  },
  icon: {
    borderRadius: windowWidth(10),
    width: windowWidth(10),
    height: windowWidth(10),
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    backgroundColor: color.whiteColor,
    elevation: 1,
  },
  rightIcon: {
    backgroundColor: color.primary,
  },
  titleText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.medium,
    textAlign: "center",
  },
  dateText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.lg,
    color: color.whiteColor,
    marginTop: windowHeight(0.5),
  },
});
