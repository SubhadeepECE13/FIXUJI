import color from "@/themes/Colors.themes";
import { windowWidth } from "@/themes/Constants.themes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Footer = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        width: windowWidth(100),
        gap: windowWidth(2),
        marginTop: 5,
      }}
    >
      <Text>Have Questions? Message us on</Text>
      <Text style={{ color: color.primary }}>+91-9954625784</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
