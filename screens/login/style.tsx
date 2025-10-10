import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: windowHeight(90),
    paddingHorizontal: windowWidth(8),
    justifyContent: "center",
  },
  headerText: {
    textAlign: "center",
    marginBottom: windowHeight(2),
    fontSize: fontSizes.xl,
    fontFamily: fonts.bold,
    color: color.titleText,
  },
  formContainer: { rowGap: 8 },
  forgotPassword: {
    textAlign: "right",
    color: color.primary,
    fontFamily: fonts.semiBold,
  },
  subTitle: {
    textAlign: "center",
    marginTop: 20,
    color: color.regularText,
    fontFamily: fonts.regular,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});

export default styles;
