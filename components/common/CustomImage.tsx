import { windowWidth } from "@/themes/Constants.themes";
import Images from "@/utils/images";
import React, { memo, useMemo, useState } from "react";
import { Image, ImageProps, Text, View } from "react-native";

interface CustomeImageProps extends Omit<ImageProps, "source" | "onError"> {
  imageUrl: string;
  onErrorHandler?: () => unknown;
}

const CustomImage = ({
  imageUrl,
  onErrorHandler,
  height = windowWidth(15),
  width = windowWidth(15),
  borderRadius = 90,
  style,
  ...rest
}: CustomeImageProps) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);

  const normalizedUrl = useMemo(
    () =>
      imageUrl?.startsWith("gs://")
        ? imageUrl.replace("gs://", "https://")
        : imageUrl,
    [imageUrl]
  );

  return (
    <View style={{ height, width, borderRadius: borderRadius }}>
      <Image
        source={error || loading ? Images.profile : { uri: normalizedUrl }}
        style={[{ height, width, borderRadius: borderRadius }, style]}
        onError={() => {
          setError(true);
          onErrorHandler?.();
        }}
        onLoadEnd={() => {
          setloading(false);
        }}
        {...rest}
      />
    </View>
  );
};

export default memo(CustomImage);
