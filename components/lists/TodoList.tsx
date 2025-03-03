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

/**
 * Base component to render a list of todos
 */
export const TodoListRenderer: FC<TodoListRendererProps> = ({
  todoList,
  handleClickOnTodo,
  handleCheckTodo,
  isTodoSelected
}) => {

  return(
    <FlatList // FlatList is a component that renders a list of items optimally
      data={todoList}
      renderItem={({item: todo}) =>
        <TodoListItem
          todo={todo}
          onPress={() => handleClickOnTodo(todo.id)}
          onCheck={() => handleCheckTodo(todo.id)}
          isSelected={isTodoSelected(todo.id)}
        />
      }

      showsVerticalScrollIndicator={false} // Hide the vertical scroll bar
      contentContainerStyle={{gap: 10}}
    />
  )
}