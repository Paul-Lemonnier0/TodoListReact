import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import TodoItem, { TodoList } from "@/app/types/TodoType";
import TodoApiService from "@/utils/TodoServices";
import * as Haptics from 'expo-haptics';

interface TodoListContextType {
  todoList: TodoList;
  addTodoItem: (title: string) => Promise<TodoItem>;
  removeTodoItem: (id: string) => Promise<void>;
  toggleTodoItem: (id: string) => Promise<void>;
  updateTodoItemTitle: (id: string, title: string) => Promise<void>;
  getTodoByID: (id: string) => TodoItem | undefined;
}

const TodoListContext = createContext<TodoListContextType | undefined>(undefined);

interface TodoListProviderProps {
  children: ReactNode;
}

export const TodoListProvider: React.FC<TodoListProviderProps> = ({ children }) => {
  const [todoList, setTodoList] = useState<TodoList>([]);
  const todoApiServices = new TodoApiService();

  useEffect(() => {
    const fetchTodoList = async () => {
      console.log("fetching todos...")
      const todoItems = await todoApiServices.fetchItems()
      console.log("todos fetched !")
      setTodoList(todoItems)
    }

    fetchTodoList()
  }, [])

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

  const removeTodoItem = async(id: string) => {
    setTodoList(todoList.filter((item) => item.id !== id));
    await todoApiServices.deleteItem(id)
  };

  const toggleTodoItem = async(id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    const todo = getTodoByID(id)

    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );

    if(todo) {
      await todoApiServices.updateItem({...todo, isDone: !todo?.isDone})
    }
  };

  const updateTodoItemTitle = async(id: string, title: string) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, title } : item
      )
    );

    await todoApiServices.updateItemTitle(id, title)
  };

  const getTodoByID = (id: string) => {
    return todoList.find((item) => item.id === id)
  }

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        addTodoItem,
        removeTodoItem,
        toggleTodoItem,
        updateTodoItemTitle,
        getTodoByID
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = (): TodoListContextType => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error("useTodoList must be used within a TodoListProvider");
  }
  return context;
};
