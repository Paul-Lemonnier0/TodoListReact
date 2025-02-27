import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, useCallback, useState } from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BottomSheetFooterUtils, IconProps } from "./BottomSheetFooterUtils";
import { SharedValue } from "react-native-reanimated";

type BackdropBehaviorType = "none" | "close" | "collapse" | undefined;

interface BaseBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>
  title: string,
  baseFooterButton?: IconProps,
  redFooterButton?: IconProps,
  snapPoints?: Array<number | string> | SharedValue<Array<string | number>>;
  children: React.ReactNode
}
export const BaseBottomSheet: FC<BaseBottomSheetProps> = ({
  bottomSheetRef,
  title,
  baseFooterButton,
  redFooterButton,
  snapPoints,
  children
}) => {

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={"close"}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing={!snapPoints}
      onDismiss={handleClose}
      backdropComponent={renderBackdrop}
      keyboardBlurBehavior="restore"
      keyboardBehavior="interactive"
      snapPoints={snapPoints}
      footerComponent={
        baseFooterButton ? () => (
          null
        ) : undefined
      }
    >
      <BottomSheetView
        style={{
          padding: 20,
          gap: 30,
          flex: 1,
          paddingBottom: 30
        }}
      >
        <BottomSheetModalHeader title={title} handleClose={handleClose} />
        {children}
        {
          baseFooterButton &&
          <BottomSheetFooterUtils
            baseButton={baseFooterButton}
            redButton={redFooterButton}
          />
        }
      </BottomSheetView>
    </BottomSheetModal>
  );
};


interface BottomSheetModalHeaderProps {
  title: string,
  handleClose: () => void
}

const BottomSheetModalHeader: FC<BottomSheetModalHeaderProps> = ({
  title,
  handleClose
}) => {

  const fontColor = useThemeColor({}, 'font')

  return (
    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
      <ThemedText type="title">{title}</ThemedText>
      <Ionicons name="close" size={24} color={fontColor} onPress={handleClose}/>
    </View>
  )
}