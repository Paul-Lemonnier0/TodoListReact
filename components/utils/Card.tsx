import { useThemeColor } from "@/hooks/useThemeColor"
import { FC } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface CardProps {
  isSelected?: boolean,
  onPress?: () => void,
  children: React.ReactNode
}

/**
 * Base card component to render a selectable card
 */
const Card: FC<CardProps> = ({
  onPress,
  isSelected,
  children
}) => {

  // Get the theme colors
  const secondary = useThemeColor({}, 'secondary')
  const field = useThemeColor({}, 'field')
  const contrast = useThemeColor({}, 'contrast')

  return(
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View
        style={[
          styles.container,
          {
            borderColor: isSelected ? contrast : secondary,
            backgroundColor: field,
          }
        ]}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  }
})

export default Card