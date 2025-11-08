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
import Button from "../common/Button";
import { router } from "expo-router";
import CardHeader from "../common/CardHeader";

interface Props {
  data: ServiceBooking["data"];
}

const ServiceDetails: React.FC<Props> = ({ data }) => {
  const service = data?.service;
  const addons = data?.addons || [];
  const charges = data?.charges || [];
  const discount = data?.discount || 0;
  const total = data?.total || 0;

  const renderTwoColumnList = (items: any[], key1: string, key2: string) => {
    return (
      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.listRow}>
            <Text style={styles.listLabel}>{item[key1]}</Text>
            <Text style={styles.listValue}>₹{item[key2]}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <CardHeader
        title="Package Details"
        buttonTitle="Convert"
        onButtonPress={() =>
          router.push({
            pathname: "/packageConvert/[order_id]",
            params: {
              order_id: String(data.orderDocId),
              serviceType: data?.service?.name || "",
              variant: data?.variant.vehicle_type || "",
              discount: String(data?.discount || 0),
              addons: JSON.stringify(data?.addons || []),
              total: String(data?.total || 0),
              booking: JSON.stringify(data),
            },
          })
        }
      />

      {/* Main Service */}
      <View style={styles.mainServiceRow}>
        <Text style={styles.serviceLabel}>{service?.name || "Service"}</Text>
        <Text style={styles.serviceValue}>₹{data?.variant?.actual_price}</Text>
      </View>

      {/* Add-ons */}
      {addons.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add-ons</Text>
          {renderTwoColumnList(
            Array.isArray(addons) ? addons : [],
            "addon_name",
            "actual_price"
          )}
        </View>
      )}
      {charges.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Charges</Text>
          {renderTwoColumnList(charges, "charge_type", "charge_amount")}
        </View>
      )}

      {/* Discount */}
      {discount > 0 && (
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: "#f44336" }]}>
            Discount
          </Text>
          <Text style={[styles.summaryValue, { color: "#f44336" }]}>
            - ₹{discount}
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      {/* Grand Total */}
      {total > 0 && (
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>
      )}
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.whiteColor,
    borderRadius: windowWidth(3),
    padding: windowWidth(4),
    marginHorizontal: windowWidth(3),
    marginVertical: windowHeight(1),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: windowWidth(1),
    elevation: 2,
  },
  cardTitle: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(1),
  },

  mainServiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(0.5),
  },
  serviceLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.appHeaderText,
  },
  serviceValue: {
    fontSize: fontSizes.rg,
    color: color.primary,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: windowHeight(1),
  },

  section: {
    marginBottom: windowHeight(1),
  },
  sectionTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(0.5),
  },

  listContainer: {},
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: windowHeight(0.3),
  },
  listLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: color.regularText,
    flex: 0.6,
  },
  listValue: {
    fontSize: fontSizes.sm,
    color: color.primary,
    flex: 0.4,
    textAlign: "right",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: windowHeight(0.5),
  },
  summaryLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
  },
  summaryValue: {
    fontSize: fontSizes.sm,
  },

  totalRow: {
    marginTop: windowHeight(0.5),
  },
  totalLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.bold,
    color: "#2e7d32",
  },
  totalValue: {
    fontSize: fontSizes.md,
    color: "#2e7d32",
    fontWeight: "800",
  },
  detailsBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: windowHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: windowHeight(0.5),
  },
  convertText: {
    fontSize: fontSizes.rg,
  },
});
