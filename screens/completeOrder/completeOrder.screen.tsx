import { RootState } from "@/store/Store";
import { completeOrder } from "@/store/actions/orders/OrderAction";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/common/Header";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import Toast from "react-native-toast-message";

import Button from "@/components/common/Button";
import UPIQrCard from "@/components/order/UpiQrCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";

const CompleteOrderScreen = () => {
  const params = useLocalSearchParams<{ order_id: string }>();
  const orderId = params.order_id;

  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: RootState) => state.completeOrder);

  const finalAmount = useSelector(
    (state: RootState) => state.orderDetails.orderDetails?.data?.total
  );

  const ORDER_TOTAL = Number(finalAmount) || 0;

  const UPI_ID = "paytmqr75i3nyiysp@paytm";
  const BUSINESS_NAME = "Fixuji Domestic Service";

  const validationSchema = Yup.object().shape({
    recievePayment: Yup.number()
      .typeError("Amount must be a number")
      .required("Payment amount is required")
      .test(
        "within-range",
        `Allowed range: ₹${ORDER_TOTAL - 10} - ₹${ORDER_TOTAL + 10}`,
        (value) =>
          value !== undefined &&
          value >= ORDER_TOTAL - 10 &&
          value <= ORDER_TOTAL + 10
      ),
    paymentMethod: Yup.string().oneOf(["CASH", "UPI"]).required(),
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      recievePayment: 0,
      paymentMethod: "CASH" as "CASH" | "UPI",
    },
  });

  const paymentMethod = watch("paymentMethod");
  const recievePayment = watch("recievePayment");

  const onSubmit = async (values: any) => {
    try {
      await dispatch(
        completeOrder(orderId, {
          recievePayment: Number(values.recievePayment),
          paymentMethod: values.paymentMethod,
        })
      );

      Toast.show({
        type: "success",
        text1: "Order Completed",
        text2: "Booking successfully finished.",
      });

      setTimeout(() => {
        router.replace(`/orderDetailes/${orderId}`);
      }, 300);
    } catch {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: "Could not complete order.",
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
      <Header title="Complete Order" isBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.heading}>Collect Payment </Text>

            <View style={styles.amountSection}>
              <Text style={styles.label}> Total</Text>
              <Text style={styles.amountText}>₹{ORDER_TOTAL}</Text>
            </View>

            <Text style={styles.label}>Received Amount</Text>
            <TextInput
              style={[
                styles.input,
                errors.recievePayment && { borderColor: "#ff4b4b" },
              ]}
              value={recievePayment?.toString() ?? ""}
              keyboardType="numeric"
              onChangeText={(value) =>
                setValue("recievePayment", value === "" ? 0 : Number(value))
              }
              placeholder="Enter received amount"
              placeholderTextColor="#9aa0b1"
            />

            {errors.recievePayment && (
              <Text style={styles.errorMessage}>
                {errors.recievePayment.message}
              </Text>
            )}

            <Text style={[styles.label, { marginTop: windowHeight(2) }]}>
              Payment Method
            </Text>

            <View style={styles.toggleWrapper}>
              {["CASH", "UPI"].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.toggleButton,
                    paymentMethod === method && styles.activeToggleButton,
                  ]}
                  onPress={() =>
                    setValue("paymentMethod", method as "CASH" | "UPI")
                  }
                >
                  <Text
                    style={[
                      styles.toggleButtonText,
                      paymentMethod === method && styles.activeToggleText,
                    ]}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {paymentMethod === "UPI" && (
              <View style={{ marginTop: windowHeight(2) }}>
                <UPIQrCard
                  upiId={UPI_ID}
                  businessName={BUSINESS_NAME}
                  amount={ORDER_TOTAL}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title={loading ? "Processing..." : "Complete Order"}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          height={windowHeight(6.2)}
          width={windowWidth(90)}
          iconType="MaterialCommunityIcons"
          iconName="check-decagram"
          iconSize={24}
          isIcon
        />
      </View>
    </View>
  );
};

export default CompleteOrderScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(2),
  },
  card: {
    backgroundColor: color.whiteColor,
    borderRadius: 14,
    padding: windowHeight(2.5),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.lg + 2,
    color: color.primary,
    marginBottom: windowHeight(2),
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: color.primary,
    marginBottom: windowHeight(0.5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9dae1",
    backgroundColor: "#fafbfc",
    padding: windowHeight(1.4),
    borderRadius: 8,
    fontSize: fontSizes.md,
    fontFamily: fonts.regular,
    marginBottom: windowHeight(1),
  },
  amountSection: {
    backgroundColor: "#eff4ff",
    padding: windowHeight(1.5),
    borderRadius: windowHeight(1),
    marginBottom: windowHeight(2),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountText: {
    color: color.primary,
    fontFamily: fonts.bold,
    fontSize: fontSizes.xl,
  },
  toggleWrapper: {
    flexDirection: "row",
    gap: windowWidth(3),
  },
  toggleButton: {
    flex: 1,
    paddingVertical: windowHeight(1.3),
    borderRadius: windowHeight(1),
    borderWidth: 1,
    borderColor: "#d1d6e0",
    alignItems: "center",
  },
  activeToggleButton: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  toggleButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: "#4b5563",
  },
  activeToggleText: {
    color: "#fff",
    fontWeight: "600",
  },
  errorMessage: {
    color: "#ff4b4b",
    fontSize: fontSizes.xs,
    marginBottom: windowHeight(1),
  },
  button: {
    backgroundColor: color.primary,
    marginTop: windowHeight(1),
    alignSelf: "center",
    borderRadius: 12,
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
  scrollContent: {
    paddingBottom: windowHeight(10),
  },
});
