import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import color from "@/themes/Colors.themes";
import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import AddressModal from "./AddressModal";
import CustomModal from "@/components/common/CustomModal";
import Geolocation from "react-native-geolocation-service";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { sendLocation } from "@/store/actions/orders/OrderAction";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../common/Button";
import UpdateCarDetailsModal from "./UpdateCarDetailesModal";

interface Props {
  data: ServiceBooking["data"];
}

const CustomerCard: React.FC<Props> = ({ data }) => {
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isCarModalOpen, setCarModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.location);
  const user = useAppSelector((state) => state.user);
  const isSameVendor = user?.user?.id === data.vendorId;
  const canShowReachedButton = isSameVendor && data.status === "ON_THE_WAY";
  const customer = data.userData;
  const service = data.service;
  const customerAddress = data.location;
  const statusColor =
    data.status === "COMPLETED"
      ? "#4CAF50"
      : data.status === "CANCELLED"
        ? "#F44336"
        : "#FFA000";

  const formattedDate = data.date?.full_date
    ? new Date(data.date.full_date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        weekday: "short",
      })
    : "N/A";

  const details = [
    { label: "Customer", value: customer?.displayName || "N/A" },
    {
      label: "Address",
      value: customerAddress?.full_address || "N/A",
      isAddress: true,
    },
    // { label: "Service Mode", value: data.serviceMode },
    { label: "Order ID", value: data.order_id },
    { label: "Status", value: data.status, color: statusColor }, // Remove underscore with space

    // { label: "Zone", value: customer?.customer_zone || "N/A" },
    { label: "Booking Date", value: formattedDate },
    { label: "Booking Time", value: data.date?.time || "N/A" }, // Give proper AM PM format
  ];
  const params = useLocalSearchParams<{ order_id: string }>();
  const orderDocId = params.order_id || data.order_id;
  const orderId = orderDocId;
  const handleSendLocation = () => {
    Geolocation.getCurrentPosition(
      (location) => {
        dispatch(
          sendLocation(
            location.coords.latitude,
            location.coords.longitude,
            orderDocId
          )
        );

        setCarModalOpen(false);
      },
      (error) => {
        console.log("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service.name}</Text>
      {/* <CardHeader title={service.name} /> */}
      <View style={styles.detailsContainer}>
        {details.map((item, index) => {
          const isAddressField = item.isAddress;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={isAddressField ? 0.7 : 1}
              onPress={() => isAddressField && setAddressModalOpen(true)}
              style={styles.detailBox}
            >
              <Text style={styles.label}>{item.label}</Text>
              <Text
                style={[
                  styles.value,
                  item.color ? { color: item.color } : null,
                ]}
                numberOfLines={2}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {canShowReachedButton && (
        <Button
          title="Reached"
          onPress={() => setCarModalOpen(true)}
          color={color.primary}
          height={windowHeight(5)}
          width={windowWidth(85)}
          style={styles.reachedBtn}
          iconType="MaterialCommunityIcons"
          iconName="map-marker-check"
          iconSize={22}
          isIcon
        />
      )}

      <AddressModal
        isOpen={isAddressModalOpen}
        setOpened={setAddressModalOpen}
        address={customerAddress?.full_address || "N/A"}
      />
      <UpdateCarDetailsModal
        isOpen={isCarModalOpen}
        setOpened={setCarModalOpen}
        orderId={orderId}
        onSuccess={() => console.log("Car details updated!")}
        handleSendLocation={handleSendLocation}
      />
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
    marginVertical: windowHeight(2),
    shadowRadius: windowWidth(1.5),
    elevation: 3,
  },
  title: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: windowHeight(1.3),
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailBox: {
    width: windowWidth(42),
    backgroundColor: color.lightBackground,
    borderRadius: windowWidth(2),
    paddingVertical: windowHeight(0.8),
    paddingHorizontal: windowWidth(2.5),
    marginBottom: windowHeight(1),
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  label: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.primary,
    marginBottom: windowHeight(0.3),
  },
  value: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: color.regularText,
  },
  reachedBtn: {
    marginTop: windowHeight(1.5),
    alignItems: "center",
  },
});
