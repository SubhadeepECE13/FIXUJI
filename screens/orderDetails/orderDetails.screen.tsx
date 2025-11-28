import { fetchOrderDetailsByDocId } from "@/store/actions/orders/OrderAction";
import { updateServiceDetails } from "@/store/actions/services/ServiceAction";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
import Header from "@/components/common/Header";
import CustomerCard from "@/components/order/CustomerCard";
import BookingSummaryCard from "@/components/order/ServiceDetailes";
import { AppDispatch, RootState } from "@/store/Store";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import Button from "@/components/common/Button";
import fonts from "@/themes/Fonts.themes";
import Toast from "react-native-toast-message";

const Loader = () => (
  <View style={styles.centered}>
    <CustomSkeletonLoader
      dWidth={"100%"}
      dHeight={windowHeight(15)}
      radius={windowWidth(1)}
    />
    <CustomSkeletonLoader
      dWidth={windowWidth(95)}
      dHeight={windowHeight(25)}
      radius={windowWidth(5)}
    />
    <CustomSkeletonLoader
      dWidth={windowWidth(95)}
      dHeight={windowHeight(35)}
      radius={windowWidth(5)}
    />
    <CustomSkeletonLoader
      dWidth={windowWidth(95)}
      dHeight={windowHeight(35)}
      radius={windowWidth(5)}
    />
  </View>
);

const OrderDetailsScreen = () => {
  const { order_id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [saving, setSaving] = useState(false);

  const { orderDetails, loading, error } = useSelector(
    (state: RootState) => state.orderDetails
  );

  const selectedAddons =
    useSelector(
      (state: RootState) =>
        state.orderPayment.selectedAddons[order_id as string]
    ) || [];

  useEffect(() => {
    if (order_id) {
      dispatch(fetchOrderDetailsByDocId(order_id as string));
    }
  }, [order_id]);

  if (!orderDetails) return <View style={styles.centered}></View>;

  const data = orderDetails.data;

  const basePrice = Number(data?.variant?.actual_price || 0);
  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const chargeTotal = Array.isArray(data?.charges)
    ? data.charges.reduce((sum, c) => sum + Number(c.charge_amount || 0), 0)
    : 0;

  const discount = Number(data?.discount || 0);

  const finalPrice = basePrice + addonTotal;
  const grandTotal = finalPrice + chargeTotal - discount;

  const handleSave = async () => {
    setSaving(true);

    const payload = {
      addons: selectedAddons.map((a) => a.id),
      variant: data?.variant?.vehicle_type,
      service: data?.service?.name,
      total: grandTotal,
    };

    try {
      await dispatch(
        updateServiceDetails(order_id as string, {
          ...payload,
          // Ensure service is always a string (never null)
          service: payload.service ?? "",
        })
      );

      Toast.show({
        type: "success",
        text1: "Updated Successfully",
        text2: "Order details updated.",
      });

      dispatch(fetchOrderDetailsByDocId(order_id as string));
    } catch {
      Toast.show({
        type: "error",
        text1: "Update Failed",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header title="Order Details" isBack />

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: windowHeight(6) }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          Loader()
        ) : (
          <>
            <CustomerCard data={data} />
            <BookingSummaryCard data={data} />
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Final Payable</Text>
          <Text style={styles.totalValue}>₹{grandTotal}</Text>
        </View>

        <Button
          title={saving ? "UPDATING..." : "Save"}
          height={windowHeight(6)}
          backgroundColor={color.primary}
          onPress={handleSave}
          disabled={saving}
          isLoading={saving}
        />
      </View>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    justifyContent: "center",
    gap: windowHeight(2),
    paddingVertical: windowHeight(3),
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: color.whiteColor,
    paddingHorizontal: windowWidth(5),
    paddingVertical: windowHeight(2),
    borderTopLeftRadius: windowWidth(5),
    borderTopRightRadius: windowWidth(5),
    shadowColor: "#000",
    shadowOpacity: 0.12,
    elevation: 10,
  },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(1.5),
  },

  totalLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: color.primary,
  },

  totalValue: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: color.primary,
  },
});
