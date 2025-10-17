import React, { FC } from "react";
import {
  DimensionValue,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Skeleton } from "moti/skeleton";

interface CustomSkeletonLoaderProps {
  dWidth?: DimensionValue;
  dHeight?: DimensionValue;
  radius?: number;
  colorMode?: "light" | "dark";
  show?: boolean;
  style?: ViewProps["style"];
  children?: React.ReactElement;
}

const CustomSkeletonLoader: FC<CustomSkeletonLoaderProps> = ({
  dWidth = "100%",
  dHeight,
  radius,
  colorMode = "light",
  show = true,
  style,
  children,
}) => {
  return (
    <View style={style}>
      <Skeleton
        width={dWidth}
        height={dHeight}
        radius={radius}
        colorMode={colorMode}
        show={show}
      >
        {children}
      </Skeleton>
    </View>
  );
};

export default CustomSkeletonLoader;
