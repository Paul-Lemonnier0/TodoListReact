export default interface TodoItem {
  title: string,
  isDone?: boolean,
  creationDate: Date,
  id: string
}

export type TodoList = TodoItem[]