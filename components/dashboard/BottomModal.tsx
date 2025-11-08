import { setRoute } from "@/store/reducers/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  IsIOS,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

import {
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomModal = () => {
  const dispatch = useAppDispatch();
  const { dismissAll } = useBottomSheetModal();
  const insets = useSafeAreaInsets();

  const { area } = useAppSelector((state) => state.user);

  return (
    <>
      <BottomSheetView style={styles.modalHeader}>
        <Text style={styles.headerText}>Select Route</Text>
      </BottomSheetView>
      <BottomSheetScrollView
        style={styles.modalBody}
        contentContainerStyle={{
          paddingVertical: windowHeight(1.5),
          paddingBottom: IsIOS ? insets.bottom : windowHeight(1),
        }}
        showsVerticalScrollIndicator={false}
      >
        {area &&
          area.map((route: any, index: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dismissAll();
                  dispatch(setRoute(route));
                }}
                key={index}
                style={[
                  styles.item,
                  {
                    paddingTop: index === 0 ? 0 : windowHeight(1.5),
                    paddingBottom:
                      index === area.length - 1 ? 0 : windowHeight(1.5),
                    borderBottomWidth: index === area.length - 1 ? 0 : 1,
                  },
                ]}
              >
                <Text style={styles.itemText}>{route.name}</Text>
              </TouchableOpacity>
            );
          })}
      </BottomSheetScrollView>
    </>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  modalHeader: {
    width: "100%",
    paddingBottom: windowHeight(1.5),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: color.borderColor,
    borderStyle: IsIOS ? "solid" : "dashed",
  },
  headerText: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semiBold,
    color: color.titleText,
  },
  modalBody: {
    paddingHorizontal: windowWidth(5),
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: color.borderColor,
  },
  itemText: {
    fontSize: fontSizes.smMd,
    fontFamily: fonts.medium,
    color: color.placeholderText,
  },
});
