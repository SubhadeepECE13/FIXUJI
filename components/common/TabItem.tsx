import { memo, useCallback, useEffect } from "react";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  interpolateColor,
  LayoutAnimationConfig,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { TabItem } from "./AnimatedTabs";
import { CustomIcon } from "./Icon";
import { windowWidth } from "@/themes/Constants.themes";

type TabItemProps = {
  item: TabItem;
  index: number;
  isActive: boolean;
  onChange: (index: number) => void;
  activeColor: string;
  inactiveColor: string;
  activeBackgroundColor: string;
  inactiveBackgroundColor: string;
  activeBorderColor: string;
  inactiveBorderColor: string;
  tabStyle: ViewStyle;
  iconStyle: ViewStyle | TextStyle;
  iconSize?: number;
};

const TabItemComponent = memo(
  ({
    item,
    index,
    isActive,
    onChange,
    activeColor,
    inactiveColor,
    activeBackgroundColor,
    inactiveBackgroundColor,
    activeBorderColor,
    inactiveBorderColor,
    tabStyle,
    iconStyle,
    iconSize,
  }: TabItemProps) => {
    const handlePress = useCallback(() => {
      onChange(index);
    }, [index, onChange]);

    const progress = useSharedValue(isActive ? 1 : 0);

    useEffect(() => {
      progress.value = withDelay(
        50,
        withTiming(isActive ? 1 : 0, { duration: 300 })
      );
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        progress.value,
        [0, 1],
        [inactiveBackgroundColor, activeBackgroundColor]
      );
      const borderColor = interpolateColor(
        progress.value,
        [0, 1],
        [inactiveBorderColor, activeBorderColor]
      );

      return {
        backgroundColor,
        borderColor,
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
      };
    });

    return (
      <Animated.View
        style={[animatedStyle, tabStyle]}
        key={index}
        layout={LinearTransition.springify().damping(80).stiffness(200)}
      >
        <Pressable onPress={handlePress} style={[styles.tab]}>
          <CustomIcon
            type={item.iconType}
            name={item.iconName}
            size={iconSize}
            color={isActive ? activeColor : inactiveColor}
            style={iconStyle}
          />
          <LayoutAnimationConfig skipEntering>
            {isActive ? (
              <Animated.Text
                entering={FadeInRight.springify().damping(80).stiffness(200)}
                exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                style={[
                  {
                    color: isActive ? activeColor : inactiveColor,
                  },
                ]}
              >
                {item.label}
              </Animated.Text>
            ) : null}
          </LayoutAnimationConfig>
        </Pressable>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  tab: {
    justifyContent: "center",
    alignItems: "center",
    padding: windowWidth(1) + 3,
    gap: windowWidth(1),
    flexDirection: "row",
  },
});

export default TabItemComponent;
