import { Href } from "expo-router";
import { ImageSourcePropType } from "react-native";

export type NavigationTabProps = {
  title: string;
  image: ImageSourcePropType;
  route: Href;
};

interface Dropdown {
  label: string;
  value: string;
}
