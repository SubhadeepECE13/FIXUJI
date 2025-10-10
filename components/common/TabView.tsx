import { commonStyles } from "@/styles/common.style";

import { resetAndNavigate } from "@/utils/Helpers";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  DimensionValue,
  LayoutChangeEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedTabs, { TabItem } from "./AnimatedTabs";

import CustomSkeletonLoader from "./CustomSkeletonLoader";

import { IconSetKeys } from "./Icon";
import { SearchBarProps } from "react-native-screens";
import Header, { HeaderProps } from "./Header";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import CustomFlatList from "./CustomFlatList";
import ListEmpty from "./ListEmpty";

interface TabViewProps<T extends IconSetKeys> {
  headerProps: HeaderProps;
  loader: boolean;
  selectedIndex: number;
  handleTabChange: (index: number) => void;
  tabItems: TabItem[];
  skeletonDHeight: DimensionValue;
  skeletonBorderRadius?: number;
  skeletonLength: number;
  items: any[] | null;
  renderItem: (item: any) => React.ReactElement<any>;
  onRefresh: () => Promise<void>;
  refresh: boolean;
  footerComponent?: React.ReactElement;
  fetchMoreData: () => void;
  isListEnd: boolean;
}

const TabView = <T extends IconSetKeys>({
  headerProps,
  loader,
  selectedIndex,
  handleTabChange,
  tabItems,
  skeletonDHeight,
  skeletonLength,
  skeletonBorderRadius = 25,
  items,
  renderItem,
  onRefresh,
  refresh,
  footerComponent,
  fetchMoreData,
  isListEnd,
}: TabViewProps<T>) => {
  const [footerHeight, setFooterHeight] = useState(0);

  const renderLoader = useCallback(({ index }: { index: number }) => {
    // return (
    //   <CustomSkeletonLoader
    //     key={index}
    //     dWidth={"100%"}
    //     dHeight={skeletonDHeight}
    //     radius={skeletonBorderRadius}
    //   />
    // );
  }, []);
  const renderListFooter = useCallback(() => {
    if (items === null || items.length === 0) {
      return null;
    }
    return (
      <View style={styles.listFooter}>
        {isListEnd ? (
          <Text style={styles.listFooterText}>No more data at the moment</Text>
        ) : (
          <ActivityIndicator size="large" color={color.primary} />
        )}
      </View>
    );
  }, [isListEnd, items]);

  const onLayoutFooterElement = (e: LayoutChangeEvent): void => {
    setFooterHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header {...headerProps} />
      <View style={[styles.container]}>
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={[
            styles.itemlistContainer,
            {
              paddingBottom: windowHeight(1.5) + footerHeight,
            },
          ]}
          data={
            loader
              ? Array.from({ length: skeletonLength }, () => 0)
              : items || []
          }
          renderItem={loader ? renderLoader : renderItem}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={
            <ListEmpty
              onPress={() => {
                resetAndNavigate("/dashboard");
              }}
              btnTitle="Go to Dashboard"
              title="No Data Found"
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={[color.primary]}
              progressBackgroundColor={color.whiteColor}
            />
          }
          //   HeaderComponent={<Searchbar {...searchBarProps} />}
          StickyElementComponent={
            <AnimatedTabs
              data={tabItems}
              selectedIndex={selectedIndex}
              onChange={handleTabChange}
              style={[commonStyles.grayContainer, styles.tabsContainer]}
            />
          }
          TopListElementComponent={<></>}
          onEndReached={fetchMoreData}
          ListFooterComponent={renderListFooter}
        />
      </View>
      <View style={styles.footer} onLayout={onLayoutFooterElement}>
        {footerComponent}
      </View>
    </View>
  );
};

export default TabView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: windowWidth(5),
    height: windowHeight(93),
  },
  tabsContainer: {
    paddingVertical: windowHeight(1),
  },
  separator: {
    height: windowHeight(1),
  },
  itemlistContainer: {
    paddingHorizontal: windowWidth(0.1),
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  listFooter: {
    paddingTop: windowHeight(1.5),
    justifyContent: "center",
    alignItems: "center",
  },
  listFooterText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.rg,
    color: color.placeholderText,
  },
});
