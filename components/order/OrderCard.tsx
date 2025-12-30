import ContactActionsWrapper from "@/store/actions/orders/ContactActionWrapper";
import { SettingsResponse } from "@/store/actions/settings/settings.types";
import { IUser } from "@/store/actions/users/users.types";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomImage from "../common/CustomImage";
import Chip from "./OrderChip";

const Card = ({
  vendor,
  userData,
  user,
  Order,
  settings,
  refreshFilters,
}: {
  vendor: Order;
  userData: Order;
  user: IUser;
  Order: Order;
  settings: SettingsResponse;
  refreshFilters: any;
}) => {
  console.log("main user id ", user.id);
  const bookingDate = new Date(userData.date.full_date);
  const today = new Date();

  const isToday =
    bookingDate.getDate() === today.getDate() &&
    bookingDate.getMonth() === today.getMonth() &&
    bookingDate.getFullYear() === today.getFullYear();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push(`/orderDetailes/${userData.orderDocId}`)}
      >
        <View style={[styles.container, commonStyles.shadowContainer]}>
          <View style={styles.topRow}>
            <View style={styles.leftSection}>
              <Text style={styles.titleText}>
                {userData.userData.displayName}
              </Text>
              <Text style={styles.orderId}>{userData.order_id}</Text>

              <View style={styles.chipgaps}>
                <View style={styles.chips}>
                  <Chip
                    label={userData.service_name}
                    backgroundColor={userData.service_color}
                  />
                  <Chip
                    label={
                      Order?.variant?.vehicle_type ||
                      userData?.variant?.vehicle_type ||
                      "Variant Not Found"
                    }
                    backgroundColor={userData?.service_color}
                  />

                  <Text style={styles.status}>{Order.customer_zone}</Text>
                </View>
              </View>
            </View>

            {/* Right side: Technician info */}
            <View style={styles.rightBox}>
              <CustomImage
                imageUrl={vendor.vendor.vendor_img}
                style={styles.avatar}
              />
              <Text style={styles.technicianName}>
                {vendor.vendor.vendor_name}
              </Text>
              <Text style={styles.priceText}>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                }).format(Number(Order.variant.actual_price || 0))}
              </Text>
            </View>
          </View>

          {/* Middle Section */}
          <View style={styles.middleRow}>
            <ContactActionsWrapper
              phone={userData.userData.phoneNumber}
              geolocation={userData.userData.navigateAddressLink}
              containerStyle={styles.contact}
              iconStyle={styles.icon}
              order={userData}
              user={user}
              settings={settings}
              refreshFilters={refreshFilters}
            />

            <View style={styles.datetime}>
              <Text style={styles.timeText}>{userData.date.time}</Text>
              <Text style={styles.dateText}>
                {isToday
                  ? "Today"
                  : bookingDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
              </Text>
            </View>
          </View>

          {/* Bottom Address */}
          <Text style={styles.addressText}>
            {userData.location.full_address}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(Card);
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.whiteColor,
    padding: windowWidth(4),
    borderRadius: windowWidth(4),
    marginBottom: windowHeight(1),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSection: {
    flex: 1,
    paddingRight: windowWidth(1),
  },
  titleText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.semiBold,
    color: color.appHeaderText,
  },
  orderId: {
    fontSize: fontSizes.smMd,
    color: color.primary,
  },
  chips: {
    gap: windowHeight(1),
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  rightBox: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  avatar: {
    width: windowWidth(14),
    height: windowWidth(14),
    borderRadius: windowWidth(7),
    resizeMode: "cover",
    backgroundColor: color.gray,
  },
  technicianName: {
    fontSize: fontSizes.sm,
    color: color.placeholderText,
    textAlign: "right",
    width: windowWidth(30),
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: windowHeight(1),
  },
  contact: {
    flexDirection: "row",
    gap: windowWidth(2),
  },
  icon: {
    width: windowWidth(8),
    height: windowWidth(8),
    borderRadius: windowWidth(2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
  },
  datetime: {
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  dateText: {
    fontSize: fontSizes.sm,
    color: color.placeholderText,
  },
  addressText: {
    fontSize: fontSizes.sm,
    color: color.placeholderText,
    marginTop: windowHeight(1),
  },
  chipgaps: {
    marginTop: windowHeight(1),
  },
  priceText: {
    fontSize: fontSizes.lg,
    color: color.primary,
    textAlign: "right",
    marginTop: windowHeight(0.5),
  },
  status: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.bold,
    color: color.primary,
    alignSelf: "flex-start",
  },
  chipTextStyle: {
    fontSize: fontSizes.sm,
  },
});
