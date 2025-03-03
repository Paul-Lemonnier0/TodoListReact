import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BottomSheetFooterUtils, IconProps } from "./BottomSheetFooterUtils";
import { SharedValue } from "react-native-reanimated";

interface BaseBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>
  title: string,
  baseFooterButton?: IconProps,
  redFooterButton?: IconProps,
  snapPoints?: Array<number | string> | SharedValue<Array<string | number>>;
  children: React.ReactNode
}

/**
 * Define the base bottom sheet component (used to define the other ones, more specific)
 * @param props
 * @returns
 */
export const BaseBottomSheet: FC<BaseBottomSheetProps> = ({
  bottomSheetRef,
  title,
  baseFooterButton,
  redFooterButton,
  snapPoints,
  children
}) => {

  // Close the bottom sheet
  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // Render the backdrop of the bottom sheet (helps to close the bottom sheet when clicking outside of it)
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // the backdrop appears on the first snap point (0) (so it's here at the start when the botttom sheet open's for the first time)
        disappearsOnIndex={-1} // the backdrop disappears on the last snap point (-1) (so it's here when the bottom sheet is closed)
        pressBehavior={"close"} // close the bottom sheet when the backdrop is pressed
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef} // ref to the bottom sheet
      enableDynamicSizing={!snapPoints} // enable dynamic sizing (if there are no snap points provided, we want to let the bottom sheet take the necessary space)
      onDismiss={handleClose} // handle the dismiss event (when the bottom sheet is closed)
      backdropComponent={renderBackdrop} // render the backdrop
      keyboardBehavior="interactive" // push the content up when keyboard is opened
      keyboardBlurBehavior="restore" // restore the content when keyboard is closed
      snapPoints={snapPoints} // snap points for the bottom sheet ([50%] -> it will fill 50% of the screen height)
    >
      <BottomSheetView style={styles.container}>
        <BottomSheetModalHeader title={title} handleClose={handleClose} />
        {children}
        {
          // Render the footer buttons if they are defined
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

/**
 * Base bottom sheet header component
 * @param title - the title of the bottom sheet
 * @param handleClose - the function to close the bottom sheet
 * @returns
 */
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 30,
    flex: 1,
    paddingBottom: 30
  }
})