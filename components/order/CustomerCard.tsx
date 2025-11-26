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
import {
  fetchOrderDetailsByDocId,
  sendLocation,
} from "@/store/actions/orders/OrderAction";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../common/Button";
import UpdateCarDetailsModal from "./UpdateCarDetailesModal";
import Toast from "react-native-toast-message";
import * as ExpoLocation from "expo-location";
interface Props {
  data: ServiceBooking["data"];
}

const CustomerCard: React.FC<Props> = ({ data }) => {
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isCarModalOpen, setCarModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.location);
  const user = useAppSelector((state) => state.user);
  const isSameVendor = user?.user?.id === data.booking.vendorId;
  const canShowReachedButton =
    isSameVendor && data.booking.status === "ON_THE_WAY";
  const customer = data.booking.userData;
  const service = data.booking.service;
  const customerAddress = data.booking.location;
  const statusColor =
    data.booking.status === "COMPLETED"
      ? "#4CAF50"
      : data.booking.status === "CANCELLED"
        ? "#F44336"
        : "#FFA000";

  const formattedDate = data.booking.date?.full_date
    ? new Date(data.booking.date.full_date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        weekday: "short",
      })
    : "N/A";
  const formatTimeToAMPM = (timeString: string) => {
    if (!timeString) return "N/A";

    try {
      // If time is like "14:30" or "14:30:00"
      const [hour, minute] = timeString.split(":");
      let h = parseInt(hour, 10);
      const m = minute || "00";
      const suffix = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${m} ${suffix}`;
    } catch (error) {
      return "Invalid Time";
    }
  };

  const formatStatus = (status: string) => {
    if (!status) return "N/A";
    return status.replace(/_/g, " ");
  };

  const details = [
    { label: "Customer", value: customer?.displayName || "N/A" },
    {
      label: "Address",
      value: customerAddress?.full_address || "N/A",
      isAddress: true,
    },

    { label: "Order ID", value: data.booking.order_id },
    {
      label: "Status",
      value: formatStatus(data.booking.status),
      color: statusColor,
    },

    { label: "Booking Date", value: formattedDate },
    {
      label: "Booking Time",
      value: formatTimeToAMPM(data.booking.date?.time) || "N/A",
    },
  ];
  const params = useLocalSearchParams<{ order_id: string }>();
  const orderDocId = params.order_id;
  console.log("for reached api order is", orderDocId);

  const orderSequenceId = data.booking.order_id;

  const handleSendLocation = async (): Promise<void> => {
    try {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "Please enable location access in your app settings.",
        });
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.High,
      });
      console.log("Got location:", location.coords);

      dispatch(
        sendLocation(
          location.coords.latitude,
          location.coords.longitude,
          orderDocId
        )
      );
    } catch (err: any) {
      console.error("Error in handleSendLocation:", err);
      Toast.show({
        type: "error",
        text1: "Location Error",
        text2: err.message || "Could not get your location.",
      });
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service?.name || "Service"}</Text>
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
        orderId={orderSequenceId}
        orderDocId={orderDocId}
        onSuccess={() => {
          // setCarModalOpen(false);
          setTimeout(() => {
            handleSendLocation();
          }, 100);
        }}
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
