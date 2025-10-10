import React, { useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CustomIcon } from "./Icon";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import color from "@/themes/Colors.themes";

interface InputProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
  title?: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  secureTextEntry?: boolean;
  inputStyle?: TextStyle;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export default function Input({
  control,
  name,
  rules = {},
  title,
  placeholder,
  keyboardType,
  disabled,
  secureTextEntry,
  inputStyle,
  containerStyle,
  titleStyle,
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={[containerStyle, { marginVertical: windowHeight(0.6) }]}>
          {title && (
            <Text
              style={[styles.title, { color: color.titleText }, titleStyle]}
            >
              {title}
            </Text>
          )}

          <View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: color.lightGray,
                  borderColor: error ? color.red : color.placeholderText,
                  fontFamily: fonts.regular,
                },
                inputStyle,
              ]}
              value={value}
              onChangeText={onChange}
              editable={!disabled}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              aria-disabled={disabled}
              keyboardType={keyboardType}
              placeholderTextColor={color.placeholderText}
              accessibilityLabel={title || placeholder}
            />

            {secureTextEntry && (
              <TouchableOpacity
                style={[styles.eye, { top: "29%" }]}
                onPress={() => setIsPasswordVisible((prev) => !prev)}
                accessibilityLabel={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
              >
                <CustomIcon
                  type="Ionicons"
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={windowHeight(2.5)}
                  color="gray"
                />
              </TouchableOpacity>
            )}
          </View>

          {error && (
            <Text style={[styles.warning]}>{error.message || "Error"}</Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.rg,
    marginBottom: windowHeight(0.3),
    marginLeft: windowWidth(0.8),
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    height: windowHeight(6),
    color: color.regularText,
    paddingHorizontal: windowWidth(3),
    opacity: 0.6,
  },
  warning: {
    color: color.red,
    fontSize: fontSizes.sm,
    marginTop: windowHeight(0.1),
    marginLeft: windowWidth(0.8),
  },
  eye: {
    position: "absolute",
    right: windowWidth(2.8),
    zIndex: 1,
    opacity: 0.6,
  },
});
