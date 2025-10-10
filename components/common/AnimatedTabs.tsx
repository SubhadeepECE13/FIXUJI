import React, { memo } from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { IconPropsMap } from "./Icon";
import TabItemComponent from "./TabItem";
import { windowWidth } from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";

export type TabItem = {
  [K in keyof IconPropsMap]: {
    iconType: K;
    iconName: IconPropsMap[K];
    label: string;
    filterText: string;
    status: string;
    operand: string;
  };
}[keyof IconPropsMap];

type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  inactiveBorderColor?: string;
  activeBorderColor?: string;
  style?: ViewStyle | ViewStyle[];
  tabStyle?: ViewStyle;
  iconStyle?: ViewStyle | TextStyle;
  iconSize?: number;
};

const AnimatedTabs = ({
  data,
  selectedIndex,
  onChange,
  activeColor = color.primary,
  inactiveColor = color.borderColor,
  activeBackgroundColor = color.bgGray,
  inactiveBackgroundColor = color.whiteColor,
  activeBorderColor = color.primary,
  inactiveBorderColor = color.borderColor,
  tabStyle,
  style,
  iconStyle,
  iconSize = 20,
}: TabsProps) => {
  return (
    <View style={[styles.tabContainer, style]}>
      {data.map((item, index) => {
        const isActive = selectedIndex === index;
        return (
          <TabItemComponent
            key={index}
            item={item}
            index={index}
            isActive={isActive}
            onChange={onChange}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            activeBackgroundColor={activeBackgroundColor}
            inactiveBackgroundColor={inactiveBackgroundColor}
            activeBorderColor={activeBorderColor}
            inactiveBorderColor={inactiveBorderColor}
            tabStyle={tabStyle ? tabStyle : {}}
            iconStyle={iconStyle ? iconStyle : {}}
            iconSize={iconSize}
          />
        );
      })}
    </View>
  );
};

export default memo(AnimatedTabs);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    gap: windowWidth(2),
  },
});
