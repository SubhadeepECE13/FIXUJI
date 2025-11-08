import color from "@/themes/Colors.themes";
import {
  fontSizes,
  IsAndroid,
  IsIOS,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth(8),
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: IsAndroid
      ? Number(StatusBar.currentHeight) + windowHeight(8)
      : windowHeight(8),
    // borderWidth: 5,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: windowHeight(50),
  },
  headerText: {
    fontSize: fontSizes["3xl"],
    fontFamily: fonts.bold,
    color: color.titleText,
    marginBottom: IsAndroid ? windowHeight(-2) : 0,
  },
  subTitle: {
    color: color.regularText,
    fontFamily: fonts.bold,
    fontSize: fontSizes["3xl"],
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: windowHeight(50),
    // backgroundColor: "red",
    paddingTop: windowHeight(20),
    marginTop: IsIOS ? windowHeight(5) : 0,
  },
  bottomText: {
    color: color.placeholderText,
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    textAlign: "center",
    marginBottom: windowHeight(4),
  },
  middleImage: {
    width: windowWidth(100),
    height: windowHeight(100),
    alignSelf: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  imagecontainer: {
    alignSelf: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
});

export default styles;
