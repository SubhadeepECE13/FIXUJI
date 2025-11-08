// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import color from "@/themes/Colors.themes";
// import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
// import {
//   windowHeight,
//   windowWidth,
//   fontSizes,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import UpdateCarDetailsModal from "./UpdateCarDetailesModal";
// import Button from "../common/Button";
// import { useLocalSearchParams } from "expo-router";
// import CardHeader from "../common/CardHeader";

// interface Props {
//   data: ServiceBooking["data"];
// }

// const VehicleCard: React.FC<Props> = ({ data }) => {
//   const vehicle = data.vehicle;
//   const [isCarModalOpen, setCarModalOpen] = useState(false);

//   const { order_id } = useLocalSearchParams();
//   const orderId = Array.isArray(order_id) ? order_id[0] : order_id;
//   const details = [
//     { label: "Brand", value: vehicle?.brand || "N/A" },
//     { label: "Model", value: vehicle?.model || "N/A" },
//     { label: "Number", value: vehicle?.numberPlate || "N/A" },
//     { label: "Type", value: vehicle?.type || "N/A" },
//   ];

//   return (
//     <View style={styles.card}>
//       <CardHeader
//         title="Vehicle Details"
//         buttonTitle="Update"
//         onButtonPress={() => setCarModalOpen(true)}
//       />

//       <View style={styles.detailsContainer}>
//         {details.map((item, index) => (
//           <View key={index} style={styles.detailBox}>
//             <Text style={styles.label}>{item.label}</Text>
//             <Text style={styles.value}>{item.value}</Text>
//           </View>
//         ))}
//       </View>
//       <UpdateCarDetailsModal
//         isOpen={isCarModalOpen}
//         setOpened={setCarModalOpen}
//         orderId={orderId}
//         onSuccess={() => console.log("Car details updated!")}
//       />
//     </View>
//   );
// };

// export default VehicleCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: color.whiteColor,
//     borderRadius: windowWidth(4),
//     padding: windowWidth(4),
//     marginHorizontal: windowWidth(3),
//     marginVertical: windowHeight(1),
//   },
//   detailsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   detailBox: {
//     width: windowWidth(41),
//     backgroundColor: color.lightBackground,
//     borderRadius: windowWidth(2),
//     paddingVertical: windowHeight(0.8),
//     paddingHorizontal: windowWidth(2.5),
//     marginBottom: windowHeight(1),
//     borderWidth: 1,
//     borderColor: color.borderBottomColor,
//   },
//   label: {
//     fontSize: fontSizes.sm,
//     fontFamily: fonts.semiBold,
//     color: color.primary,
//     marginBottom: windowHeight(0.2),
//   },
//   value: {
//     fontSize: fontSizes.sm,
//     color: color.regularText,
//     fontFamily: fonts.medium,
//   },
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import color from "@/themes/Colors.themes";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { useRouter } from "expo-router";
import { CustomIcon } from "../common/Icon";

interface Addon {
  id: string;
  name: string;
  price: number;
  commission: string;
  description?: string;
}

interface Props {
  addons: Addon[];
}

const AddonSuggestionCard: React.FC<Props> = ({ addons }) => {
  const router = useRouter();

  const handleAddonPress = (addon: Addon) => {
    router.push({
      pathname: "/packageConvert/[order_id]",
      params: { addonId: addon.id } as any,
    });
  };

  const renderAddon = ({ item }: { item: Addon }) => (
    <TouchableOpacity
      style={styles.addonRow}
      onPress={() => handleAddonPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <CustomIcon
          type="MaterialIcons"
          name="design-services"
          color={color.primary}
          size={22}
        />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.addonName}>{item.name}</Text>
        {/* <Text style={styles.addonDescription}>
          {item.description || "Boost your service with this add-on"}
        </Text> */}
        <Text style={styles.commissionText}>
          commission:{" "}
          <Text style={styles.commissionValue}>{item.commission}</Text>
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>₹{item.price}</Text>
        {/* <Text style={styles.commissionText}>
          commission:{" "}
          <Text style={styles.commissionValue}>{item.commission}</Text>
        </Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{"Suggested Add-ons"}</Text>

      <FlatList
        data={addons}
        keyExtractor={(item) => item.id}
        renderItem={renderAddon}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={{
          paddingVertical: windowHeight(0.5),
          marginTop: windowHeight(0.1),
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AddonSuggestionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.whiteColor,
    borderRadius: windowWidth(3),
    padding: windowWidth(4),
    marginHorizontal: windowWidth(3),
    marginVertical: windowHeight(1.5),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(0.3),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: windowHeight(1.2),
  },
  addonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: windowHeight(1),
  },

  iconWrapper: {
    width: windowWidth(10),
    height: windowWidth(10),
    borderRadius: windowWidth(5),
    backgroundColor: color.lightBackground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: windowWidth(3),
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },

  textWrapper: {
    flex: 1,
  },

  addonName: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.appHeaderText,
  },

  addonDescription: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.regular,
    color: color.regularText,
    marginTop: windowHeight(0.3),
  },

  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  price: {
    fontSize: fontSizes.sm,
    color: color.primary,
  },

  commissionText: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.medium,
    color: color.primary,
    marginTop: windowHeight(0.3),
  },

  commissionValue: {
    fontFamily: fonts.semiBold,
    color: color.green,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: windowHeight(0.6),
  },
});
