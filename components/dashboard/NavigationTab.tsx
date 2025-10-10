import { NavigationTabProps } from "@/@types/global";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

import { Href, RelativePathString, router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const NavigationTab = ({ image, route, title }: NavigationTabProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: route as RelativePathString,
        });
      }}
      key={title}
      style={[styles.tab, commonStyles.deepShadowContainer]}
    >
      <Image source={image} style={styles.tabIcon} />
      <Text style={styles.tabText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default NavigationTab;

const styles = StyleSheet.create({
  tab: {
    paddingVertical: windowHeight(1),
    paddingHorizontal: windowWidth(1.5),
    width: "30%",
    height: windowHeight(11),
    borderRadius: 15,
    backgroundColor: color.whiteColor,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: "40%",
    height: "40%",
    objectFit: "contain",
  },
  tabText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.xsm,
    marginTop: windowHeight(1),
  },
});
