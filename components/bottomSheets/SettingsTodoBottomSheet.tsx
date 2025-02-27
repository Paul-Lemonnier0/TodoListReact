import { FC, useEffect, useRef } from "react";
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

export const SettingsTodoBottomSheet: FC<SettingsTodoBottomSheetProps> = ({
  bottomSheetRef,
  todoTitle,
  editTodoItem,
  deleteTodoItem
}) => {

  const {
    control,
    handleSubmit,
    setValue
  } = useForm<BasicTodoInfo>({
    defaultValues: {
      title: todoTitle,
    },
  });

  useEffect(() => {
    setValue("title", todoTitle);
  }, [todoTitle, setValue]);

  const handleDelete = () => {
    deleteTodoItem()
    bottomSheetRef.current?.close()
  }

  const onSubmit = (data: BasicTodoInfo) => {
    editTodoItem(data.title)
    bottomSheetRef.current?.close()
  }

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