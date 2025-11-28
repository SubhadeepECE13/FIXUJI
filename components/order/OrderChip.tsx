import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

import color from "@/themes/Colors.themes";
import { fontSizes, windowWidth } from "@/themes/Constants.themes";

interface ChipProps {
  label: string;
  style?: ViewStyle;
  backgroundColor?: string;
  textColor?: string;
  lebelStyle?: TextStyle;
}

const getChipStyle = (label: string) => {
  switch (label || "".toLowerCase()) {
    case "compact suv":
      return {
        backgroundColor: color.lightBlue,
        icon: "car",
        textColor: color.titleText,
      };
    case "7 seater":
      return {
        backgroundColor: color.lightRed,
        icon: "car",
        textColor: color.regularText,
      };
    case "suv":
      return {
        backgroundColor: color.lightSkyBlue,
        icon: "car",
        textColor: color.regularText,
      };
    case "sedan":
      return {
        backgroundColor: color.lightYellow,
        icon: "car-side",
        textColor: color.regularText,
      };
    case "hatchback":
      return {
        backgroundColor: color.lightGreen,
        icon: "car-hatchback",
        textColor: color.regularText,
      };
    default:
      return {
        backgroundColor: color.gray,
        icon: "tag",
        textColor: color.whiteColor,
      };
  }
};

const Chip: React.FC<ChipProps> = ({
  label,
  lebelStyle,
  style,
  backgroundColor,
  textColor,
}) => {
  const chipStyle = getChipStyle(label);

  // Use provided colors if passed, else fallback to internal style
  const finalBackgroundColor = backgroundColor ?? chipStyle.backgroundColor;
  const finalTextColor = textColor ?? chipStyle.textColor;

  // const finalBackgroundColor = backgroundColor;
  // const finalTextColor = textColor;

  return (
    <View
      style={[styles.chip, { backgroundColor: finalBackgroundColor }, style]}
    >
      <Text style={[styles.label, { color: finalTextColor }]}>{label}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: windowWidth(2),
    paddingHorizontal: windowWidth(2),
    paddingVertical: windowWidth(1),
    alignSelf: "flex-start",
  },
  icon: {
    marginRight: windowWidth(1),
  },
  label: {
    fontSize: fontSizes.sm,
  },
});
