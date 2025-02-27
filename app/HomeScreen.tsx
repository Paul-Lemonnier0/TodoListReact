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

export default function HomeScreen() {

  const {
    addTodoItem,
    updateTodoItemTitle,
    removeTodoItem,
    getTodoByID
  } = useTodoList()

  const [selectedTodoID, setSelectedTodoID] = useState<string | null>(null)
  const addTodoBottomSheetRef = useRef<BottomSheetModal>(null)
  const editTodoBottomSheetRef = useRef<BottomSheetModal>(null)

  const openAddTodoBottomSheet = useCallback(() => {
    addTodoBottomSheetRef.current?.present()
  }, [])

  const openEditTodoBottomSheet = useCallback(() => {
    editTodoBottomSheetRef.current?.present()
  }, [])

  const handleSetSelectedTodoID = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

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
        // iconName={"arrow-up-outline"}
      />
    </View>
  )
}