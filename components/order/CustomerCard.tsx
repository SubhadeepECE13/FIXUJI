import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { sendLocation } from "@/store/actions/orders/OrderAction";
import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import * as ExpoLocation from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import Button from "../common/Button";
import AddressModal from "./AddressModal";
import UpdateCarDetailsModal from "./UpdateCarDetailesModal";
interface Props {
  data: ServiceBooking["data"];
}

const CustomerCard: React.FC<Props> = ({ data }) => {
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isCarModalOpen, setCarModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.location);
  const user = useAppSelector((state) => state.user);
  const isSameVendor = user?.user?.id === data.vendorId;
  console.log("VENDOR ID ...........>>>>>>>>>", data.vendorId);

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

    { label: "Order ID", value: data.order_id },
    {
      label: "Status",
      value: formatStatus(data.status),
      color: statusColor,
    },

    { label: "Booking Date", value: formattedDate },
    {
      label: "Booking Time",
      value: formatTimeToAMPM(data.date?.time) || "N/A",
    },
  ];
  const params = useLocalSearchParams<{ order_id: string }>();
  const orderDocId = params.order_id;
  console.log("for reached api order is", orderDocId);

  const orderSequenceId = data.order_id;

  // const handleSendLocation = async (): Promise<void> => {
  //   try {
  //     let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Toast.show({
  //         type: "error",
  //         text1: "Permission Denied",
  //         text2: "Please enable location access in your app settings.",
  //       });
  //       return;
  //     }

  //     const location = await ExpoLocation.getCurrentPositionAsync({
  //       accuracy: ExpoLocation.Accuracy.High,
  //     });
  //     console.log("Got location:", location.coords);

  //     dispatch(
  //       sendLocation(
  //         location.coords.latitude,
  //         location.coords.longitude,
  //         orderDocId
  //       )
  //     );
  //   } catch (err: any) {
  //     console.error("Error in handleSendLocation:", err);
  //     Toast.show({
  //       type: "error",
  //       text1: "Location Error",
  //       text2: err.message || "Could not get your location.",
  //     });
  //   }
  // };

  const handleSendLocation = async () => {
    try {
      setIsSending(true); // 🔥 start loading

      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "Please enable location access in settings.",
        });
        setIsSending(false);
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.High,
      });

      await dispatch(
        sendLocation(
          location.coords.latitude,
          location.coords.longitude,
          orderDocId
        )
      ); // 🔥 wait for refetch and success
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: err.message || "Something went wrong",
      });
    } finally {
      setIsSending(false); // 🔥 stop loading
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
          isLoading={isSending}
          disabled={isSending}
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
