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

const ServiceDetailes: React.FC<Props> = ({ data }) => {
  const service = data.service;
  const statusColor =
    data.status === "COMPLETED"
      ? "#4CAF50"
      : data.status === "CANCELLED"
        ? "#F44336"
        : "#FFA000";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service.name}</Text>

      {[
        { label: "Status", value: data.status, color: statusColor },
        { label: "Order ID", value: data.order_id },
        { label: "Service Mode", value: data.serviceMode },
        { label: "Booking Date", value: data.date?.full_date },
        { label: "Booking Time", value: data.date?.time },
      ].map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}:</Text>
          <Text style={[styles.value, item.color && { color: item.color }]}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ServiceDetailes;

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
    fontSize: fontSizes.md,
    color: color.regularText,
    fontFamily: fonts.medium,
    textAlign: "right",
  },
});
