import { FC } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

// Base button props, common for all buttons types
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

/**
 * Base button component that can be used to create different types of buttons
 */
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

  //Accessing to the colors depending on the theme
  const font = useThemeColor({}, 'font')
  const fontGray = useThemeColor({}, 'fontGray')
  const contrast = useThemeColor({}, 'contrast')

  const fontColor = disabled ? fontGray : (textColor ?? font)
  const borderColor = disabled ? fontGray : contrast

  return(
    // TouchableOpacity ~= button -> there is an opacity "confirmation" when pressed
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{flex: flex ? 1 : undefined}}
    >
      <View style={[
        styles.container,
        {
          borderColor,
          borderWidth: hasBorder ? 2 : 0,
          backgroundColor: backgroundColor ?? "transparent",
          justifyContent: iconName && text ? "space-between" : "center",
        }
      ]}>
        {
          // Renders the text if it exists
          text && <ThemedText type="medium" style={{color: fontColor}}>{text}</ThemedText>
        }
        {
          // Renders the icon if it exists
          iconName && <Ionicons name={iconName as any} size={24} color={fontColor} />
        }
      </View>
    </TouchableOpacity>
  )
}

// Extends all the BaseButtonProps except the hasBorder prop
interface BackgroundTextButtonProps extends Omit<BaseButtonProps, 'hasBorder'> {}

const BackgroundTextButton: FC<BackgroundTextButtonProps> = ({
  text,
  onPress,
  backgroundColor,
  textColor,
  iconName,
  flex
}) => {

  //Accessing to the colors depending on the theme
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

// Base border icon button props
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