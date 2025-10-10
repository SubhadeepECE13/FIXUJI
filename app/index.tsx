import { tokenStorage } from "@/store/Storage";
import { Redirect } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

interface DecodedToken {
  exp: number;
}

export default function Index() {
  const [isLoading, setisLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const tokenCheck = async () => {
      try {
        const access_token = tokenStorage.getString(
          "app_access_token"
        ) as string;

        if (access_token && isMounted) {
          const decodedAccessToken = jwtDecode<DecodedToken>(access_token);

          const currentTime = Date.now() / 1000;
          if (decodedAccessToken?.exp < currentTime) {
            setIsLoggedIn(false);
          }
          setIsLoggedIn(true);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Access token expired ",
        });
        setIsLoggedIn(false);
      } finally {
        if (isMounted) {
          setisLoading(false);
        }
      }
    };

    tokenCheck();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return null;
  }
  console.log(isLoggedIn);

  return (
    <Redirect
      href={isLoggedIn ? "/(routes)/dashboard" : "/(routes)/onBoarding"}
    />
  );
}
