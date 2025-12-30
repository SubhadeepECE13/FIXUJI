import "@/tasks/eta.tasks";
import "@/utils/translator/liveTranslator";
import "@/utils/translator/patchText";
import NoInternet from "@/components/common/NoInternet";
import NoPermission from "@/components/common/NoPermissions";

import { CustomToastConfig } from "@/components/common/Toast";
import usePermissions from "@/hooks/usePermissions";

import { setError as setUserError } from "@/store/reducers/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";

import { userStorage } from "@/store/Storage";

import { persistor, store } from "@/store/Store";
import color from "@/themes/Colors.themes";
import { IsIOS, windowHeight } from "@/themes/Constants.themes";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as Notifications from "expo-notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    // LogBox.ignoreAllLogs(true);
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  const {
    error: userError,
    isCameraPermission,
    isLoactionPermission,
  } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const { resetCallCount } = usePermissions();

  useEffect(() => {
    if (userError) {
      Toast.show({
        type: "error",
        text1: userError,
      });
      dispatch(setUserError(null));
    }
  }, [userError]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const insetTop = userStorage.getString("insets-top");
    const insetBottom = userStorage.getString("insets-bottom");

    if (!insetTop && !insetBottom && insets) {
      userStorage.set("insets-top", insets?.top?.toString());
      userStorage.set("insets-bottom", insets?.bottom?.toString());
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StatusBar
          style="light"
          backgroundColor={color.primary}
          translucent={false}
        />
        {IsIOS && (
          <View
            style={{ height: insets.top, backgroundColor: color.primary }}
          />
        )}
        <Stack screenOptions={{ headerShown: false }}></Stack>
        <Toast
          config={CustomToastConfig}
          visibilityTime={3000}
          autoHide
          position="bottom"
          keyboardOffset={10}
          bottomOffset={
            isCameraPermission !== "granted" ||
            isLoactionPermission !== "granted"
              ? windowHeight(8)
              : IsIOS
                ? windowHeight(5)
                : 10
          }
        />
        <NoPermission resetPermissionCallCount={resetCallCount} />
        <NoInternet />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
