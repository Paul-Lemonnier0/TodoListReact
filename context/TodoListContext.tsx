import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import TodoItem, { TodoList } from "@/app/types/TodoType";
import TodoApiService from "@/utils/TodoServices";
import { BaseImpact } from "@/constants/Impacts";

/**
 * Defines the structure of the context type (what will be provided by the context)
 */
interface TodoListContextType {
  todoList: TodoList;
  addTodoItem: (title: string) => Promise<TodoItem>;
  removeTodoItem: (id: string) => Promise<void>;
  toggleTodoItem: (id: string) => Promise<void>;
  updateTodoItemTitle: (id: string, title: string) => Promise<void>;
  getTodoByID: (id: string) => TodoItem | undefined;
  getTodoListProgress: () => number;
}

const TodoListContext = createContext<TodoListContextType | undefined>(undefined);

interface TodoListProviderProps {
  children: ReactNode;
}

/**
 * Provides the TodoList context to child components.
 * Handles CRUD operations for todo items using an API service.
 *
 * @param children - The child components that will have access to the context
 * @returns - The TodoList context provider
 */
export const TodoListProvider: React.FC<TodoListProviderProps> = ({ children }) => {
  const [todoList, setTodoList] = useState<TodoList>([]);
  const todoApiServices = new TodoApiService();

  /**
   * Fetches the todo items from the API when the component mounts. Set the todolist state once it's done.
   */
  useEffect(() => {
    const fetchTodoList = async () => {
      console.log("fetching todos...")
      const todoItems = await todoApiServices.fetchItems()
      console.log("todos fetched !")
      setTodoList(todoItems)
    }

    fetchTodoList()
  }, [])

  /**
   * Creates a new todo item and adds it to the todo list.
   * Persists the new item to the API.
   * @param title - The title of the new todo item
   * @returns
   */
  const addTodoItem = async(title: string) => {
    const newItem: TodoItem = {
      id: Date.now().toString(),
      title,
      isDone: false,
      creationDate: new Date()
    };

    setTodoList([...todoList, newItem]);

    await todoApiServices.addItem(newItem)

    return newItem
  };

  /**
   * Removes a todo item from the todo list.
   * Persists the deletion to the API.
   * @param id - The id of the todo item to remove
   */
  const removeTodoItem = async(id: string) => {
    setTodoList(todoList.filter((item) => item.id !== id));
    await todoApiServices.deleteItem(id)
  };

  /**
   * Toggles the isDone property of a todo item.
   * Persists the change to the API.
   * @param id - The id of the todo item to toggle
   */
  const toggleTodoItem = async(id: string) => {
    BaseImpact()

    // Retrieve the todo item from the list
    const todo = getTodoByID(id)

    // Update the todo item state in the list
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );

    // Persist the change to the API if the todo item exists
    if(todo) {
      await todoApiServices.updateItem({...todo, isDone: !todo?.isDone})
    }
  };

  /**
   * Updates the title of a todo item.
   * Persists the change to the API.
   * @param id - The id of the todo item to update
   * @param title - The new title of the todo item
   */
  const updateTodoItemTitle = async(id: string, title: string) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, title } : item
      )
    );

    await todoApiServices.updateItemTitle(id, title)
  };

  /**
   * Retrieves a todo item from the todo list by its id.
   * @param id - The id of the todo item to retrieve
   * @returns The todo item with the specified id
   */
  const getTodoByID = (id: string): TodoItem | undefined => {
    return todoList.find((item) => item.id === id)
  }

  /**
   * Calculates the progress of the todo list.
   * @returns The progress of the todo list as a percentage
   */
  const getTodoListProgress = () => {
    const totalItems = todoList.length
    const doneItems = todoList.filter((item) => item.isDone).length

    return Math.round((doneItems / totalItems) * 100)
  }

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        addTodoItem,
        removeTodoItem,
        toggleTodoItem,
        updateTodoItemTitle,
        getTodoByID,
        getTodoListProgress
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

/**
 * Custom hook to access the TodoList context.
 * Throws an error if used outside a TodoListProvider.
 */
export const useTodoList = (): TodoListContextType => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error("useTodoList must be used within a TodoListProvider");
  }
  return context;
};
