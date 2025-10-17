import { tokenStorage } from "@/store/Storage";
import { Redirect } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import AppVersion from "./(routes)/update";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { getSettings } from "@/store/actions/settings/settingsActions";
import { RootState } from "@/store/Store";

interface DecodedToken {
  exp: number;
}

export default function Index() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: RootState) => state.settings.data);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appVersion = "1.0.15";

  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(getSettings());

        const access_token = tokenStorage.getString("app_access_token");
        if (access_token) {
          const decodedAccessToken = jwtDecode<DecodedToken>(access_token);
          const currentTime = Date.now() / 1000;
          setIsLoggedIn(decodedAccessToken?.exp > currentTime);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [dispatch]);

  if (!settings) {
    return null;
  }

  const isLatestVersion = settings.version === appVersion;
  if (!isLatestVersion) {
    return <AppVersion appLink={settings.appLink} />;
  }

  if (isLoading) return null;

  return (
    <Redirect
      href={isLoggedIn ? "/(routes)/dashboard" : "/(routes)/onBoarding"}
    />
  );
}
