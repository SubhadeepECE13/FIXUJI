import React, { useMemo } from "react";
import ContactActions from "./ContactActions";
import { IUser } from "../users/users.types";
import { View } from "react-native";
import { SettingsResponse } from "../settings/settings.types";
import dayjs from "dayjs";

type Props = {
  phone: string;
  geolocation: string | null;
  containerStyle?: any;
  iconStyle?: any;
  order: Order;
  user: IUser;
  settings: SettingsResponse;
};

const ContactActionsWrapper: React.FC<Props> = ({
  phone,
  geolocation,
  order,
  user,
  containerStyle,
  iconStyle,
  settings,
}) => {
  const isManager = user.role === "Manager";
  const isSameVendor = user.id === order.vendorId;
  console.log("user ID is :", user.id);

  const orderDateTime = useMemo(() => {
    if (!order?.date?.full_date) return null;
    return dayjs(order.date.full_date);
  }, [order]);

  const isWithin30Minutes = useMemo(() => {
    if (!orderDateTime) return false;

    const now = dayjs();
    const threshold = orderDateTime.subtract(60, "minute");

    return now.isAfter(threshold);
  }, [orderDateTime]);

  const shouldShow = (isManager || isSameVendor) && isWithin30Minutes;
  console.log({
    userId: user.id,
    vendorId: order.vendorId,
    isSameVendor: user.id === order.vendorId,
    shouldShow,
  });
  if (!shouldShow) {
    return <View style={[{ flexDirection: "row" }, containerStyle]} />;
  }

  return (
    <ContactActions
      phone={phone}
      geolocation={geolocation}
      order={order}
      user={user}
      containerStyle={containerStyle}
      iconStyle={iconStyle}
      navigateAddressLink={order.userData.navigateAddressLink}
      settings={settings}
    />
  );
};

export default ContactActionsWrapper;
