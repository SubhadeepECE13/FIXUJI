import { userStorage } from "@/store/Storage";
import Constants from "expo-constants";
import {
  DimensionValue,
  Dimensions,
  PixelRatio,
  Platform,
  StatusBar,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const STATUSBAR_HEIGHT = Constants.statusBarHeight;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const FULL_SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const NAVIGATION_TAB_HEIGHT =
  FULL_SCREEN_HEIGHT - SCREEN_HEIGHT - STATUSBAR_HEIGHT;

const insetTop = userStorage.getString("insets-top");
const insetBottom = userStorage.getString("insets-bottom");

export const IsIOS = Platform.OS === "ios";
export const IsIPAD = IsIOS && SCREEN_HEIGHT / SCREEN_WIDTH < 1.6;
export const IsAndroid = Platform.OS === "android";

export const IsHaveNotch = SCREEN_HEIGHT > 750;

export const Isiphone12promax = IsIOS && SCREEN_HEIGHT > 2778;

export const windowHeight = (height: DimensionValue): number => {
  if (!height) {
    return 0;
  }
  let tempHeight;
  if (IsIOS && insetTop && insetBottom) {
    tempHeight =
      (SCREEN_HEIGHT - Number(insetTop) - Number(insetBottom)) *
      (parseFloat(height.toString()) / 100);
  } else {
    if (NAVIGATION_TAB_HEIGHT > 0) {
      tempHeight = SCREEN_HEIGHT * (parseFloat(height.toString()) / 100);
    } else {
      tempHeight =
        (SCREEN_HEIGHT - STATUSBAR_HEIGHT * 2) *
        (parseFloat(height.toString()) / 100);
    }
  }

  return PixelRatio.roundToNearestPixel(tempHeight);
};

export const windowWidth = (width: DimensionValue): number => {
  if (!width) {
    return 0;
  }
  let tempWidth = SCREEN_WIDTH * (parseFloat(width.toString()) / 100);
  return PixelRatio.roundToNearestPixel(tempWidth);
};

export const fontSizes = {
  xxs: RFValue(7), // Extra-extra-small
  xs: RFValue(8), // Extra-small
  xsm: RFValue(9), // Smallest
  sm: RFValue(11), // Small
  xm: RFValue(10),
  rg: RFValue(12), // Regular
  smMd: RFValue(14), // Small Medium
  md: RFValue(15), // Medium
  lg: RFValue(17), // Large
  xl: RFValue(21), // Extra-large
  "2xl": RFValue(28), // 2x Extra-large
  "3xl": RFValue(32), // 3x Extra-large
};
