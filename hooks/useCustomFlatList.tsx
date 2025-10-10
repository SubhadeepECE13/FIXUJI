import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from "react-native";

type ICustomFlatListStyles = {
  header: StyleProp<ViewStyle>;
  stickyElement: StyleProp<ViewStyle>;
  topElement?: StyleProp<ViewStyle>;
};

type TUseCustomFlatListHook = [
  Animated.Value,
  ICustomFlatListStyles,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
];

const window = Dimensions.get("window");

export const useCustomFlatListHook = (): TUseCustomFlatListHook => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [topHeight, setTopHeight] = useState(0);

  const styles: ICustomFlatListStyles = {
    header: {
      marginBottom: stickyHeight + topHeight, // <-- In order for the list to be under other elements
    },
    stickyElement: {
      left: 0,
      marginTop: headerHeight, // <-- In order for the list to be under Header
      position: "absolute",
      right: 0,
      transform: [
        {
          translateY: scrollY.interpolate({
            // <-- To move an element according to the scroll position
            extrapolate: "clamp",
            inputRange: [-window.height, headerHeight],
            outputRange: [window.height, -headerHeight],
          }),
        },
      ],
      zIndex: 2,
    },
    topElement: {
      left: 0,
      marginTop: headerHeight + stickyHeight, // <-- In order for the list to be under other elements
      position: "absolute",
      right: 0,
      transform: [
        {
          translateY: scrollY.interpolate({
            // <-- To move an element according to the scroll position
            extrapolate: "clamp",
            inputRange: [
              -window.height,
              headerHeight + stickyHeight + topHeight,
            ],
            outputRange: [
              window.height,
              -(headerHeight + stickyHeight + topHeight),
            ],
          }),
        },
      ],
      zIndex: 1,
    },
  };

  const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  const onLayoutTopListElement = (event: LayoutChangeEvent): void => {
    setTopHeight(event.nativeEvent.layout.height);
  };

  const onLayoutTopStickyElement = (event: LayoutChangeEvent): void => {
    setStickyHeight(event.nativeEvent.layout.height);
  };

  return [
    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutTopStickyElement,
  ];
};
