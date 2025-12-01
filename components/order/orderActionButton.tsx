import React from "react";
import Button from "../common/Button";
import color from "@/themes/Colors.themes";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import { router } from "expo-router";

interface Props {
  status: string;
  isSameVendor: boolean;
  isSending: boolean;
  orderDocId: string;
  openCarModal: () => void;
  onStartBooking?: () => void;
}

const OrderActionButton: React.FC<Props> = ({
  status,
  isSameVendor,
  isSending,
  orderDocId,
  openCarModal,
  onStartBooking,
}) => {
  if (!isSameVendor) return null;

  switch (status) {
    case "ON_THE_WAY":
      return (
        <Button
          title="Reached"
          onPress={openCarModal}
          color={color.primary}
          height={windowHeight(5)}
          width={windowWidth(85)}
          iconType="MaterialCommunityIcons"
          iconName="map-marker-check"
          iconSize={22}
          isIcon
          isLoading={isSending}
          disabled={isSending}
        />
      );

    case "REACHED":
      return (
        <Button
          title="Start Booking"
          color={color.primary}
          height={windowHeight(5)}
          width={windowWidth(85)}
          iconType="MaterialIcons"
          iconName="start"
          iconSize={22}
          isIcon
          onPress={onStartBooking}
        />
      );

    case "IN_PROGRESS":
      return (
        <Button
          title="Complete Booking"
          color={color.primary}
          height={windowHeight(5)}
          width={windowWidth(85)}
          iconType="MaterialCommunityIcons"
          iconName="timer-sand-complete"
          iconSize={22}
          isIcon
          onPress={() => router.push(`/completeOrder/${orderDocId}`)}
        />
      );

    default:
      return null;
  }
};

export default OrderActionButton;
