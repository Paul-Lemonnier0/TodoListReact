import { TodoList } from "@/app/types/TodoType"
import { FC } from "react"
import { FlatList } from "react-native"
import { TodoListItem } from "../todo/TodoItem"

interface TodoListRendererProps {
  todoList: TodoList,
  handleClickOnTodo: (id: string) => void,
  isTodoSelected: (id: string) => boolean,
  handleCheckTodo: (id: string) => void,
}

export const TodoListRenderer: FC<TodoListRendererProps> = ({
  todoList,
  handleClickOnTodo,
  handleCheckTodo,
  isTodoSelected
}) => {

  return(
    <FlatList
      data={todoList}
      renderItem={({item: todo}) =>
        <TodoListItem
          todo={todo}
          onPress={() => handleClickOnTodo(todo.id)}
          onCheck={() => handleCheckTodo(todo.id)}
          isSelected={isTodoSelected(todo.id)}
        />
      }

      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap: 10}}
    />
  )
}