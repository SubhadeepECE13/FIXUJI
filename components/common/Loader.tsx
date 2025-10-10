import color from "@/themes/Colors.themes";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          zIndex: 100000,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color.backDropColor,
        },
      ]}
    >
      <ActivityIndicator size={"large"} color={color.primary} />
    </View>
  );
};

export default Loader;
