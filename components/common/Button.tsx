import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import React from "react";
import {
  ActivityIndicator,
  ButtonProps,
  DimensionValue,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CustomIcon, IconPropsMap } from "./Icon";

interface Props<T extends keyof IconPropsMap = keyof IconPropsMap>
  extends ButtonProps {
  style?: ViewStyle;
  isIcon?: boolean;
  iconType?: T;
  iconName?: T extends keyof IconPropsMap ? IconPropsMap[T] : never; // Dynamically infer icon names based on iconType
  iconColor?: string;
  iconStyle?: ViewStyle | TextStyle;
  titleStyle?: TextStyle;
  iconSize?: number;
  isLoading?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: string;
  textColor?: string;
}

const Button = <T extends keyof IconPropsMap>({
  title,
  style,
  onPress,
  width = "100%",
  backgroundColor = color.primary,
  textColor = color.whiteColor,
  height,
  disabled = false,
  isIcon = false,
  iconType,
  iconName,
  iconColor = color.whiteColor,
  iconStyle,
  titleStyle,
  iconSize = 24,
  isLoading = true,
}: Props<T>) => {
  const widthNumber = width;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: widthNumber,
          backgroundColor: backgroundColor,
          height: height || windowHeight(6),
          opacity: disabled ? 0.7 : 1,
        },
        style ? style : {},
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {isIcon && iconType && iconName && (!disabled || !isLoading) && (
        <CustomIcon
          type={iconType}
          name={iconName}
          color={iconColor}
          style={iconStyle}
          size={iconSize}
        />
      )}
      {(!disabled || !isLoading) && (
        <Text
          style={[
            commonStyles.mediumText23,
            {
              color: textColor,
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}

      {disabled && isLoading && (
        <View style={[{ position: "absolute" }]}>
          <ActivityIndicator
            size="small"
            color={textColor || color.whiteColor}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: windowWidth(2),
    backgroundColor: color.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
