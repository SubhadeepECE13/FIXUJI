import { CustomIcon } from "@/components/common/Icon";
import { IVR_NUMBER } from "@/configs/constants";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import color from "@/themes/Colors.themes";
import { checkPermissions } from "@/utils/Permissions.utils";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { IUser } from "../users/users.types";
import { buildCallLockPayload, lockCall } from "./OrderAction";
import { SettingsResponse } from "../settings/settings.types";

type Props = {
  phone: string;
  geolocation: string | null;
  containerStyle?: any;
  order: Order;
  user: IUser;
  navigateAddressLink: string | null;
  settings: SettingsResponse;
  iconStyle?: any;
};

const ContactActions: React.FC<Props> = ({
  phone,
  geolocation,
  order,
  user,
  navigateAddressLink,
  settings,
  containerStyle = {},
  iconStyle = {},
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const dispatch = useAppDispatch();
  const { isLoactionPermission } = useAppSelector((state) => state.user);

  const [callLoading, setCallLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, [isLoactionPermission]);

  const getCurrentLocation = async () => {
    try {
      await checkPermissions(dispatch);

      if (isLoactionPermission !== "granted") {
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Unable to retrieve your location.",
      });
    }
  };

  const openDialer = useCallback(async () => {
    console.log("Dialer button clicked, about to call lockCall API");
    try {
      setCallLoading(true);
      const payload = buildCallLockPayload(order, user);
      const result = await dispatch(lockCall(payload));

      if (!result || !result.success) {
        console.log("lockCall API failed or returned invalid response", result);
        Toast.show({
          type: "error",
          text1: "Call lock failed",
        });
        return;
      }

      console.log("lockCall API succeeded, opening dialer now.");
      const staticNumber = settings.callMaskingNumber;
      const phoneURL =
        Platform.OS === "android"
          ? `tel:${staticNumber}`
          : `telprompt:${staticNumber}`;

      await Linking.openURL(phoneURL);
    } catch (error) {
      console.error("Error during dialer flow", error);
      Toast.show({
        type: "error",
        text1: "Failed to open the dialer",
      });
    } finally {
      setCallLoading(false);
    }
  }, [setCallLoading]);

  // const openGoogleMaps = useCallback(async () => {
  //   if (!currentLocation) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Current location not available.",
  //     });
  //     return;
  //   }

  //   if (!geolocation) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Geolocation not available for this customer.",
  //     });
  //     return;
  //   }

  //   setMapLoading(true);

  //   const { latitude: currentLat, longitude: currentLng } = currentLocation;
  //   const [destLat, destLng] = geolocation.split(",");

  //   let url = "";

  //   try {
  //     if (Platform.OS === "ios") {
  //       // Apple Maps
  //       url = `http://maps.apple.com/?saddr=${currentLat},${currentLng}&daddr=${destLat},${destLng}&dirflg=d`;

  //       // Prefer Google Maps if available
  //       const googleMapsURL = `comgooglemaps://?saddr=${currentLat},${currentLng}&daddr=${destLat},${destLng}&directionsmode=driving`;
  //       const canOpenGoogleMaps = await Linking.canOpenURL(googleMapsURL);

  //       if (canOpenGoogleMaps) {
  //         url = googleMapsURL;
  //       }
  //     } else {
  //       // Android - Google Maps
  //       url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${destLat},${destLng}&travelmode=driving`;
  //     }

  //     const supported = await Linking.canOpenURL(url);

  //     if (!supported) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Maps application is not available.",
  //       });
  //       return;
  //     }

  //     await Linking.openURL(url);
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Failed to open the map.",
  //     });
  //   } finally {
  //     setMapLoading(false);
  //   }
  // }, [setMapLoading]);

  const openGoogleMaps = useCallback(async () => {
    if (navigateAddressLink) {
      try {
        const supported = await Linking.canOpenURL(navigateAddressLink);
        if (supported) {
          await Linking.openURL(navigateAddressLink);
          return;
        } else {
          Toast.show({
            type: "error",
            text1: "Cannot open map link.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to open the map link.",
        });
        return;
      }
    }

    if (!currentLocation) {
      Toast.show({
        type: "error",
        text1: "Current location not available.",
      });
      return;
    }

    if (!geolocation) {
      Toast.show({
        type: "error",
        text1: "Geolocation not available for this customer.",
      });
      return;
    }

    setMapLoading(true);

    const { latitude: currentLat, longitude: currentLng } = currentLocation;
    const [destLat, destLng] = geolocation.split(",");

    let url = "";

    try {
      if (Platform.OS === "ios") {
        url = `http://maps.apple.com/?saddr=${currentLat},${currentLng}&daddr=${destLat},${destLng}&dirflg=d`;

        const googleMapsURL = `comgooglemaps://?saddr=${currentLat},${currentLng}&daddr=${destLat},${destLng}&directionsmode=driving`;
        const canOpenGoogleMaps = await Linking.canOpenURL(googleMapsURL);

        if (canOpenGoogleMaps) {
          url = googleMapsURL;
        }
      } else {
        url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${destLat},${destLng}&travelmode=driving`;
      }

      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        Toast.show({
          type: "error",
          text1: "Maps application is not available.",
        });
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to open the map.",
      });
    } finally {
      setMapLoading(false);
    }
  }, [navigateAddressLink, currentLocation, geolocation]);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity style={iconStyle} onPress={openDialer}>
        {callLoading ? (
          <ActivityIndicator size="small" color={color.whiteColor} />
        ) : (
          <CustomIcon
            type="SimpleLineIcons"
            name="phone"
            size={22}
            color={color.lightGray}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={iconStyle} onPress={openGoogleMaps}>
        {mapLoading ? (
          <ActivityIndicator size="small" color={color.whiteColor} />
        ) : (
          <CustomIcon
            type="Entypo"
            name="location"
            size={22}
            color={color.lightGray}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ContactActions;
