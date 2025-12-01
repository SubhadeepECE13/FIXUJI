import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import color from "@/themes/Colors.themes";

interface Props {
  upiId: string;
  businessName: string;
  amount: number;
}

const UPIQrCard: React.FC<Props> = ({ upiId, businessName, amount }) => {
  const qrPayload = `upi://pay?pa=${upiId}&pn=${businessName}&am=${amount}&cu=INR`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{businessName}</Text>
      <Text style={styles.amount}>₹{amount}</Text>

      <QRCode value={qrPayload} size={windowWidth(45)} />

      <Text style={styles.scanText}>Scan QR to Pay</Text>
    </View>
  );
};

export default UPIQrCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth(80),
    backgroundColor: color.whiteColor,
    alignItems: "center",
    paddingVertical: windowHeight(2.5),
    paddingHorizontal: windowWidth(4),
    borderRadius: windowWidth(4),
    marginTop: windowHeight(2),
    alignSelf: "center",
  },
  label: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(1),
  },
  amount: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.regular,
    marginBottom: windowHeight(2),
  },
  scanText: {
    marginTop: windowHeight(1.5),
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: color.regularText,
  },
});
