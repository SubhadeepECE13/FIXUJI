import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";

type AddonType = {
  id: string;
  addon_name: string;
  actual_price: number;
};

interface Props {
  addons: AddonType[];
  isLoading: boolean;
  selectedIds: string[];
  toggleSelection: (id: string) => void;
  service: string | null;
  variant: string | null;
}

export default function AddonSection({
  addons,
  isLoading,
  selectedIds,
  toggleSelection,
  service,
  variant,
}: Props) {
  return (
    <View style={styles.addonsSection}>
      <Text style={styles.sectionTitle}>Available Addons</Text>

      {addons.length > 0 && (
        <Text style={styles.subtitle}>Select applicable services</Text>
      )}

      {isLoading ? (
        <View style={styles.skeletonWrap}>
          <CustomSkeletonLoader
            dWidth="100%"
            dHeight={windowHeight(7)}
            radius={windowWidth(3)}
          />
          <CustomSkeletonLoader
            dWidth="100%"
            dHeight={windowHeight(7)}
            radius={windowWidth(3)}
          />
          <CustomSkeletonLoader
            dWidth="100%"
            dHeight={windowHeight(7)}
            radius={windowWidth(3)}
          />
          <CustomSkeletonLoader
            dWidth="100%"
            dHeight={windowHeight(7)}
            radius={windowWidth(3)}
          />
          <CustomSkeletonLoader
            dWidth="100%"
            dHeight={windowHeight(7)}
            radius={windowWidth(3)}
          />
        </View>
      ) : addons.length > 0 ? (
        <View style={styles.addonList}>
          {addons.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <View
                key={item.id}
                style={[styles.addonRow, isSelected && styles.addonRowSelected]}
              >
                <View style={styles.addonLeft}>
                  <Checkbox
                    value={isSelected}
                    onValueChange={() => toggleSelection(item.id)}
                    color={isSelected ? color.primary : color.backDropColor}
                    style={styles.checkbox}
                  />

                  <Text
                    style={[
                      styles.addonText,
                      isSelected && styles.addonTextSelected,
                    ]}
                  >
                    {item.addon_name}
                  </Text>
                </View>

                <Text style={styles.price}>₹{item.actual_price}</Text>
              </View>
            );
          })}
        </View>
      ) : !service || !variant ? (
        <Text style={styles.emptyText}>
          Please select service and variant first.
        </Text>
      ) : (
        <Text style={styles.emptyText}>
          No addons available for this combination.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addonsSection: { marginBottom: windowHeight(2) },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: color.primary,
    marginTop: windowHeight(0.5),
    marginBottom: windowHeight(1.5),
  },
  skeletonWrap: {
    marginTop: windowHeight(1.5),
    gap: windowHeight(1.5),
  },
  addonList: { gap: windowHeight(1.5) },
  addonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(4),
    backgroundColor: color.whiteColor,
    borderRadius: windowWidth(3.5),
    borderColor: "transparent",
    shadowRadius: windowWidth(1),
  },
  addonRowSelected: {
    borderColor: color.primary,
    borderWidth: 1,
  },
  addonLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  checkbox: {
    borderRadius: windowWidth(1.5),
    marginRight: windowWidth(3),
    height: windowWidth(5),
    width: windowWidth(5),
  },
  addonText: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.medium,
    color: color.appHeaderText,
    flex: 1,
  },
  addonTextSelected: {
    fontFamily: fonts.bold,
    color: color.primary,
  },
  price: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.medium,
    color: color.primary,
  },
  emptyText: {
    color: color.red,
    marginTop: windowHeight(2),
    textAlign: "center",
    fontSize: fontSizes.sm,
  },
});
