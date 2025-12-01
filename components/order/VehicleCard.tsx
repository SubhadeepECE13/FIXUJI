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
  actual_price?: number;
}

interface Props {
  suggestedAddons: Addons[];
  orderId: string;
}

const AddonSuggestionCard: React.FC<Props> = ({ suggestedAddons, orderId }) => {
  const dispatch = useDispatch();

  const selected = useSelector(
    (state: RootState) => state.orderPayment.selectedAddons[orderId] || []
  );

  const isAdded = (id: string) => selected.some((i) => i.id === id);

  return (
    <View style={styles.container}>
      {suggestedAddons.length > 0 && (
        <>
          <Text style={styles.heading}>Recommended Add-ons</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={suggestedAddons}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View style={{ width: windowWidth(4) }} />
            )}
            renderItem={({ item }) => {
              const price = item.actual_price;

              return (
                <View style={styles.card}>
                  {item.addon_img && (
                    <Image
                      source={{ uri: item.addon_img }}
                      style={styles.image}
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
                          ? dispatch(removeAddon({ orderId, addonId: item.id }))
                          : dispatch(
                              addAddon({
                                orderId,
                                addon: {
                                  id: String(item.id),
                                  name: item.addon_name,
                                  price: item.actual_price ?? 0,
                                },
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
        </>
      )}
    </View>
  );
};

export default AddonSuggestionCard;

const styles = StyleSheet.create({
  container: { marginTop: windowHeight(2), paddingHorizontal: windowWidth(1) },
  heading: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    color: color.primary,
    marginBottom: windowHeight(1),
  },
  card: {
    width: windowWidth(55),
    backgroundColor: "#fff",
    padding: windowWidth(2.2),
    borderRadius: windowHeight(2),
  },
  image: {
    width: "100%",
    height: windowHeight(12),
    borderRadius: 8,
    marginBottom: 6,
  },
  name: { fontFamily: fonts.bold, fontSize: fontSizes.rg, color: "#222" },
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
    marginTop: 10,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    color: color.primary,
  },
  button: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  btnText: { color: "white", fontFamily: fonts.bold, fontSize: fontSizes.xs },
});
