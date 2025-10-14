import React from "react";
import { View, Text, StyleSheet } from "react-native";
import color from "@/themes/Colors.themes";
import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
import CustomImage from "../common/CustomImage";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

interface Props {
  data: ServiceBooking["data"];
}

const VendorCard: React.FC<Props> = ({ data }) => {
  const customer = data.userData;
  const vendor = data.vendor;
  const vehicle = data.vehicle;
  const location = data.location?.full_address;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Vendor Details</Text>

      <View style={styles.section}>
        <View style={styles.vendorRow}>
          {vendor?.vendor_img && (
            <CustomImage
              imageUrl={vendor.vendor_img}
              style={styles.vendorImage}
            />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.detailText}>
              Name: {vendor?.vendor_name || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              Description: {vendor?.vendor_description || "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VendorCard;

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
  section: {
    marginBottom: windowHeight(1.5),
  },
  sectionTitle: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.primary,
    marginBottom: windowHeight(0.5),
  },
  vendorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
  },
  vendorImage: {
    width: windowWidth(12),
    height: windowWidth(12),
    borderRadius: windowWidth(6),
  },
  detailText: {
    fontSize: fontSizes.rg,
    color: color.primary,
    marginVertical: windowHeight(0.3),
  },
});
