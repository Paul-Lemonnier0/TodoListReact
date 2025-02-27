import { FC } from "react";
import { View } from "react-native";
import { BackgroundTextButton } from "../buttons/BasicButtons";
import { useThemeColor } from "@/hooks/useThemeColor";

export interface IconProps {
  text: string,
  iconName?: string,
  action: () => void
}

interface BottomSheetFooterUtilsProps {
  baseButton: IconProps,
  redButton?: IconProps,
}

export const BottomSheetFooterUtils: FC<BottomSheetFooterUtilsProps> = ({
  baseButton,
  redButton
}) => {

  const errorColor = useThemeColor({}, "error")

  return(
    <View style={{flexDirection: "row", gap: 10, paddingBottom: 10}}>
      {
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