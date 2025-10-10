// import { commonStyles } from "@/styles/common.style";

// import { router } from "expo-router";
// import React, { useState } from "react";
// import { ImageBackground, Text, View } from "react-native";
// import styles from "./style";

// import Images from "@/utils/images";
// import { resetAndNavigate } from "@/utils/Helpers";
// import Button from "@/components/common/Button";

// const OnBoardingscreen = () => {
//   const getStarted = () => {
//     resetAndNavigate("/(routes)/login");
//   };
//   return (
//     <ImageBackground
//       source={Images.onBoarding}
//       resizeMode="cover"
//       style={[{ flex: 0.8 }, commonStyles.whiteContainer, styles.container]}
//     >
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerText}>WELCOME</Text>
//         <Text style={styles.subTitle}>TO OUR APP!</Text>
//       </View>
//       <View style={styles.bottomContainer}>
//         <Button
//           title="Get Started"
//           onPress={getStarted}
//           style={{ width: "70%" }}
//         />
//       </View>
//     </ImageBackground>
//   );
// };

// export default OnBoardingscreen;

import { commonStyles } from "@/styles/common.style";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./style";

import Images from "@/utils/images";
import { resetAndNavigate } from "@/utils/Helpers";
import Button from "@/components/common/Button";

const OnBoardingscreen = () => {
  const getStarted = () => {
    resetAndNavigate("/(routes)/login");
  };

  return (
    <View style={[commonStyles.whiteContainer, styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>WELCOME</Text>
        <Text style={styles.subTitle}>TO OUR APP!</Text>

        {/* <Image source={Images.onBoarding} style={styles.middleImage} /> */}
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image source={Images.onBoarding} style={styles.middleImage} />
      </View>

      <View style={styles.bottomContainer}>
        <Button
          title="Get Started"
          onPress={getStarted}
          style={{ width: "70%" }}
        />
      </View>
    </View>
  );
};

export default OnBoardingscreen;
