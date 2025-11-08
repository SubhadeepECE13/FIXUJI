import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import color from "@/themes/Colors.themes";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import Button from "../common/Button";
import CustomModal from "../common/CustomModal";
import Animated, { ZoomIn } from "react-native-reanimated";

interface Props {
  isOpen: boolean;
  setOpened: (val: boolean) => void;
  address: string;
  latitude?: number | string;
  longitude?: number | string;
}

const AddressModal: React.FC<Props> = ({
  isOpen,
  setOpened,
  address,
  latitude,
  longitude,
}) => {
  const openInMap = () => {
    if (latitude && longitude) {
      const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(mapUrl);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      setOpened={setOpened}
      isBlur
      blurIntensity={25}
      blurTint="dark"
    >
      <Animated.View
        style={styles.addressText}
        entering={ZoomIn.duration(250).springify().damping(15).stiffness(150)}
      >
        <View style={styles.modalBox}>
          <Text style={styles.title}>Customer Address</Text>
          <Text style={styles.addressText}>{address}</Text>

          {latitude && longitude ? (
            <Button
              title="View on Map"
              onPress={openInMap}
              backgroundColor={color.primary}
              height={windowHeight(4.5)}
              width={windowWidth(60)}
            />
          ) : null}
        </View>
      </Animated.View>
    </CustomModal>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  modalBox: {
    width: windowWidth(80),
    backgroundColor: color.whiteColor,
    padding: windowWidth(5),
    borderRadius: windowWidth(5),
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(1),
  },
  addressText: {
    fontSize: fontSizes.rg,
    color: color.regularText,
    textAlign: "center",
    marginBottom: windowHeight(2),
  },
  closeButton: {
    marginTop: windowHeight(1),
  },
  closeText: {
    fontSize: fontSizes.sm,
    color: color.primary,
    fontFamily: fonts.semiBold,
  },
});
