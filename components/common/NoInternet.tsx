import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { ZoomInDown, ZoomOutDown } from "react-native-reanimated";
import { CustomIcon } from "./Icon";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { commonStyles } from "@/styles/common.style";

const NoInternet = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });
  };

  if (isConnected) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.container, commonStyles.deepShadowContainer]}
      entering={ZoomInDown.duration(500).springify().damping(70).stiffness(150)}
      exiting={ZoomOutDown.duration(300)}
    >
      <CustomIcon
        type="MaterialCommunityIcons"
        name={"wifi-off"}
        size={24}
        color={color.whiteColor}
      />
      <Text style={styles.text}>No Internet</Text>
      <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: windowWidth(100),
    backgroundColor: color.red,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 1000,
  },
  text: {
    color: color.whiteColor,
    marginLeft: windowWidth(2.5),
    fontSize: fontSizes.rg,
    fontFamily: fonts.medium,
    marginTop: windowHeight(0.5),
  },
  retryButton: {
    marginLeft: windowWidth(4),
    paddingVertical: windowHeight(0.5),
    paddingHorizontal: windowWidth(4),
    backgroundColor: color.whiteColor,
    borderRadius: 5,
  },
  retryText: {
    color: color.red,
    fontFamily: fonts.medium,
  },
});

export default NoInternet;
