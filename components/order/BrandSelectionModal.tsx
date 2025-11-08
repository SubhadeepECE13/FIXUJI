import React, { forwardRef, useMemo } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import CustomBottomSheetModal from "../common/CustomBottomSheetModal";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";

export interface BrandSelectSheetProps {
  onSelect: (value: string) => void;
}

export const carBrands = [
  { label: "Audi", value: "Audi" },
  { label: "BMW", value: "BMW" },
  { label: "Citroen", value: "Citroen" },
  { label: "Datsun", value: "Datsun" },
  { label: "Ford", value: "Ford" },
  { label: "Honda", value: "Honda" },
  { label: "Hyundai", value: "Hyundai" },
  { label: "Jeep", value: "Jeep" },
  { label: "Kia", value: "Kia" },
  { label: "Land Rover", value: "Land Rover" },
  { label: "MG", value: "MG" },
  { label: "Mahindra", value: "Mahindra" },
  { label: "Mercedes", value: "Mercedes" },
  { label: "Nissan", value: "Nissan" },
  { label: "Others(Bike/Scooty)", value: "Others(Bike/Scooty)" },
  { label: "Others(Car)", value: "Others(Car)" },
  { label: "Range Rover", value: "Range Rover" },
  { label: "Renault", value: "Renault" },
  { label: "Suzuki", value: "Suzuki" },
  { label: "Tata", value: "Tata" },
  { label: "Toyota", value: "Toyota" },
  { label: "Volkswagen", value: "Volkswagen" },
  { label: "Volvo", value: "Volvo" },
];

const BrandSelectSheet = forwardRef<any, BrandSelectSheetProps>(
  ({ onSelect }, ref) => {
    const snapPoints = useMemo(() => ["50%"], []);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        initialSnapPoint={0}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        contentContainerStyle={styles.sheetContainer}
      >
        <BottomSheetView style={styles.header}>
          <Text style={styles.headerText}>Select Car Brand</Text>
        </BottomSheetView>

        <BottomSheetFlatList
          data={carBrands}
          keyExtractor={(item) => item.value}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onSelect(item.value)}
            >
              <Text style={styles.itemText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </CustomBottomSheetModal>
    );
  }
);

export default BrandSelectSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: color.whiteColor,
  },
  header: {
    paddingVertical: windowHeight(1),
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: color.primary,
    marginBottom: windowHeight(1),
    zIndex: 100,
    backgroundColor: color.whiteColor,
  },
  headerText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  listContent: {
    paddingHorizontal: windowWidth(4),
    paddingBottom: windowHeight(2),
    paddingTop: windowHeight(4),
  },
  item: {
    paddingVertical: windowHeight(1.4),
    paddingHorizontal: windowWidth(2),
    borderBottomWidth: 0.8,
    borderBottomColor: color.borderBottomColor,
    justifyContent: "center",
  },
  itemText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.medium,
    color: color.appHeaderText,
  },
});
