import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import { TouchableOpacity } from "react-native";

interface CustomCheckboxProps {
  isChecked: boolean,
  onPress: () => void
}

/**
 * Custom checkbox component
 */
export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  isChecked,
  onPress
}) => {

  //Accessing to the colors depending on the theme
  const secondary = useThemeColor({}, 'secondary')
  const contrast = useThemeColor({}, 'contrast')
  const fontContrast = useThemeColor({}, 'fontContrast')

  // Colors depending on the state of the checkbox
  const borderColor = isChecked ? contrast : secondary
  const backgroundColor = isChecked ? contrast : "transparent"
  const tintColor = isChecked ? fontContrast : "transparent"

  return (
    <TouchableOpacity onPress={onPress} style={{
      borderRadius: 50,
      borderWidth: 2,
      padding: 5,
      borderColor,
      backgroundColor
    }}>
      <Ionicons name="checkmark-outline" size={18} color={tintColor}/>
    </TouchableOpacity>
  )
}