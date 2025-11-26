// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import color from "@/themes/Colors.themes";
// import {
//   windowHeight,
//   windowWidth,
//   fontSizes,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import { useRouter } from "expo-router";
// import { CustomIcon } from "../common/Icon";

// interface Addons {
//   id: string;
//   name: string;
//   price: number;
//   commission?: number;
//   description?: string;
// }

// interface Props {
//   suggestedAddons: Addons[];
// }

// const AddonSuggestionCard: React.FC<Props> = ({ suggestedAddons }) => {
//   const router = useRouter();

//   const handleAddonPress = (addon: Addons) => {
//     router.push({
//       pathname: "/packageConvert/[order_id]",
//       params: { addonId: addon.id } as any,
//     });
//   };

//   const renderAddon = ({ item }: { item: Addons }) => (
//     <TouchableOpacity
//       style={styles.addonRow}
//       onPress={() => handleAddonPress(item)}
//       activeOpacity={0.8}
//     >
//       <View style={styles.iconWrapper}>
//         <CustomIcon
//           type="MaterialIcons"
//           name="add-shopping-cart"
//           color={color.primary}
//           size={22}
//         />
//       </View>

//       <View style={styles.textWrapper}>
//         <Text style={styles.addonName}>{item.name}</Text>
//         {/* <Text style={styles.addonDescription}>
//           {item.description || "Boost your service with this add-on"}
//         </Text> */}
//         <Text style={styles.commissionText}>
//           {/* commission:{" "} */}
//           <Text style={styles.commissionValue}>{item.commission}</Text>
//         </Text>
//       </View>

//       <View style={styles.rightSection}>
//         <Text style={styles.price}>₹{item.price}</Text>
//         {/* <Text style={styles.commissionText}>
//           commission:{" "}
//           <Text style={styles.commissionValue}>{item.commission}</Text>
//         </Text> */}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>{"Suggested Add-ons"}</Text>

//       <FlatList
//         data={suggestedAddons}
//         keyExtractor={(item) => item.id}
//         renderItem={renderAddon}
//         scrollEnabled={false}
//         ItemSeparatorComponent={() => <View style={styles.divider} />}
//         contentContainerStyle={{
//           paddingVertical: windowHeight(0.5),
//           marginTop: windowHeight(0.1),
//         }}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default AddonSuggestionCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: color.whiteColor,
//     padding: windowWidth(2),
//     marginTop: windowHeight(3),
//   },
//   title: {
//     fontSize: fontSizes.md,
//     fontFamily: fonts.bold,
//     color: color.primary,
//     marginBottom: windowHeight(0.3),
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     paddingBottom: windowHeight(1.2),
//   },
//   addonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: windowHeight(1),
//   },

//   iconWrapper: {
//     width: windowWidth(10),
//     height: windowWidth(10),
//     borderRadius: windowWidth(5),
//     backgroundColor: color.lightBackground,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: windowWidth(3),
//     borderWidth: 1,
//     borderColor: "#e6e6e6",
//   },

//   textWrapper: {
//     flex: 1,
//   },

//   addonName: {
//     fontSize: fontSizes.sm,
//     fontFamily: fonts.semiBold,
//     color: color.appHeaderText,
//   },

//   addonDescription: {
//     fontSize: fontSizes.xs,
//     fontFamily: fonts.regular,
//     color: color.regularText,
//     marginTop: windowHeight(0.3),
//   },

//   rightSection: {
//     alignItems: "flex-end",
//     justifyContent: "center",
//   },

//   price: {
//     fontSize: fontSizes.sm,
//     color: color.primary,
//   },

//   commissionText: {
//     fontSize: fontSizes.xs,
//     fontFamily: fonts.medium,
//     color: color.primary,
//     marginTop: windowHeight(0.3),
//   },

//   commissionValue: {
//     fontFamily: fonts.semiBold,
//     color: color.green,
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "#eee",
//     marginVertical: windowHeight(0.6),
//   },
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  windowWidth,
  windowHeight,
  fontSizes,
} from "@/themes/Constants.themes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import {
  addAddon,
  removeAddon,
} from "@/store/reducers/services/orderPaymentSlice";

interface Addons {
  id: string;
  addon_name: string;
  addon_desc?: string;
  addon_img?: string;
  variant: { actual_price: number }[];
}

interface Props {
  suggestedAddons: Addons[];
}

const AddonSuggestionCard: React.FC<Props> = ({ suggestedAddons }) => {
  const dispatch = useDispatch();
  const selected = useSelector((s: RootState) => s.orderPayment.selectedAddons);

  const isAdded = (id: string) => selected.some((i) => i.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recommended Add-ons </Text>

      <FlatList
        data={suggestedAddons}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        ItemSeparatorComponent={() => (
          <View style={{ width: windowWidth(4) }} />
        )}
        renderItem={({ item }) => {
          const price = item.variant?.[0]?.actual_price || 0;

          return (
            <View style={styles.card}>
              {item.addon_img && (
                <Image
                  source={{ uri: item.addon_img }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}

              <Text style={styles.name}>{item.addon_name}</Text>
              <Text numberOfLines={2} style={styles.desc}>
                {item.addon_desc}
              </Text>

              <View style={styles.bottomRow}>
                <Text style={styles.price}>₹{price}</Text>

                <TouchableOpacity
                  onPress={() =>
                    isAdded(item.id)
                      ? dispatch(removeAddon(item.id))
                      : dispatch(
                          addAddon({
                            id: item.id,
                            name: item.addon_name,
                            price,
                          })
                        )
                  }
                  style={[
                    styles.button,
                    {
                      backgroundColor: isAdded(item.id)
                        ? "#ff4d4d"
                        : color.primary,
                    },
                  ]}
                >
                  <Text style={styles.btnText}>
                    {isAdded(item.id) ? "Remove" : "Add"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AddonSuggestionCard;

const styles = StyleSheet.create({
  container: {
    marginTop: windowHeight(3),
    paddingHorizontal: windowWidth(3),
  },
  heading: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.lg,
    color: color.primary,
    marginBottom: windowHeight(2),
  },

  card: {
    width: windowWidth(55),
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: windowHeight(12),
    borderRadius: 8,
    marginBottom: 8,
  },

  name: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.rg,
    color: "#222",
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.xs,
    color: "#777",
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    color: color.primary,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    fontFamily: fonts.bold,
    fontSize: fontSizes.xs,
  },
});
