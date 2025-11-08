import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

import { CustomIcon } from "../common/Icon";
import { router } from "expo-router";
import AreYouSureModal from "../common/AreYouSureModal";
import color from "@/themes/Colors.themes";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { commonStyles } from "@/styles/common.style";
import { logout } from "@/store/actions/users/userAction";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { setIsOwnOrder } from "@/store/reducers/orders/orderSlice";

const Item = ({
  item,
  index,
}: {
  item: {
    label: string;
    iconType: string;
    iconName: string;
    onPress: () => void;
  };
  index: number;
}) => {
  return (
    <TouchableOpacity onPress={item.onPress}>
      <Animated.View
        style={itemStyles.container}
        entering={ZoomIn.delay(index * 80)
          .damping(10)
          .stiffness(200)}
      >
        <View style={itemStyles.box1}>
          <CustomIcon
            type={item.iconType as any}
            name={item.iconName}
            color={color.primary}
            size={18}
            style={itemStyles.icon}
          />
          <Text style={itemStyles.label}>{item.label}</Text>
        </View>
        <CustomIcon
          type="Entypo"
          name={"chevron-small-right"}
          color={color.primary}
          size={30}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const FunctionCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const isOwnOrder = useAppSelector((state) => state.order.isOwnOrder);

  const handleToggleChange = (value: boolean) => {
    dispatch(setIsOwnOrder(value));
  };

  const PROFILE_PAGE_ITEMS: {
    label: string;
    iconType: string;
    iconName: string;
    onPress: () => void;
  }[] = [
    {
      label: "About Us",
      iconType: "Octicons",
      iconName: "info",
      onPress: () => {},
    },
    {
      label: "Support",
      iconType: "FontAwesome5",
      iconName: "headset",
      onPress: () => {},
    },
    {
      label: "Your Feedback",
      iconType: "AntDesign",
      iconName: "staro",
      onPress: () => {},
    },
    {
      label: "Logout",
      iconType: "AntDesign",
      iconName: "logout",
      onPress: () => {
        setIsModalVisible(true);
      },
    },
  ];

  return (
    <>
      <View style={[styles.container, commonStyles.deepShadowContainer]}>
        {PROFILE_PAGE_ITEMS.map((item, index) => (
          <Item key={index} item={item} index={index} />
        ))}

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show My Bookings Only</Text>
          <Switch value={isOwnOrder} onValueChange={handleToggleChange} />
        </View>
      </View>

      <AreYouSureModal
        isOpen={isModalVisible}
        setOpened={setIsModalVisible}
        onPress={() => {
          setIsModalVisible(false);
          dispatch(logout());
        }}
        title="Are you sure you want to logout"
      />
    </>
  );
};

export default FunctionCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.whiteColor,
    paddingHorizontal: windowWidth(3.5),
    paddingVertical: windowHeight(2.5),
    borderRadius: 18,
    rowGap: windowHeight(1.5),
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: windowHeight(1.5),
    paddingHorizontal: windowWidth(3.5),
    borderTopWidth: 1,
    borderTopColor: color.borderColor,
    marginTop: windowHeight(1),
  },
  toggleLabel: {
    fontSize: fontSizes.md,
    fontFamily: fonts.medium,
    color: color.borderColor,
  },
});

const itemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: windowWidth(3.5),
    paddingVertical: windowHeight(0.8),
  },
  box1: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: windowWidth(2.5),
  },
  icon: {
    padding: windowWidth(1.5),
    borderRadius: 18,
    backgroundColor: color.fadedPrimary,
  },
  label: {
    fontSize: fontSizes.md,
    fontFamily: fonts.semiBold,
    marginTop: windowHeight(0.3),
    color: color.borderColor,
  },
});
