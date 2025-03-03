import { FC, useCallback, useEffect, useRef } from "react";
import { BaseBottomSheet } from "./BaseBottomSheet";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CustomTextInput } from "../inputs/TextInput";
import { useForm } from "react-hook-form";

interface SettingsTodoBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>,
  todoTitle: string,
  editTodoItem: (title: string) => void
  deleteTodoItem: () => void
}

interface BasicTodoInfo {
  title: string
}

/**
 * The bottom sheet to edit an existing todo item
 */
export const SettingsTodoBottomSheet: FC<SettingsTodoBottomSheetProps> = ({
  bottomSheetRef,
  todoTitle,
  editTodoItem,
  deleteTodoItem
}) => {

  // Form management with react-hook-form (we just need a title field)
  const { control, handleSubmit, setValue } = useForm<BasicTodoInfo>({
    defaultValues: {
      title: todoTitle,
    },
  });

  //Sets the form title value when the todo item title changes
  useEffect(() => {
    setValue("title", todoTitle);
  }, [todoTitle, setValue]);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  // Handle delete todo
  const handleDelete = () => {
    deleteTodoItem()
    closeModal()
  }

  // Submittion management
  const onSubmit = (data: BasicTodoInfo) => {
    editTodoItem(data.title)
    closeModal()
  }

  //UI Definition using the BaseBottomSheet component we defined earlier
  return(
    <BaseBottomSheet
      bottomSheetRef={bottomSheetRef}
      title="Modifier une tâche"
      baseFooterButton={{
        text: "Modifier",
        iconName: "checkmark-outline",
        action: handleSubmit(onSubmit)
      }}
      redFooterButton={{
        text: "Supprimer",
        iconName: "close-outline",
        action: handleDelete
      }}
    >
      <View style={{flex: 1}}>
        <CustomTextInput
          control={control}
          name={"title"}
          placeholder={"Entrez un titre"}
          bottomSheetInput
        />
      </View>
    </BaseBottomSheet>
  )
}