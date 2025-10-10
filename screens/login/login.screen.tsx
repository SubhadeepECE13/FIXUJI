import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import styles from "./style";
import Input from "@/components/common/Input";
import { commonStyles } from "@/styles/common.style";
import { useAppDispatch } from "@/store/Reduxhook";
import Button from "@/components/common/Button";
import { windowHeight } from "@/themes/Constants.themes";
import Footer from "@/components/dashboard/Footer";
import color from "@/themes/Colors.themes";
import { login } from "@/store/actions/users/userAction";

interface FormData {
  userName: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("User Name is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginScreen() {
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const [disabled, setDisabled] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogin = async (data: FormData) => {
    const { userName, password } = data;
    setDisabled(true);
    await dispatch(login({ userName, password }));
    reset();
    setDisabled(false);
  };

  return (
    <View style={[commonStyles.whiteContainer, { flex: 1 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container]}
      >
        <Text style={[styles.headerText]}>Log in to continue</Text>
        <View style={styles.formContainer}>
          <Input
            control={control}
            name="userName"
            placeholder="Enter Your User Name"
            disabled={false}
            keyboardType="email-address"
            // title="Email Address"
          />
          <Input
            control={control}
            name="password"
            placeholder="Enter Your Password"
            disabled={false}
            keyboardType="default"
            secureTextEntry={true}
            // title="Password"
          />
        </View>
        <View style={{ marginBottom: windowHeight(3) }}></View>
        <Button
          title="Login"
          backgroundColor={color.primary}
          textColor={color.whiteColor}
          onPress={handleSubmit(handleLogin)}
          disabled={disabled}
        />
      </KeyboardAvoidingView>
      <View style={commonStyles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}
