import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import AddonSection from "@/components/packageConvert/Addons";
import PackageConfigSection from "@/components/packageConvert/PackageConfiguration";
import {
  fetchAddonsByService,
  fetchServices,
} from "@/store/actions/services/ServiceAction";
import { AppDispatch, RootState } from "@/store/Store";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function PackageConvert() {
  const dispatch = useDispatch<AppDispatch>();
  const finalPayable = useSelector(
    (state: RootState) => state.orderPayment.finalPayable
  );
  const { data: serviceList } = useSelector(
    (state: RootState) => state.services
  );
  const { data: addonList, loading: addonLoading } = useSelector(
    (state: RootState) => state.addons
  );

  const [service, setService] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [serviceOpen, setServiceOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  useEffect(() => {
    if (service && variant) {
      dispatch(fetchAddonsByService(service, variant));
    }
  }, [service, variant]);

  const variants = [
    { label: "Hatchback", value: "Hatchback" },
    { label: "Compact SUV", value: "Compact SUV" },
    { label: "Sedan", value: "Sedan" },
    { label: "SUV", value: "SUV" },
    { label: "7 Seater", value: "7 Seater" },
  ];

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const total = addonList.reduce(
    (sum, item) =>
      sum +
      (selectedIds.includes(item.id)
        ? item.variant?.[0]?.actual_price || 0
        : 0),
    0
  );

  const grandtotal = total + finalPayable;
  console.log("grandtotal", grandtotal);

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 700);
  };

  return (
    <View style={styles.mainContainer}>
      <Header title="Package Convert" isBack isLeftIcon isRightIcon />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <PackageConfigSection
            serviceOpen={serviceOpen}
            variantOpen={variantOpen}
            service={service}
            variant={variant}
            services={serviceList.map((s) => ({
              label: s.name,
              value: s.name,
            }))}
            variants={variants}
            setServiceOpen={setServiceOpen}
            setVariantOpen={setVariantOpen}
            onServiceOpen={() => setVariantOpen(false)}
            onVariantOpen={() => setServiceOpen(false)}
            setService={setService}
            setVariant={setVariant}
          />

          <AddonSection
            addons={addonList.map((a) => ({
              id: a.id,
              addon_name: a.addon_name,
              actual_price: a.variant?.[0]?.actual_price || 0,
            }))}
            isLoading={addonLoading}
            selectedIds={selectedIds}
            toggleSelection={toggleSelection}
            service={service}
            variant={variant}
          />
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{grandtotal}</Text>
          </View>

          <Button
            height={windowHeight(6)}
            title="SAVE PACKAGE"
            backgroundColor={color.primary}
            onPress={handleSave}
            disabled={isSubmitting}
            isLoading={isSubmitting}
            titleStyle={styles.buttonText}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.bgGray,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: windowHeight(2),
  },
  scrollContent: {
    padding: windowWidth(4),
    paddingBottom: windowHeight(2),
  },
  footer: {
    padding: windowWidth(5),
    backgroundColor: color.whiteColor,
    borderTopLeftRadius: windowWidth(5),
    borderTopRightRadius: windowWidth(5),
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: windowHeight(2),
  },
  totalLabel: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  totalSubLabel: {
    fontSize: fontSizes.xs,
    color: color.primary,
    marginTop: windowHeight(0.5),
  },
  totalValue: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  buttonText: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.medium,
  },
});
