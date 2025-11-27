import { RootState } from "@/store/Store";
import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
import {
  loadInitialAddons,
  removeAddon,
  addAddon,
  setFinalPayable,
} from "@/store/reducers/services/orderPaymentSlice";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddonSuggestionCard from "./VehicleCard";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../common/Button";
import { Divider } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { updateServiceDetails } from "@/store/actions/services/ServiceAction";

interface Props {
  data: ServiceBooking["data"];
}

const ServiceDetails: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const params = useLocalSearchParams<{ order_id: string }>();
  const orderId = data?.orderDocId;
  const updateBookingId = params.order_id;

  const [saving, setSaving] = useState(false);

  const selectedAddons =
    useSelector(
      (state: RootState) => state.orderPayment.selectedAddons[orderId]
    ) || [];

  const basePrice = Number(data?.variant?.actual_price || 0);

  // Sum of all selected addon prices
  const addonTotal = selectedAddons.reduce(
    (sum, addon) => sum + addon.price,
    0
  );

  // Some orders may have multiple charges → take sum not first item
  const chargeTotal = Array.isArray(data?.charges)
    ? data.charges.reduce((sum, c) => sum + Number(c.charge_amount || 0), 0)
    : 0;

  // Discount (if not available assume 0)
  const discount = Number(data?.discount || 0);

  // Final total formula
  const finalPrice = basePrice + addonTotal;

  const grandTotal = finalPrice + chargeTotal - discount;

  useEffect(() => {
    if (!data?.addons || selectedAddons.length > 0) return;

    const formatted = data.addons.map((addon) => ({
      id: `${addon.addon_name}_${addon.actual_price}_${orderId}`,
      realId: String(addon.id),
      name: addon.addon_name,
      price: addon.actual_price || 0,
    }));

    dispatch(loadInitialAddons({ orderId, addons: formatted }));
  }, []);

  /** Sync final payable price */
  useEffect(() => {
    dispatch(setFinalPayable({ orderId, amount: finalPrice }));
  }, [finalPrice]);

  const handleSave = () => {
    setSaving(true);
    const payload = {
      addons: selectedAddons.map((a) => a.realId),
      variant: data.variant?.vehicle_type || "",
      service: data.service?.name || "",
      total: grandTotal,
    };
    setTimeout(() => {
      setSaving(false);
      dispatch(updateServiceDetails(updateBookingId, payload));
      console.log(payload);
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Package Summary</Text>

            <View style={styles.row}>
              <Text style={styles.label}>{data?.service?.name}</Text>
              <Text style={styles.priceText}>₹{basePrice}</Text>
            </View>

            {selectedAddons.length > 0 && (
              <View style={{ marginTop: 15 }}>
                <Text style={styles.sectionHeading}>Added Add-ons</Text>
                <Divider style={{ marginBottom: windowHeight(1.5) }} />

                {selectedAddons.map((item) => (
                  <View key={item.id} style={styles.addedCard}>
                    <Text style={styles.addonName}>{item.name}</Text>

                    <View style={styles.addonRight}>
                      <Text style={styles.priceText}>₹{item.price}</Text>

                      <TouchableOpacity
                        onPress={() =>
                          dispatch(removeAddon({ orderId, addonId: item.id }))
                        }
                        style={styles.iconBox}
                      >
                        <MaterialIcons
                          name="delete-outline"
                          size={18}
                          color="#ff4d4d"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
            <Divider style={{ marginBottom: windowHeight(1.5) }} />

            <View style={styles.row}>
              <Text style={styles.label}>Discount</Text>
              <Text style={styles.discountText}>₹{data.discount || 0}</Text>
            </View>

            <AddonSuggestionCard
              orderId={orderId}
              suggestedAddons={data?.suggestedAddons || []}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Final Payable</Text>
          <Text style={styles.totalValue}>₹{grandTotal}</Text>
        </View>

        <Button
          height={windowHeight(6)}
          title="SAVE CHANGES"
          backgroundColor={color.primary}
          onPress={handleSave}
          isLoading={saving}
        />
      </View>
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgGray,
  },

  scrollContent: {
    paddingBottom: windowHeight(14),
  },

  card: {
    backgroundColor: "white",
    borderRadius: windowWidth(4),
    padding: windowWidth(4),
    margin: windowWidth(3),
    elevation: 3,
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    color: color.primary,
    marginBottom: windowHeight(2),
  },

  row: { flexDirection: "row", justifyContent: "space-between" },

  sectionHeading: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    marginBottom: windowHeight(1),
  },

  addedCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(1),
  },

  addonName: { fontFamily: fonts.medium, fontSize: fontSizes.sm },

  addonRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(3),
  },

  priceText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    color: color.primary,
  },
  discountText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    color: color.warningText,
  },

  iconBox: {
    borderRadius: windowHeight(2),
    borderWidth: 1,
    borderColor: "#ff4d4d",
    backgroundColor: "#ffecec",
  },

  label: { fontFamily: fonts.medium, fontSize: fontSizes.sm },

  footer: {
    position: "absolute",
    bottom: windowHeight(0),
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
    alignItems: "center",
    marginBottom: windowHeight(2),
  },

  totalLabel: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.rg,
    color: color.primary,
  },

  totalValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.xl,
    color: color.primary,
  },
});
