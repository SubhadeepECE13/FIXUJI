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

const CustomerCard: React.FC<Props> = ({ data }) => {
  const customer = data.userData;
  const customerAddress = data.location;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Customer Details</Text>

      {[
        { label: "Name", value: customer?.displayName || "N/A" },
        { label: "Address", value: customerAddress?.full_address || "N/A" },
        { label: "Zone", value: customer?.customer_zone || "N/A" },
      ].map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}:</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

export default CustomerCard;

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
    flex: 0.35,
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.primary,
  },

  value: {
    flex: 0.65,
    fontSize: fontSizes.md,
    color: color.regularText,
    fontFamily: fonts.medium,
    textAlign: "right",
    flexWrap: "wrap",
  },
});
