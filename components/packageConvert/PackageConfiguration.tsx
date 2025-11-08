import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import color from "@/themes/Colors.themes";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

interface Props {
  serviceOpen: boolean;
  variantOpen: boolean;
  service: string | null;
  variant: string | null;
  // discount: string;
  services: ItemType<string>[];
  variants: ItemType<string>[];
  setServiceOpen: (open: boolean) => void;
  setVariantOpen: (open: boolean) => void;
  onServiceOpen: () => void;
  onVariantOpen: () => void;
  setService: (value: string | null) => void;
  setVariant: (value: string | null) => void;
  // setDiscount: (value: string) => void;
}

export default function PackageConfiguration({
  serviceOpen,
  variantOpen,
  service,
  variant,
  // discount,
  services,
  variants,
  setServiceOpen,
  setVariantOpen,
  onServiceOpen,
  onVariantOpen,
  setService,
  setVariant,
  // setDiscount,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionHeader}>Configuration</Text>

      <View style={[styles.inputGroup, { zIndex: 3000 }]}>
        <Text style={styles.label}>Selected Service</Text>
        <DropDownPicker
          open={serviceOpen}
          value={service}
          items={services}
          setOpen={(cb) =>
            setServiceOpen(typeof cb === "function" ? cb(serviceOpen) : cb)
          }
          setValue={(cb) =>
            setService(typeof cb === "function" ? cb(service) : cb)
          }
          onOpen={onServiceOpen}
          placeholder="Select Service Type"
          placeholderStyle={styles.placeholderText}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          textStyle={styles.dropdownText}
          listMode="SCROLLVIEW"
        />
      </View>

      <View style={[styles.inputGroup, { zIndex: 2000 }]}>
        <Text style={styles.label}>Vehicle Variant</Text>
        <DropDownPicker
          open={variantOpen}
          value={variant}
          items={variants}
          setOpen={(cb) =>
            setVariantOpen(typeof cb === "function" ? cb(variantOpen) : cb)
          }
          setValue={(cb) =>
            setVariant(typeof cb === "function" ? cb(variant) : cb)
          }
          onOpen={onVariantOpen}
          placeholder="Select Vehicle Variant"
          placeholderStyle={styles.placeholderText}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          textStyle={styles.dropdownText}
          listMode="SCROLLVIEW"
        />
      </View>

      {/* <View style={[styles.inputGroup, { zIndex: 1000 }]}>
        <Text style={styles.label}>Apply Discount (₹)</Text>
        <TextInput
          value={discount}
          onChangeText={setDiscount}
          placeholder="0"
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.whiteColor,
    padding: windowWidth(5),
    borderRadius: windowWidth(4),
    marginBottom: windowHeight(3),
  },
  sectionHeader: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(2),
  },
  inputGroup: {
    marginBottom: windowHeight(2),
  },
  label: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(1),
  },
  dropdown: {
    borderColor: color.borderBottomColor,
    borderWidth: 1,
    borderRadius: windowWidth(3),
    minHeight: windowHeight(6.5),
    paddingHorizontal: windowWidth(3),
  },
  dropdownBox: {
    borderColor: color.borderBottomColor,
    borderRadius: windowWidth(3),
  },
  dropdownText: {
    fontSize: fontSizes.rg,
    color: color.appHeaderText,
  },
  placeholderText: {
    fontSize: fontSizes.rg,
    color: color.appHeaderText,
    fontFamily: fonts.regular,
  },
  input: {
    backgroundColor: color.whiteColor,
    borderWidth: 1,
    borderColor: color.borderBottomColor,
    borderRadius: windowWidth(3),
    paddingHorizontal: windowWidth(4),
    height: windowHeight(6.5),
    fontSize: fontSizes.md,
    fontFamily: fonts.regular,
  },
});
