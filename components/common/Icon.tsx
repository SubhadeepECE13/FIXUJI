import * as Icons from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, TextStyle, ViewStyle } from "react-native";
import ThemeColor from "@/themes/Colors.themes";

// Extract all icon sets from `@expo/vector-icons`
export type IconSetKeys = keyof typeof Icons;

// Build a map of valid icon names for each icon set
export type IconPropsMap = {
  [K in IconSetKeys]: K extends keyof typeof Icons
    ? React.ComponentProps<(typeof Icons)[K]>["name"]
    : never;
};

// Define the props for the `CustomIcon` component
export interface CustomIconProps<T extends IconSetKeys> {
  name: IconPropsMap[T]; // Restrict `name` to valid names for the selected `type`
  size?: number; // Icon size
  color?: string; // Icon color
  type: T; // Icon set
  style?: ViewStyle | TextStyle; // Optional style
  isLoading?: boolean;
}

export const CustomIcon = <T extends IconSetKeys>({
  name,
  size = 24,
  color = "black",
  type,
  style,
  isLoading = false,
}: CustomIconProps<T>) => {
  // eslint-disable-next-line import/namespace
  const IconComponent = Icons[type] as React.ElementType<{
    name: IconPropsMap[T];
    size?: number;
    color?: string;
    style?: ViewStyle | TextStyle;
  }>;

  if (!IconComponent) {
    throw new Error(`Invalid icon type: ${type}`);
  }

  return isLoading ? (
    <ActivityIndicator size="small" color={ThemeColor.whiteColor} />
  ) : (
    <IconComponent name={name} size={size} color={color} style={style} />
  );
};
