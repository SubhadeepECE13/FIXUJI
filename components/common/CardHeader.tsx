import React from "react";
import { View, Text, StyleSheet, DimensionValue } from "react-native";
import Button from "./Button";
import color from "@/themes/Colors.themes";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

interface Props {
  title: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  buttonColor?: string;
  containerStyle?: object;
  titleStyle?: object;
  buttonWidth?: DimensionValue;
  buttonHeight?: DimensionValue;
}

const CardHeader: React.FC<Props> = ({
  title,
  buttonTitle,
  onButtonPress,
  buttonColor = color.yellow,
  containerStyle,
  titleStyle,
  buttonWidth = windowWidth(25),
  buttonHeight = windowHeight(3.8),
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      {buttonTitle && onButtonPress && (
        <Button
          title={buttonTitle}
          onPress={onButtonPress}
          width={buttonWidth}
          height={buttonHeight}
          backgroundColor={buttonColor}
          titleStyle={styles.buttonText}
          style={{ alignSelf: "center", marginBottom: windowHeight(1.5) }}
        />
      )}
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: windowHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    // paddingBottom: windowHeight(1),
  },
  title: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    flexShrink: 1,
  },
  buttonText: {
    fontSize: fontSizes.rg,
  },
});
