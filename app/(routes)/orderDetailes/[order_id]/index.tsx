import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetailsByDocId } from "@/store/actions/orders/OrderAction";

import Timer from "@/components/order/Timer";
import Header from "@/components/common/Header";
import color from "@/themes/Colors.themes";
import { AppDispatch, RootState } from "@/store/Store";
import { commonStyles } from "@/styles/common.style";
import BookingSummaryCard from "@/components/order/ServiceDetailes";
import CustomerVendorCard from "@/components/order/VendorCard";
import CustomerCard from "@/components/order/CustomerCard";
import VehicleCard from "@/components/order/VehicleCard";

const OrderDetailsScreen = () => {
  const { order_id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { orderDetails, loading, error } = useSelector(
    (state: RootState) => state.orderDetails
  );

  useEffect(() => {
    if (order_id) {
      dispatch(fetchOrderDetailsByDocId(order_id as string));
    }
  }, [dispatch, order_id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={color.primary} />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No order details found.</Text>
      </View>
    );
  }

  const details = orderDetails.data;
  const customer = details?.userData;
  const vendor = details?.staff?.[0];
  const vehicle = details?.vehicle;
  const service = details?.service;
  const location = details?.location?.full_address;

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Order Details" isBack />

        <Timer
          startTime={Date.now()}
          order_id="sdsd"
          status="sdsd"
          eta={1000}
        />

        <CustomerVendorCard data={orderDetails.data} />
        <CustomerCard data={orderDetails.data} />

        <VehicleCard data={orderDetails.data} />
        <BookingSummaryCard data={orderDetails.data} />
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgGray,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 18,
    padding: 12,
    backgroundColor: color.fadedPrimary,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: color.primary,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: color.blue,
  },
  loadingText: {
    marginTop: 8,
    color: color.primary,
  },
  errorText: {
    color: "red",
  },
  emptyText: {
    color: color.gray,
  },
});
