import { useThemeColor } from "@/hooks/useThemeColor"
import { FC } from "react"
import { TouchableOpacity, View } from "react-native"

interface CardProps {
  isSelected?: boolean,
  onPress?: () => void,
  children: React.ReactNode
}

const Card: FC<CardProps> = ({
  onPress,
  isSelected,
  children
}) => {

  const secondary = useThemeColor({}, 'secondary')
  const field = useThemeColor({}, 'field')
  const contrast = useThemeColor({}, 'contrast')

  return(
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 20,
          borderColor: isSelected ? contrast : secondary,
          backgroundColor: field,
          paddingHorizontal: 20,
          paddingVertical: 30,
          flex: 1
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}

export default Card