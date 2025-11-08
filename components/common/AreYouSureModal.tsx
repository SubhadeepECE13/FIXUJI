import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import { CustomIcon } from "./Icon";
import Button from "./Button";
import { fontSizes, windowWidth } from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";
import CustomModal, { CustomModalProps } from "./CustomModal";
import fonts from "@/themes/Fonts.themes";

interface Props extends CustomModalProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
}

const AreYouSureModal = ({
  isOpen,
  setOpened,
  title,
  onPress,
  icon,
}: Props) => {
  return (
    <CustomModal isOpen={isOpen} setOpened={setOpened}>
      <View style={styles.container}>
        <Animated.View
          entering={FadeInUp.delay(250).springify().damping(10).stiffness(200)}
        >
          {icon ? (
            icon
          ) : (
            <CustomIcon
              type="MaterialIcons"
              name="info-outline"
              color={color.appYellow}
              size={windowWidth(24)}
            />
          )}
        </Animated.View>

        <Text style={styles.text}>{title}</Text>

        <View style={styles.buttonContainer}>
          <Button
            width={"45%"}
            backgroundColor={color.red}
            textColor={color.whiteColor}
            title="Cancel"
            onPress={() => {
              setOpened(false);
            }}
          />
          <Button
            width={"45%"}
            textColor={color.whiteColor}
            title="Confirm"
            onPress={onPress}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default AreYouSureModal;

const styles = StyleSheet.create({
  container: {
    width: windowWidth(80),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.whiteColor,
    borderRadius: 20,
    padding: windowWidth(4),
  },
  text: {
    fontSize: fontSizes.smMd,
    fontFamily: fonts.medium,
    marginVertical: windowWidth(2),
    width: "100%",
    textAlign: "center",
    color: color.regularText,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: windowWidth(3),
  },
});
