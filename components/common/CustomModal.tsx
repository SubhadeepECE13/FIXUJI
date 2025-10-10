import { BlurTint, BlurView } from "expo-blur";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export interface CustomModalProps extends ModalProps {
  isOpen: boolean;
  setOpened: (value: boolean) => void;
  withInput?: boolean;
  isBlur?: boolean;
  blurIntensity?: number;
  blurTint?: BlurTint;
  isClosed?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  setOpened,
  withInput = false,
  isBlur = false,
  blurIntensity = 20,
  blurTint = "light",
  animationType = "fade",
  transparent = true,
  statusBarTranslucent = true,
  isClosed = true,
  children,
  ...rest
}) => {
  const handleClose = () => {
    if (isClosed) {
      setOpened?.(false);
    } else {
      return;
    }
  };

  const renderBackground = () => {
    if (isBlur) {
      return (
        <BlurView
          style={StyleSheet.absoluteFill}
          intensity={blurIntensity}
          tint={blurTint}
        />
      );
    }
    return <View style={[StyleSheet.absoluteFill, styles.overlay]} />;
  };

  const renderContent = () =>
    withInput ? (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        {children}
      </KeyboardAvoidingView>
    ) : (
      <View style={styles.container}>{children}</View>
    );

  return (
    <Modal
      visible={isOpen}
      transparent={transparent}
      animationType={animationType}
      statusBarTranslucent={statusBarTranslucent}
      onRequestClose={handleClose}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        {renderBackground()}
      </TouchableWithoutFeedback>
      {renderContent()}
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
