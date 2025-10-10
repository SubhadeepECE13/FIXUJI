import Images from "@/utils/images";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import Button from "./Button";
import { fontSizes, windowHeight } from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";

const ListEmpty = ({
  onPress,
  title,
  btnTitle,
}: {
  onPress: () => void;
  title: string;
  btnTitle: string;
}) => {
  return (
    <Animated.View
      style={styles.notFoundContainer}
      entering={ZoomIn.delay(250).damping(10).stiffness(200)}
    >
      <View style={styles.notFoundImageContainer}>
        <Image source={Images.notFound} style={styles.notFoundImage} />
        <Text style={styles.notFoundText}>{title}</Text>
      </View>
      <Button
        title={btnTitle}
        width={"45%"}
        onPress={onPress}
        titleStyle={{ fontSize: fontSizes.rg }}
      />
    </Animated.View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  notFoundContainer: {
    height: windowHeight(50),
    justifyContent: "center",
    rowGap: windowHeight(5),
    alignItems: "center",
  },
  notFoundImage: {
    objectFit: "contain",
    width: "100%",
    height: "80%",
  },
  notFoundImageContainer: {
    width: "60%",
    height: "60%",
  },
  notFoundText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.md,
    color: color.placeholderText,
    textAlign: "center",
    marginTop: windowHeight(0.5),
  },
});
