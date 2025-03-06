import { FC } from "react";
import { View } from "react-native";
import { BackgroundTextButton } from "../buttons/BasicButtons";
import { useThemeColor } from "@/hooks/useThemeColor";

// Base type of an icon
export interface IconProps {
  text: string,
  iconName?: string,
  action: () => void
}

interface BottomSheetFooterUtilsProps {
  baseButton: IconProps,
  redButton?: IconProps,
}

/**
 * Definition of the base bottom sheet footer component
 * @param baseButton - The base action button
 * @param redButton - The red action button (optional)
 */
export const BottomSheetFooterUtils: FC<BottomSheetFooterUtilsProps> = ({
  baseButton,
  redButton
}) => {

  // Get the error color depending on the app theme
  const errorColor = useThemeColor({}, "error")

  return(

    /* It's possible to define the style of the view using the inline notation or using a StyleSheet object */
    <View style={{flexDirection: "row", gap: 10, paddingBottom: 10}}>
      {
        // Renders the red button if it is defined
        redButton && (
          <BackgroundTextButton
            text={redButton.text}
            iconName={redButton.iconName}
            onPress={redButton.action}
            backgroundColor={errorColor}
            flex
          />
        )
      }

      <BackgroundTextButton
        text={baseButton.text}
        iconName={baseButton.iconName}
        onPress={baseButton.action}
        flex
      />
    </View>
  )
}