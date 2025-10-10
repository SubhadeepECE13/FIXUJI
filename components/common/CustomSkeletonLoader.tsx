import color from "@/themes/Colors.themes";
import React, { FC } from "react";
import { DimensionValue, View } from "react-native";
// import SkeletonLoading from 'expo-skeleton-loading/index'
const CustomSkeletonLoader: FC<{
  dWidth?: DimensionValue;
  dHeight?: DimensionValue;
  radius?: number;
}> = ({ dWidth, dHeight, radius = 0 }) => {
  return (
    // <SkeletonLoading background={color.gray} highlight={color.whiteColor}>
    <View
      style={{
        width: dWidth,
        height: dHeight,
        borderRadius: radius,
        backgroundColor: color.gray,
      }}
    />
    // </SkeletonLoading>
  );
};

export default CustomSkeletonLoader;
