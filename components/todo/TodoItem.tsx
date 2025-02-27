import TodoItem from "@/app/types/TodoType"
import { FC } from "react"
import { StyleSheet, View } from "react-native"
import Card from "../utils/Card"
import { ThemedText } from "../ThemedText"
import { CustomCheckbox } from "../buttons/Checkbox"

interface TodoItemProps {
  todo: TodoItem,
  onPress: () => void,
  onCheck: () => void,
  isSelected?: boolean
}

export const TodoListItem: FC<TodoItemProps> = ({
  todo,
  onPress,
  isSelected,
  onCheck
}) => {
  return(
    <Card
      onPress={onPress}
      isSelected={isSelected}
    >
      <View style={styles.container}>
        <ThemedText type="defaultSemiBold">{todo.title}</ThemedText>
        <CustomCheckbox isChecked={!!todo.isDone} onPress={onCheck}/>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})