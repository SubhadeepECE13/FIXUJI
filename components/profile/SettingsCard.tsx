import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Switch } from "react-native-paper";
import { CustomIcon } from "../common/Icon";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { setIsOwnOrder } from "@/store/reducers/orders/orderSlice";
import {
  getCurrentLanguage,
  setCurrentLanguage,
} from "@/utils/translator/liveTranslator";

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "हिन्दी (Hindi)", value: "hi" },
  { label: "বাংলা (Bengali)", value: "bn" },
];

const SettingsCard = () => {
  const dispatch = useAppDispatch();
  const isOwnOrder = useAppSelector((state) => state.order.isOwnOrder);

  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState(getCurrentLanguage());
  const [languages, setLanguages] = useState(LANGUAGES);

  const handleToggleChange = (value: boolean) => {
    dispatch(setIsOwnOrder(value));
  };

  const onLanguageOpen = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <View style={styles.leftSection}>
          <CustomIcon
            type="Feather"
            name="globe"
            color={color.primary}
            size={18}
            style={styles.iconBox}
          />
          <Text style={styles.settingLabel}>Language</Text>
        </View>

        <View style={styles.rightSection}>
          <DropDownPicker
            open={languageOpen}
            value={selectedLanguage}
            items={languages}
            setOpen={setLanguageOpen}
            setValue={(cb) => {
              const value =
                typeof cb === "function" ? cb(selectedLanguage) : cb;
              setSelectedLanguage(value);
              setCurrentLanguage(value);
            }}
            setItems={setLanguages}
            onOpen={onLanguageOpen}
            placeholder="Select"
            placeholderStyle={styles.placeholderText}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownBox}
            textStyle={styles.dropdownText}
            listMode="SCROLLVIEW"
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View>
      </View>

      <View style={styles.settingRow}>
        <View style={styles.leftSection}>
          <CustomIcon
            type="Feather"
            name="list"
            color={color.primary}
            size={18}
            style={styles.iconBox}
          />
          <Text style={styles.settingLabel}>Show My Bookings Only</Text>
        </View>

        <View style={styles.rightSection}>
          <Switch
            value={isOwnOrder}
            onValueChange={handleToggleChange}
            trackColor={{ false: color.fadedPrimary, true: color.fadedPrimary }}
            thumbColor={isOwnOrder ? color.primary : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.whiteColor,
    borderRadius: windowHeight(2),
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(3),
    marginTop: windowHeight(3),
    rowGap: windowHeight(1.5),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.0,
    elevation: 1.5,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.whiteColor,
    borderRadius: 14,
    paddingVertical: windowHeight(1.3),
    paddingHorizontal: windowWidth(4),
    gap: windowHeight(0.5),
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
  },

  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  iconBox: {
    backgroundColor: color.fadedPrimary,
    padding: windowWidth(1.5),
    borderRadius: 14,
  },

  settingLabel: {
    fontSize: fontSizes.md,
    fontFamily: fonts.medium,
    color: color.borderColor,
  },

  dropdown: {
    width: windowWidth(40),
    borderColor: color.borderColor,
    borderRadius: 10,
    backgroundColor: color.whiteColor,
    height: windowHeight(4.5),
  },
  dropdownBox: {
    borderColor: color.borderColor,
    backgroundColor: color.whiteColor,
  },
  dropdownText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: color.borderColor,
  },
  placeholderText: {
    color: color.borderColor,
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
  },
});
