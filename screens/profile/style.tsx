import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: windowWidth(5),
    height: windowHeight(93),
  },
  box1: {
    marginTop: windowHeight(2),
    marginBottom: windowHeight(3),
  },
  box2: {},
});
export default styles;
