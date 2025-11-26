// import { RootState } from "@/store/Store";
// import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
// import {
//   removeAddon,
//   setFinalPayable,
// } from "@/store/reducers/services/orderPaymentSlice";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import { MaterialIcons } from "@expo/vector-icons";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Divider } from "react-native-paper";
// import { useDispatch, useSelector } from "react-redux";
// import AddonSuggestionCard from "./VehicleCard";

// interface Props {
//   data: ServiceBooking["data"];
// }

// const ServiceDetails: React.FC<Props> = ({ data }) => {
//   const dispatch = useDispatch();
//   const selectedAddons = useSelector(
//     (state: RootState) => state.orderPayment.selectedAddons
//   );

//   const basePrice = Number(data?.booking?.variant?.actual_price || 0);
//   const finalPayable =
//     basePrice + selectedAddons.reduce((s, a) => s + a.price, 0);

//   React.useEffect(() => {
//     dispatch(setFinalPayable(finalPayable));
//   }, [finalPayable]);

//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>Package Summary</Text>

//       <View style={styles.row}>
//         <Text style={styles.label}>{data?.booking?.service?.name}</Text>
//         <Text style={styles.priceText}>₹{basePrice}</Text>
//       </View>

//       {selectedAddons.length > 0 && (
//         <View style={{ marginTop: 15 }}>
//           <Text style={styles.sectionHeading}>Added Add-ons</Text>
//           <Divider style={{ marginBottom: windowHeight(2) }} />

//           {selectedAddons.map((item) => (
//             <View key={item.id} style={styles.addedCard}>
//               <Text style={styles.addonName}>{item.name}</Text>

//               <View style={styles.addonRight}>
//                 <Text style={styles.priceText}>₹{item.price}</Text>

//                 <TouchableOpacity
//                   onPress={() => dispatch(removeAddon(item.id))}
//                   style={styles.iconBox}
//                   activeOpacity={0.6}
//                 >
//                   <MaterialIcons
//                     name="delete-outline"
//                     size={15}
//                     color="#ff4d4d"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </View>
//       )}

//       {/* <View style={styles.totalBlock}>
//         <Text style={styles.totalLabel}>Final Payable</Text>
//         <Text style={styles.totalPrice}>₹{finalPayable}</Text>
//       </View> */}

//       <AddonSuggestionCard suggestedAddons={data.suggestedAddons || []} />
//     </View>
//   );
// };

// export default ServiceDetails;
import { RootState } from "@/store/Store";
import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
import {
  addAddon,
  removeAddon,
  setFinalPayable,
} from "@/store/reducers/services/orderPaymentSlice";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddonSuggestionCard from "./VehicleCard";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";

interface Props {
  data: ServiceBooking["data"];
}

const ServiceDetails: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const selectedAddons = useSelector(
    (state: RootState) => state.orderPayment.selectedAddons
  );
  const addons = data.booking.addons;

  const basePrice = Number(data?.booking?.variant?.actual_price || 0);
  const finalPayable =
    basePrice + selectedAddons.reduce((s, a) => s + a.price, 0);

  // Load API addons initially only once
  React.useEffect(() => {
    if (!data?.booking?.addons) return;

    data.booking.addons.forEach((addon) => {
      // 🔥 Best possible actual_price extraction logic
      const price =
        Number(addon.actual_price) ||
        Number(addon.variant?.[0]?.actual_price) ||
        Number(
          addon.variant?.find((v: { vehicle_type: any }) => v.vehicle_type)
            ?.actual_price
        ) ||
        0;

      dispatch(addAddon({ id: addon.id, name: addon.addon_name, price }));
    });
  }, []);

  // Update price in redux every change
  React.useEffect(() => {
    dispatch(setFinalPayable(finalPayable));
  }, [finalPayable]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Package Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>{data?.booking?.service?.name}</Text>
        <Text style={styles.priceText}>₹{basePrice}</Text>
      </View>

      {/* 🟩 DISPLAY USER SELECTED ADDONS */}
      {selectedAddons.length > 0 && (
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionHeading}>Added Add-ons</Text>
          <Divider style={{ marginBottom: windowHeight(2) }} />

          {selectedAddons.map((item) => (
            <View key={item.id} style={styles.addedCard}>
              <Text style={styles.addonName}>{item.name}</Text>

              <View style={styles.addonRight}>
                <Text style={styles.priceText}>₹{item.price}</Text>

                <TouchableOpacity
                  onPress={() => dispatch(removeAddon(item.id))}
                  style={styles.iconBox}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={16}
                    color="#ff4d4d"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* 🟦 Suggest more addons */}
      <AddonSuggestionCard suggestedAddons={data.suggestedAddons || []} />
    </View>
  );
};
export default ServiceDetails;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: windowWidth(4),
    padding: windowWidth(4),
    margin: windowWidth(3),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 3,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    color: color.primary,
    marginBottom: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  sectionHeading: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    marginBottom: 10,
  },
  addedCard: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addonName: { fontFamily: fonts.medium, fontSize: fontSizes.xm },
  addonRight: {
    flexDirection: "row",
    gap: windowHeight(2),
    alignItems: "center",
  },
  priceText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    color: color.primary,
  },
  removeBtn: {
    color: "red",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  totalBlock: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  totalLabel: { fontFamily: fonts.bold, fontSize: fontSizes.md },
  totalPrice: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.xl,
    color: "#2e7d32",
  },
  label: { fontFamily: fonts.medium },
  iconBox: {
    width: windowWidth(8),
    height: windowHeight(3),
    borderRadius: windowWidth(2),
    borderWidth: 1,
    borderColor: "#ff4d4d",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.05)",
  },
});
