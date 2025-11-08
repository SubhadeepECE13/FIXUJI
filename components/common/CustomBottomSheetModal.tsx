import color from "@/themes/Colors.themes";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, memo, useCallback } from "react";
import { ViewStyle } from "react-native";

interface BottomSheetSkeletonProps extends BottomSheetModalProps {
  snapPoints: (string | number)[];
  onChange?: (index: number) => void;
  onDismiss?: () => void;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  initialSnapPoint?: number;
}

const CustomBottomSheetModal = forwardRef<
  BottomSheetModal,
  BottomSheetSkeletonProps
>(
  (
    {
      snapPoints,
      onChange,
      children,
      contentContainerStyle,
      initialSnapPoint = 0,
      onDismiss,
      ...BottomSheetSkeletonProps
    },
    ref
  ) => {
    const renderBackDrop = useCallback((props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      );
    }, []);

    return (
      <BottomSheetModal
        backdropComponent={renderBackDrop}
        snapPoints={snapPoints}
        ref={ref}
        onChange={onChange}
        onDismiss={onDismiss}
        index={initialSnapPoint}
        {...BottomSheetSkeletonProps}
        backgroundStyle={{ backgroundColor: color.whiteColor }}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

export default memo(CustomBottomSheetModal);
