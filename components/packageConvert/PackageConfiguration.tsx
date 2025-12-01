// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
// import color from "@/themes/Colors.themes";
// import {
//   windowHeight,
//   windowWidth,
//   fontSizes,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import { RootState } from "@/store/Store";
// import { useSelector } from "react-redux";

// interface Props {
//   serviceOpen: boolean;
//   variantOpen: boolean;
//   service: string | null;
//   variant: string | null;
//   services: ItemType<string>[];
//   variants: ItemType<string>[];
//   setServiceOpen: (open: boolean) => void;
//   setVariantOpen: (open: boolean) => void;
//   onServiceOpen: () => void;
//   onVariantOpen: () => void;
//   setService: (value: string | null) => void;
//   setVariant: (value: string | null) => void;
// }

// export default function PackageConfiguration({
//   serviceOpen,
//   variantOpen,
//   service,
//   variant,
//   services,
//   variants,
//   setServiceOpen,
//   setVariantOpen,
//   onServiceOpen,
//   onVariantOpen,
//   setService,
//   setVariant,
// }: Props) {
//   const { orderDetails } = useSelector(
//     (state: RootState) => state.orderDetails
//   );

//   return (
//     <View style={styles.card}>
//       <Text style={styles.sectionHeader}>Configuration</Text>

//       <View style={[styles.inputGroup, { zIndex: 3000 }]}>
//         <Text style={styles.label}>Selected Service</Text>
//         <DropDownPicker
//           open={serviceOpen}
//           value={service ?? orderDetails?.data?.service?.name ?? null}
//           items={services}
//           setOpen={(cb) =>
//             setServiceOpen(typeof cb === "function" ? cb(serviceOpen) : cb)
//           }
//           setValue={(cb) =>
//             setService(typeof cb === "function" ? cb(service) : cb)
//           }
//           placeholder="Select Service Type"
//           style={styles.dropdown}
//           dropDownContainerStyle={styles.dropdownBox}
//           textStyle={styles.dropdownText}
//         />
//       </View>

//       <View style={[styles.inputGroup, { zIndex: 2000 }]}>
//         <Text style={styles.label}>Vehicle Variant</Text>
//         <DropDownPicker
//           open={variantOpen}
//           value={variant ?? orderDetails?.data?.variant?.vehicle_type ?? null}
//           items={variants}
//           setOpen={(cb) =>
//             setVariantOpen(typeof cb === "function" ? cb(variantOpen) : cb)
//           }
//           setValue={(cb) =>
//             setVariant(typeof cb === "function" ? cb(variant) : cb)
//           }
//           placeholder="Select Vehicle Variant"
//           style={styles.dropdown}
//           dropDownContainerStyle={styles.dropdownBox}
//           textStyle={styles.dropdownText}
//         />
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: color.whiteColor,
//     padding: windowWidth(5),
//     borderRadius: windowWidth(4),
//     marginBottom: windowHeight(3),
//   },
//   sectionHeader: {
//     fontSize: fontSizes.md,
//     fontFamily: fonts.bold,
//     color: color.primary,
//     marginBottom: windowHeight(2),
//   },
//   inputGroup: {
//     marginBottom: windowHeight(2),
//   },
//   label: {
//     fontSize: fontSizes.rg,
//     fontFamily: fonts.bold,
//     color: color.primary,
//     marginBottom: windowHeight(1),
//   },
//   dropdown: {
//     borderColor: color.borderBottomColor,
//     borderWidth: 1,
//     borderRadius: windowWidth(3),
//     minHeight: windowHeight(6.5),
//     paddingHorizontal: windowWidth(3),
//   },
//   dropdownBox: {
//     borderColor: color.borderBottomColor,
//     borderRadius: windowWidth(3),
//   },
//   dropdownText: {
//     fontSize: fontSizes.rg,
//     color: color.appHeaderText,
//   },
//   placeholderText: {
//     fontSize: fontSizes.rg,
//     color: color.appHeaderText,
//     fontFamily: fonts.regular,
//   },
//   input: {
//     backgroundColor: color.whiteColor,
//     borderWidth: 1,
//     borderColor: color.borderBottomColor,
//     borderRadius: windowWidth(3),
//     paddingHorizontal: windowWidth(4),
//     height: windowHeight(6.5),
//     fontSize: fontSizes.md,
//     fontFamily: fonts.regular,
//   },
// });

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import color from "@/themes/Colors.themes";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";

interface Props {
  serviceOpen: boolean;
  variantOpen: boolean;
  service: string | null;
  variant: string | null;
  services: { label: string; value: string }[];
  variants: { label: string; value: string }[];
  setServiceOpen: (open: boolean) => void;
  setVariantOpen: (open: boolean) => void;
  onServiceOpen: () => void;
  onVariantOpen: () => void;
  setService: (value: string | null) => void;
  setVariant: (value: string | null) => void;
}

export default function PackageConfiguration({
  serviceOpen,
  variantOpen,
  service,
  variant,
  services,
  variants,
  setService,
  setVariant,
}: Props) {
  const { orderDetails } = useSelector(
    (state: RootState) => state.orderDetails
  );

  return (
    <View style={styles.card}>
      <Text style={styles.sectionHeader}>Configuration</Text>

      {/* SERVICE DROPDOWN */}
      <View style={[styles.inputGroup, { zIndex: 3000 }]}>
        <Text style={styles.label}>Selected Service</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownBox}
          placeholder="Select Service Type"
          data={services}
          labelField="label"
          valueField="value"
          value={service ?? orderDetails?.data?.service?.name ?? null}
          onChange={(item) => setService(item.value)}
          maxHeight={220}
        />
      </View>

      {/* VARIANT DROPDOWN */}
      <View style={[styles.inputGroup, { zIndex: 2000 }]}>
        <Text style={styles.label}>Vehicle Variant</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownBox}
          placeholder="Select Vehicle Variant"
          data={variants}
          labelField="label"
          valueField="value"
          value={variant ?? orderDetails?.data?.variant?.vehicle_type ?? null}
          onChange={(item) => setVariant(item.value)}
          maxHeight={220}
        />
      </View>
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
    height: windowHeight(6.5),
    paddingHorizontal: windowWidth(3),
  },
  dropdownBox: {
    borderColor: color.borderBottomColor,
    borderRadius: windowWidth(3),
    maxHeight: 220,
  },
});
