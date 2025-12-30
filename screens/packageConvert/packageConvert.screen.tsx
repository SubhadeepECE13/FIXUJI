import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import AddonSection from "@/components/packageConvert/Addons";
import PackageConfigSection from "@/components/packageConvert/PackageConfiguration";
import {
  fetchAddonsByService,
  fetchServices,
  updateServiceDetails,
} from "@/store/actions/services/ServiceAction";
import { AppDispatch, RootState } from "@/store/Store";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function PackageConvert() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: serviceList } = useSelector(
    (state: RootState) => state.services
  );
  const { data: addonList, loading: addonLoading } = useSelector(
    (state: RootState) => state.addons
  );
  const { orderDetails } = useSelector(
    (state: RootState) => state.orderDetails
  );

  const data = orderDetails?.data;
  const { order_id } = useLocalSearchParams();

  const [service, setService] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const originalService = useRef<string | null>(null);
  const originalVariant = useRef<string | null>(null);
  const originalAddons = useRef<string[]>([]);
  const hasInitialized = useRef(false);

  /** ---- Fetch services ---- */
  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  /** ---- Load defaults only ONCE ---- */
  useEffect(() => {
    if (!data) return;

    const defaultService = data?.service?.name ?? null;
    const defaultVariant = data?.variant?.vehicle_type ?? null;
    const defaultAddons = data?.addons?.map((a) => a.id.toString()) || [];

    setService(defaultService);
    setVariant(defaultVariant);
    setSelectedIds(defaultAddons);

    originalService.current = defaultService;
    originalVariant.current = defaultVariant;
    originalAddons.current = defaultAddons;
  }, [data]);

  /** ---- Fetch addons when dropdown values change ---- */
  useEffect(() => {
    if (service && variant) {
      dispatch(fetchAddonsByService(service, variant));
    }
  }, [service, variant]);

  /** ---- Reset addons IF user changes service/variant AFTER initial load ---- */
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }

    if (
      service !== originalService.current ||
      variant !== originalVariant.current
    ) {
      setSelectedIds([]); // Clear previous addons
    }
  }, [service, variant]);

  /** ---- Track if user modified anything ---- */
  useEffect(() => {
    const serviceChanged = service !== originalService.current;
    const variantChanged = variant !== originalVariant.current;
    const addonsChanged =
      JSON.stringify(selectedIds.sort()) !==
      JSON.stringify(originalAddons.current.sort());

    setIsDirty(serviceChanged || variantChanged || addonsChanged);
  }, [service, variant, selectedIds]);

  /** ---- Addon selection toggle ---- */
  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const variants = [
    { label: "Hatchback", value: "Hatchback" },
    { label: "Compact SUV", value: "Compact SUV" },
    { label: "Sedan", value: "Sedan" },
    { label: "SUV", value: "SUV" },
    { label: "7 Seater", value: "7 Seater" },
  ];

  const getBaseServicePrice = () => {
    const selectedService = serviceList?.find((s) => s.name === service);
    const varInfo = selectedService?.variant?.find(
      (v) => v.vehicle_type === variant
    );
    return varInfo?.actual_price || 0;
  };

  /** ---- Compute final total ---- */
  const total = useMemo(() => {
    const base = getBaseServicePrice();
    const addonCost = addonList
      .filter((a) => selectedIds.includes(a.id))
      .reduce((sum, a) => sum + (a?.actual_price || 0), 0);
    const discount = data?.discount ?? 0;
    return base + addonCost - discount;
  }, [service, variant, addonList, selectedIds]);

  /** ---- Save update ---- */
  const handleSave = async () => {
    if (!isDirty) return;

    setSaving(true);

    const payload = {
      addons: selectedIds,
      service: service ?? data?.service?.name ?? "",
      variant: variant ?? data?.variant?.vehicle_type ?? "",
      total,
    };

    try {
      await dispatch(updateServiceDetails(order_id as string, payload));

      originalService.current = service;
      originalVariant.current = variant;
      originalAddons.current = [...selectedIds];
      setIsDirty(false);

      Toast.show({
        type: "success",
        text1: "Updated Successfully",
        text2: "Order details updated.",
      });

      setTimeout(() => router.replace(`/orderDetailes/${order_id}`), 800);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Please try again",
      });
    } finally {
      setSaving(false);
    }
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
          nestedScrollEnabled={true}
          style={{ flex: 1, zIndex: 1 }}
        >
          <PackageConfigSection
            serviceOpen={serviceOpen}
            variantOpen={variantOpen}
            service={service}
            variant={variant}
            services={
              serviceList?.map((s) => ({ label: s.name, value: s.name })) || []
            }
            variants={variants}
            setServiceOpen={setServiceOpen}
            setVariantOpen={setVariantOpen}
            onServiceOpen={() => setVariantOpen(false)}
            onVariantOpen={() => setServiceOpen(false)}
            setService={setService}
            setVariant={setVariant}
          />

          <AddonSection
            addons={addonList}
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
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>

          <Button
            height={windowHeight(6)}
            title="SAVE PACKAGE"
            backgroundColor={isDirty ? color.primary : "#BDBDBD"}
            onPress={handleSave}
            disabled={!isDirty || saving}
            isLoading={saving}
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
