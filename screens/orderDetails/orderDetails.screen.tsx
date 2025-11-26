import { fetchOrderDetailsByDocId } from "@/store/actions/orders/OrderAction";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
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

const Loader = () => {
  return (
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
};

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

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header title="Order Details" isBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          Loader()
        ) : (
          <>
            {/* {details?.status === "IN_PROGRESS" ? (
              <ETATimer
                startTime={details?.startTime ?? new Date().toISOString()}
                etaMinutes={details?.eta ?? 15}
                order_id={details.order_id}
                status={details?.status}
              />
            ) : (
              <></>
            )} */}
            <CustomerCard data={orderDetails.data} />
            <BookingSummaryCard data={orderDetails.data} />
            {/* <VehicleCard data={orderDetails.data} /> */}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgGray,
    paddingHorizontal: windowWidth(3),
  },

  centered: {
    alignItems: "center",
    justifyContent: "center",
    gap: windowHeight(2),
    paddingVertical: windowHeight(3),
  },

  section: {
    marginBottom: windowHeight(2.5),
    paddingVertical: windowHeight(1.5),
    paddingHorizontal: windowWidth(4),
    backgroundColor: color.fadedPrimary,
    borderRadius: windowWidth(3),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: windowWidth(1.5),
    elevation: 2,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: windowWidth(4.2),
    color: color.primary,
    marginBottom: windowHeight(1),
  },

  detailText: {
    fontSize: windowWidth(3.8),
    color: color.blue,
  },

  loadingText: {
    marginTop: windowHeight(1),
    color: color.primary,
    fontSize: windowWidth(3.8),
  },

  errorText: {
    color: "red",
    fontSize: windowWidth(3.8),
  },

  emptyText: {
    color: color.gray,
    fontSize: windowWidth(3.8),
  },
});
