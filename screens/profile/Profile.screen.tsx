import { commonStyles } from "@/styles/common.style";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import styles from "./style";
import { useAppSelector } from "@/store/Reduxhook";
import Header from "@/components/common/Header";
import FunctionCard from "@/components/profile/FuctionCard";
import Card from "@/components/profile/Card";
import SettingsCard from "@/components/profile/SettingsCard";

const ProfileScreen = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header isBack={true} isRightIcon={false} title="Profile" />

      <View style={[styles.container]}>
        <View style={styles.box1}>{user && <Card user={user} />}</View>
        <View style={styles.box2}>{user && <FunctionCard />}</View>
        <View style={styles.box2}>{user && <SettingsCard />}</View>
      </View>
    </View>
  );
};

export default ProfileScreen;
