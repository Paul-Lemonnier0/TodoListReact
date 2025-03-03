import { BackgroundTextButton, BorderIconButton } from "@/components/buttons/BasicButtons";
import { TodoListRenderer } from "@/components/lists/TodoList";
import { ThemedText } from "@/components/ThemedText";
import { useTodoList } from "@/context/TodoListContext";
import { FC, useCallback, useRef, useState } from "react";
import { Platform, View } from "react-native";
import * as Haptics from 'expo-haptics';
import { AddTodoBottomSheet } from "@/components/bottomSheets/AddTodoBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SettingsTodoBottomSheet } from "@/components/bottomSheets/SettingsTodoBottomSheet";
import { BaseImpact } from "@/constants/Impacts";

export default function HomeScreen() {

  // Get the methods and variables from the todolist context
  const {
    addTodoItem,
    updateTodoItemTitle,
    removeTodoItem,
    getTodoByID
  } = useTodoList()

  // State to store the selected todo item ID
  const [selectedTodoID, setSelectedTodoID] = useState<string | null>(null)

  // Refs for the bottom sheets
  const addTodoBottomSheetRef = useRef<BottomSheetModal>(null)
  const editTodoBottomSheetRef = useRef<BottomSheetModal>(null)

  // Callbacks to open the bottom sheets (those will not be rerendered at each state change)
  const openAddTodoBottomSheet = useCallback(() => {
    addTodoBottomSheetRef.current?.present()
  }, [])

  const openEditTodoBottomSheet = useCallback(() => {
    editTodoBottomSheetRef.current?.present()
  }, [])

  // Function to handle the selection of a todo item
  const handleSetSelectedTodoID = (id: string) => {
    BaseImpact()

    if(selectedTodoID === id) {
      setSelectedTodoID(null)
    }

    else setSelectedTodoID(id)
  }

  return(
    <>
      <View style={{flex: 1, gap: 20}}>
        <HomeScreenHeader handleOpenEditTodo={selectedTodoID ? openEditTodoBottomSheet : null}/>
        <HomeScreenContent selectedTodoID={selectedTodoID} setSelectedTodoID={handleSetSelectedTodoID}/>
        <HomeScreenFooter handleOpenAddTodo={openAddTodoBottomSheet} />
      </View>

      <AddTodoBottomSheet
        bottomSheetRef={addTodoBottomSheetRef}
        addTodoItem={(title: string) => addTodoItem(title)}
      />

      <SettingsTodoBottomSheet
        bottomSheetRef={editTodoBottomSheetRef}
        editTodoItem={(newTitle: string) => updateTodoItemTitle(selectedTodoID ?? "", newTitle)}
        deleteTodoItem={() => removeTodoItem(selectedTodoID ?? "")}
        todoTitle={getTodoByID(selectedTodoID ?? "")?.title ?? ""}
      />
    </>
  )
}

interface HomeScreenHeaderProps {
  handleOpenEditTodo: (() => void) | null
}

const HomeScreenHeader: FC<HomeScreenHeaderProps> = ({
  handleOpenEditTodo
}) => {

  const dateString = new Date().toLocaleDateString('en-US', {
    year: "numeric",
    month: 'long',
    day: 'numeric'
  })

  // Get the platform name (iOS or Android)
  const platform = Platform.OS === 'ios' ? 'iOS' : 'Android'

  return(
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <ThemedText type="title">todo.</ThemedText>
        <ThemedText type="subtitle" gray>{dateString}</ThemedText>
        <ThemedText type="defaultSemiBold">{platform}</ThemedText>
      </View>

      <BorderIconButton
        onPress={handleOpenEditTodo ?? (() => {})}
        iconName={"create-outline"}
        disabled={handleOpenEditTodo === null}
      />
    </View>
  )
}

interface HomeScreenContentProps {
  selectedTodoID: string | null,
  setSelectedTodoID: (id: string) => void
}

const HomeScreenContent: FC<HomeScreenContentProps> = ({
  selectedTodoID,
  setSelectedTodoID
}) => {

  // Get the todo list and the method from the context to toggle a todo item
  const {
    todoList,
    toggleTodoItem
  } = useTodoList()

  return(
    <View style={{flex: 1}}>
      <TodoListRenderer
        todoList={todoList}
        handleClickOnTodo={setSelectedTodoID}
        handleCheckTodo={toggleTodoItem}
        isTodoSelected={(id: string) => selectedTodoID === id}
      />
    </View>
  )
}

interface HomeScreenFooterProps {
  handleOpenAddTodo: () => void
}

const HomeScreenFooter: FC<HomeScreenFooterProps> = ({
  handleOpenAddTodo
}) => {
  return(
    <View>
      <BackgroundTextButton
        onPress={handleOpenAddTodo}
        text="Ajouter"
      />
    </View>
  )
}