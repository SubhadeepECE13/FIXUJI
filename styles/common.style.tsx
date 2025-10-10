import color from "@/themes/Colors.themes";
import { fontSizes } from "@/themes/Constants.themes";
import { windowHeight } from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  regularText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
    color: color.regularText,
  },
  regularTextBigBlack: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.xl,
    color: color.titleText,
    // fontWeight: "500",
  },
  mediumTextBlack: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.lg,
    color: color.regularText,
    // fontWeight: "500",
  },
  extraBold: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.lg,
    color: "white",
    // fontWeight: "500",
  },
  mediumTextBlack12: {
    // fontWeight: "400",
    fontFamily: fonts.medium,
    fontSize: fontSizes.lg,
    color: color.regularText,
  },
  mediumText23: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
    color: color.regularText,
    // fontWeight: "500",
  },
  flexContainer: {
    flex: 1,
  },
  flexEndContainer: {
    backgroundColor: color.whiteColor,
  },
  shadowContainer: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  deepShadowContainer: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.0,
    elevation: 1.5,
  },
  whiteContainer: {
    backgroundColor: color.whiteColor,
  },
  grayContainer: {
    backgroundColor: color.bgGray,
  },
  footerContainer: {
    height: windowHeight(10),
    justifyContent: "center",
  },
});
export { commonStyles };
