import React from "react";
import { View, Text, StyleSheet } from "react-native";
import color from "@/themes/Colors.themes";
import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

interface Props {
  data: ServiceBooking["data"];
}

const VehicleCard: React.FC<Props> = ({ data }) => {
  const vehicle = data.vehicle;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Vehicle Details</Text>

      {[
        { label: "Brand", value: vehicle?.brand || "N/A" },
        { label: "Model", value: vehicle?.model || "N/A" },
        { label: "Number", value: vehicle?.numberPlate || "N/A" },
        { label: "Type", value: vehicle?.type || "N/A" },
      ].map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}:</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

export default VehicleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.whiteColor,
    borderRadius: windowWidth(4),
    padding: windowWidth(4),
    marginHorizontal: windowWidth(3),
    marginVertical: windowHeight(1),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: windowWidth(1.5),
    elevation: 3,
  },
  title: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(1),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: windowHeight(0.5),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: windowHeight(0.4),
  },
  label: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.primary,
  },
  value: {
    fontSize: fontSizes.rg,
    color: color.regularText,
    textAlign: "right",
  },
});
