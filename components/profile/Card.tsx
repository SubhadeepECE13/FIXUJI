import { IUser } from "@/store/actions/users/users.types";
import { IMAGE_AVATAR } from "@/store/API";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

import Images from "@/utils/images";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import CustomImage from "../common/CustomImage";

const Card = ({ user }: { user: IUser }) => {
  const [error, setError] = useState(false);
  return (
    <Animated.View
      style={[styles.container, commonStyles.deepShadowContainer]}
      entering={ZoomIn.delay(80).damping(10).stiffness(200)}
    >
      <CustomImage imageUrl={user.vendor_img} />
      <Text style={styles.titleText}>{user.vendor_name}</Text>
      <Text style={[styles.subtitleText]}>{user.role}</Text>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.whiteColor,
    paddingHorizontal: windowWidth(5),
    paddingVertical: windowHeight(3),
    borderRadius: 18,
  },
  profileImage: {
    width: windowHeight(10),
    height: windowHeight(10),
    borderRadius: 100,
    borderWidth: 2,
    borderColor: color.primary,
    marginBottom: windowHeight(1),
  },
  titleText: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  subtitleText: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.borderColor,
    textAlign: "center",
  },
});
