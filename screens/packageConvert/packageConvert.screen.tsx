import Header from "@/components/common/Header";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "@/components/common/Button";
import color from "@/themes/Colors.themes";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import AddonSection from "@/components/packageConvert/Addons";
import PackageConfigSection from "@/components/packageConvert/PackageConfiguration";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/Store";

import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
import { ServiceType } from "@/store/actions/services/services.action";
import { fetchServices } from "@/store/actions/services/ServiceAction";

export default function PackageConvert() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: serviceList,
    loading: serviceLoading,
    error,
  } = useSelector((state: RootState) => state.services);

  const [service, setService] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [addons, setAddons] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [serviceOpen, setServiceOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);

  // Fetch services once
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // 🔹 Static variants
  const variants = [
    { label: "Hatchback", value: "Hatchback" },
    { label: "Compact SUV", value: "Compact SUV" },
    { label: "Sedan", value: "Sedan" },
    { label: "SUV", value: "SUV" },
    { label: "7 Seater", value: "7 Seater" },
  ];

  // 🔹 Filter addons based on service + variant
  useEffect(() => {
    if (service && variant && serviceList.length > 0) {
      const selectedService: ServiceType | undefined = serviceList.find(
        (s) => s.name === service
      );

      if (selectedService) {
        const filteredAddons =
          selectedService.addons
            ?.map((addon) => {
              const match = addon.variant.find(
                (v) => v.vehicle_type === variant
              );
              return match
                ? {
                    id: addon.id,
                    addon_name: addon.addon_name,
                    actual_price: match.actual_price,
                    // display_price: match.display_price,
                  }
                : null;
            })
            .filter(Boolean) || [];

        setAddons(filteredAddons as any[]);
      }
    } else {
      setAddons([]);
    }
  }, [service, variant, serviceList]);

  const onServiceOpen = useCallback(() => setVariantOpen(false), []);
  const onVariantOpen = useCallback(() => setServiceOpen(false), []);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const total = addons.reduce(
    (sum, item) =>
      sum + (selectedIds.includes(item.id) ? item.actual_price || 0 : 0),
    0
  );

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 700);
  };

  if (serviceLoading) {
    return (
      <View style={styles.loaderContainer}>
        {[1, 2, 3].map((i) => (
          <CustomSkeletonLoader
            key={i}
            dWidth="90%"
            dHeight={windowHeight(6)}
            radius={windowWidth(3)}
          />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: color.red }}>Error: {error}</Text>
      </View>
    );
  }

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
          nestedScrollEnabled={true}
        >
          {/* ✅ Service & Variant dropdowns */}
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
            onServiceOpen={onServiceOpen}
            onVariantOpen={onVariantOpen}
            setService={setService}
            setVariant={setVariant}
          />

          {/* ✅ Addons */}
          <AddonSection
            addons={addons}
            isLoading={false}
            selectedIds={selectedIds}
            toggleSelection={toggleSelection}
            service={service}
            variant={variant}
          />
        </ScrollView>

        {/* ✅ Footer - same design */}
        <View style={styles.footer}>
          <View style={styles.totalBox}>
            <View>
              <Text style={styles.totalLabel}>Total Payable</Text>
              <Text style={styles.totalSubLabel}>
                {selectedIds.length} addons selected
              </Text>
            </View>
            <Text style={styles.totalValue}>
              ₹{Math.max(total, 0).toLocaleString()}
            </Text>
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
