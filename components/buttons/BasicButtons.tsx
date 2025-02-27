import { FC } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface BaseButtonProps {
  onPress: () => void,
  text?: string,
  iconName?: string,
  backgroundColor?: string,
  textColor?: string,
  hasBorder?: boolean,
  disabled?: boolean,
  flex?: boolean
}

const BaseButton: FC<BaseButtonProps> = ({
  onPress,
  text,
  iconName,
  backgroundColor,
  textColor,
  hasBorder,
  disabled,
  flex
}) => {

  const font = useThemeColor({}, 'font')
  const fontGray = useThemeColor({}, 'fontGray')
  const contrast = useThemeColor({}, 'contrast')

  const fontColor = disabled ? fontGray : (textColor ?? font)
  const borderColor = disabled ? fontGray : contrast

  return(
    <TouchableOpacity onPress={onPress} disabled={disabled} style={{flex: flex ? 1 : undefined}}>
      <View style={[
        styles.container,
        {
          borderWidth: hasBorder ? 2 : 0,
          borderColor: borderColor,
          backgroundColor: backgroundColor ?? "transparent",
          justifyContent: iconName && text ? "space-between" : "center",

        }
      ]}>
        {
          text && <ThemedText type="medium" style={{color: fontColor}}>{text}</ThemedText>
        }
        {
          iconName && <Ionicons name={iconName as any} size={24} color={fontColor} />
        }
      </View>
    </TouchableOpacity>
  )
}

interface BackgroundTextButtonProps {
  onPress: () => void,
  iconName?: string
  text: string,
  backgroundColor?: string,
  textColor?: string,
  disabled?: boolean,
  flex?: boolean
}

const BackgroundTextButton: FC<BackgroundTextButtonProps> = ({
  text, onPress, backgroundColor, textColor, iconName, flex
}) => {

  const baseBackgroundColor = useThemeColor({}, 'contrast')
  const baseTextColor = useThemeColor({}, "fontContrast")

  return(
    <BaseButton
      onPress={onPress}
      text={text}
      backgroundColor={backgroundColor ?? baseBackgroundColor}
      textColor={textColor ?? baseTextColor}
      iconName={iconName}
      flex={flex}
    />
  )
}

interface BorderIconButtonProps {
  onPress: () => void,
  iconName: string,
  disabled?: boolean
}

const BorderIconButton: FC<BorderIconButtonProps> = ({
  onPress,
  iconName,
  disabled
}) => {
  return(
    <BaseButton
      onPress={onPress}
      iconName={iconName}
      hasBorder
      disabled={disabled}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: "row",
    gap: 10
  }
})

export {
  BackgroundTextButton,
  BorderIconButton
}