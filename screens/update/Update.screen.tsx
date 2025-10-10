import { View, Linking } from "react-native";
import React from "react";
import { useAppDispatch } from "@/store/Reduxhook";
import color from "@/themes/Colors.themes";
import Button from "@/components/common/Button";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";
import Images from "@/utils/images";
import { windowWidth } from "@/themes/Constants.themes";
type PropType = {
  appLink: string;
};

const AppVersion = ({ appLink }: PropType) => {
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: color.lightWhite,
      }}
    >
      <LottieView
        source={Images.update}
        autoPlay
        loop
        style={{ width: "100%", flex: 0.7 }}
      />
      <View>
        <Button
          width={windowWidth(80)}
          title="Update App"
          backgroundColor={color.primary}
          onPress={async () => {
            try {
              await Linking.openURL(appLink);
            } catch (error: any) {
              Toast.show({
                type: "error",
                text1: `Link not found`,
              });
            }
          }}
        />
      </View>
    </View>
  );
};

export default AppVersion;
