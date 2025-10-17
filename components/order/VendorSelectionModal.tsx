// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { ZoomIn } from "react-native-reanimated";
// import Checkbox from "expo-checkbox";
// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import { fetchVendors } from "@/store/actions/vendors/vendorAction";
// import CustomModal from "@/components/common/CustomModal";
// import Button from "@/components/common/Button";
// import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";

// type VendorSelectModalProps = {
//   isOpen: boolean;
//   setOpened: (val: boolean) => void;
//   onSelect: (selectedVendors: any[]) => void;
//   orderId: string;
// };

// const VendorSelectModal: React.FC<VendorSelectModalProps> = ({
//   isOpen,
//   setOpened,
//   onSelect,
// }) => {
//   const dispatch = useAppDispatch();
//   const { vendors, loading } = useAppSelector((state) => state.vendor);

//   const [selectedIds, setSelectedIds] = useState<string[]>([]);

//   useEffect(() => {
//     if (isOpen) dispatch(fetchVendors());
//   }, [isOpen]);

//   const toggleSelection = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleSelect = () => {
//     const selectedVendors = vendors.filter((v) => selectedIds.includes(v.id));
//     onSelect(selectedVendors);
//     setOpened(false);
//   };

//   const renderItem = ({ item, index }: any) => (
//     <Animated.View
//       entering={ZoomIn.delay(index * 80)
//         .damping(10)
//         .stiffness(200)}
//       style={styles.animatedRow}
//     >
//       <TouchableOpacity
//         style={styles.itemRow}
//         activeOpacity={0.8}
//         onPress={() => toggleSelection(item.id)}
//       >
//         <Checkbox
//           value={selectedIds.includes(item.id)}
//           onValueChange={() => toggleSelection(item.id)}
//           color={selectedIds.includes(item.id) ? color.primary : undefined}
//           style={styles.checkbox}
//         />
//         <Text style={styles.vendorName}>{item.vendor_name}</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   const renderSkeletonLoader = () => (
//     <View style={styles.skeletonContainer}>
//       {[...Array(6)].map((_, index) => (
//         <View key={index} style={styles.skeletonRow}>
//           <CustomSkeletonLoader
//             dWidth={windowWidth(6)}
//             dHeight={windowWidth(6)}
//             radius={windowWidth(2)}
//           />
//           <CustomSkeletonLoader
//             dWidth={windowWidth(60)}
//             dHeight={windowHeight(2.5)}
//             radius={windowWidth(2)}
//           />
//         </View>
//       ))}
//     </View>
//   );

//   return (
//     <CustomModal
//       isOpen={isOpen}
//       setOpened={setOpened}
//       isBlur
//       blurTint="dark"
//       blurIntensity={25}
//     >
//       <View style={styles.modalBox}>
//         <Text style={styles.title}>Select Vendor</Text>

//         {loading ? (
//           renderSkeletonLoader()
//         ) : (
//           <FlatList
//             data={vendors || []}
//             keyExtractor={(item, index) => item?.id ?? index.toString()}
//             renderItem={renderItem}
//             contentContainerStyle={{ paddingBottom: windowHeight(2) }}
//             style={{
//               maxHeight: windowHeight(30),
//               width: "100%",
//             }}
//           />
//         )}

//         <Button
//           width={windowWidth(50)}
//           height={windowHeight(5)}
//           title="Select"
//           backgroundColor={color.primary}
//           onPress={handleSelect}
//           disabled={selectedIds.length === 0}
//           titleStyle={{ fontSize: fontSizes.md }}
//           isLoading
//         />
//       </View>
//     </CustomModal>
//   );
// };

// export default VendorSelectModal;

// const styles = StyleSheet.create({
//   modalBox: {
//     width: windowWidth(85),
//     backgroundColor: color.whiteColor,
//     borderRadius: 16,
//     paddingVertical: windowHeight(2),
//     paddingHorizontal: windowWidth(4),
//     alignItems: "center",
//   },
//   title: {
//     fontSize: fontSizes.lg,
//     fontWeight: "600",
//     color: color.appHeaderText,
//     marginBottom: windowHeight(2),
//   },
//   animatedRow: {
//     width: "100%",
//   },
//   itemRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: windowHeight(1.2),
//     paddingHorizontal: windowWidth(2),
//     borderRadius: windowHeight(1.2),
//   },
//   checkbox: {
//     marginRight: windowWidth(3),
//   },
//   vendorName: {
//     fontSize: fontSizes.md,
//     color: color.appHeaderText,
//   },
//   skeletonContainer: {
//     width: "100%",
//     paddingVertical: windowHeight(1),
//   },
//   skeletonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: windowWidth(3),
//     marginBottom: windowHeight(1.5),
//     paddingHorizontal: windowWidth(2),
//   },
// });

import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import Checkbox from "expo-checkbox";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import {
  fetchVendors,
  updateVendorDetails,
} from "@/store/actions/vendors/vendorAction";
import CustomModal from "@/components/common/CustomModal";
import Button from "@/components/common/Button";
import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import Toast from "react-native-toast-message";
import { appAxios } from "@/store/apiconfig";

type VendorSelectModalProps = {
  isOpen: boolean;
  setOpened: (val: boolean) => void;
  onSelect: (selectedVendors: any[]) => void;
  orderId: string;
};

const VendorSelectModal: React.FC<VendorSelectModalProps> = ({
  isOpen,
  setOpened,
  onSelect,
  orderId,
}) => {
  const dispatch = useAppDispatch();
  const { vendors, loading } = useAppSelector((state) => state.vendor);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) dispatch(fetchVendors());
  }, [isOpen]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelect = async () => {
    const selectedVendors = vendors.filter((v) => selectedIds.includes(v.id));
    if (selectedVendors.length === 0) return;

    const payload = {
      vendors: selectedVendors.map((vendor) => ({
        name: vendor.vendor_name,
        role: vendor.role,
        vendor_id: vendor.id,
      })),
    };

    setIsSubmitting(true);
    try {
      await dispatch(updateVendorDetails(orderId, payload));
      onSelect(selectedVendors);
      setOpened(false);
    } catch (error) {
      console.error("Error updating vendors:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderItem = ({ item, index }: any) => (
    <Animated.View
      entering={ZoomIn.delay(index * 80)
        .damping(10)
        .stiffness(200)}
      style={styles.animatedRow}
    >
      <TouchableOpacity
        style={styles.itemRow}
        activeOpacity={0.8}
        onPress={() => toggleSelection(item.id)}
      >
        <Checkbox
          value={selectedIds.includes(item.id)}
          onValueChange={() => toggleSelection(item.id)}
          color={selectedIds.includes(item.id) ? color.primary : undefined}
          style={styles.checkbox}
        />
        <Text style={styles.vendorName}>{item.vendor_name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderSkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      {[...Array(6)].map((_, index) => (
        <View key={index} style={styles.skeletonRow}>
          <CustomSkeletonLoader
            dWidth={windowWidth(6)}
            dHeight={windowWidth(6)}
            radius={windowWidth(2)}
          />
          <CustomSkeletonLoader
            dWidth={windowWidth(60)}
            dHeight={windowHeight(2.5)}
            radius={windowWidth(2)}
          />
        </View>
      ))}
    </View>
  );

  return (
    <CustomModal
      isOpen={isOpen}
      setOpened={setOpened}
      isBlur
      blurTint="dark"
      blurIntensity={25}
    >
      <View style={styles.modalBox}>
        <Text style={styles.title}>Select Vendor</Text>

        {loading ? (
          renderSkeletonLoader()
        ) : (
          <FlatList
            data={vendors || []}
            keyExtractor={(item, index) => item?.id ?? index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: windowHeight(2) }}
            style={{
              maxHeight: windowHeight(30),
              width: "100%",
            }}
          />
        )}

        <Button
          width={windowWidth(50)}
          height={windowHeight(5)}
          title="Select"
          backgroundColor={color.primary}
          onPress={handleSelect}
          disabled={selectedIds.length === 0 || isSubmitting}
          titleStyle={{ fontSize: fontSizes.md }}
          isLoading={isSubmitting}
        />
      </View>
    </CustomModal>
  );
};

export default VendorSelectModal;

const styles = StyleSheet.create({
  modalBox: {
    width: windowWidth(85),
    backgroundColor: color.whiteColor,
    borderRadius: 16,
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(4),
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: color.appHeaderText,
    marginBottom: windowHeight(2),
  },
  animatedRow: {
    width: "100%",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: windowHeight(1.2),
    paddingHorizontal: windowWidth(2),
    borderRadius: windowHeight(1.2),
  },
  checkbox: {
    marginRight: windowWidth(3),
  },
  vendorName: {
    fontSize: fontSizes.md,
    color: color.appHeaderText,
  },
  skeletonContainer: {
    width: "100%",
    paddingVertical: windowHeight(1),
  },
  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(3),
    marginBottom: windowHeight(1.5),
    paddingHorizontal: windowWidth(2),
  },
});
