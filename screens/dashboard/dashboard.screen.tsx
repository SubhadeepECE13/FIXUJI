import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { commonStyles } from "@/styles/common.style";
import Header from "@/components/common/Header";
import { RefreshControl } from "react-native-gesture-handler";
import color from "@/themes/Colors.themes";
import { DashBoardNavigationTab } from "@/configs/constants";
import styles from "./style";
import NavigationTab from "@/components/dashboard/NavigationTab";
import { getUserData } from "@/store/actions/users/userAction";
import { RootState } from "@/store/Store";
import { getSettings } from "@/store/actions/settings/settingsActions";

const DashboardScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: RootState) => state.settings.data);
  const { user } = useAppSelector((state) => state.user);
  const fetchUser = async () => {
    try {
      await dispatch(getUserData());
    } catch (error) {
      console.log("error fetching user data");
    }
  };

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      fetchUser();
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchUser(), dispatch(getSettings())]);
    setRefreshing(false);
  };
  console.log("settingsResponse:", settings);

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header
        isBack={false}
        isRightIcon={true}
        isLeftIcon={true}
        title="Dashboard"
        rightIconName="user"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.primary]}
            progressBackgroundColor={color.whiteColor}
          />
        }
      >
        <View style={[styles.container]}>
          <View style={styles.tabContainer}>
            {DashBoardNavigationTab.map((tab) => {
              return (
                <NavigationTab
                  key={tab.title}
                  image={tab.image}
                  route={tab.route}
                  title={tab.title}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import React, { useEffect, useState } from "react";
// import { Image, ScrollView, Text, View } from "react-native";
// import { RefreshControl } from "react-native-gesture-handler";

// import { commonStyles } from "@/styles/common.style";
// import Header from "@/components/common/Header";
// import color from "@/themes/Colors.themes";
// import { DashBoardNavigationTab } from "@/configs/constants";
// import styles from "./style";
// import NavigationTab from "@/components/dashboard/NavigationTab";
// import { getUserData } from "@/store/actions/users/userAction";
// import { RootState } from "@/store/Store";
// import { getSettings } from "@/store/actions/settings/settingsActions";
// import AppVersion from "@/app/(routes)/update";

// const DashboardScreen = () => {
//   const [refreshing, setRefreshing] = useState(false);
//   const [appVersion] = useState("1.0.15");

//   const dispatch = useAppDispatch();
//   const settings = useAppSelector((state: RootState) => state.settings.data);
//   const { user } = useAppSelector((state) => state.user);

//   const fetchUser = async () => {
//     try {
//       await dispatch(getUserData());
//     } catch (error) {
//       console.log("error fetching user data");
//     }
//   };

//   useEffect(() => {
//     dispatch(getSettings());
//   }, [dispatch]);

//   useEffect(() => {
//     if (user === null) {
//       fetchUser();
//     }
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await Promise.all([fetchUser(), dispatch(getSettings())]);
//     setRefreshing(false);
//   };

//   console.log("settingsResponse:", settings);

//   const isLatestVersion = settings?.version && settings.version === appVersion;

//   if (settings && !isLatestVersion) {
//     return <AppVersion appLink={settings.appLink} />;
//   }

//   return (
//     <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
//       <Header
//         isBack={false}
//         isRightIcon={true}
//         isLeftIcon={true}
//         title="Dashboard"
//         rightIconName="user"
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[color.primary]}
//             progressBackgroundColor={color.whiteColor}
//           />
//         }
//       >
//         <View style={[styles.container]}>
//           <View style={styles.tabContainer}>
//             {DashBoardNavigationTab.map((tab) => (
//               <NavigationTab
//                 key={tab.title}
//                 image={tab.image}
//                 route={tab.route}
//                 title={tab.title}
//               />
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default DashboardScreen;
