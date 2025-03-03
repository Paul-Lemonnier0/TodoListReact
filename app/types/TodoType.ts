/**
 * Base interface for defining the structure of a todo item
 */
export default interface TodoItem {
  title: string,
  isDone?: boolean,
  creationDate: Date,
  id: string
}

/**
 * Base type for defining the structure of a todo list
 */
export type TodoList = TodoItem[]