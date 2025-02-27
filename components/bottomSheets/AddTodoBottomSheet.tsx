import { FC, useRef } from "react";
import { BaseBottomSheet } from "./BaseBottomSheet";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CustomTextInput } from "../inputs/TextInput";
import { useForm } from "react-hook-form";

interface AddTodoBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>,
  addTodoItem: (title: string) => void
}

interface BasicTodoInfo {
  title: string
}

export const AddTodoBottomSheet: FC<AddTodoBottomSheetProps> = ({
  bottomSheetRef,
  addTodoItem
}) => {

  const {
    control,
    handleSubmit,
  } = useForm<BasicTodoInfo>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: BasicTodoInfo) => {
    addTodoItem(data.title)
    bottomSheetRef.current?.close()
  }

  return(
    <BaseBottomSheet
      bottomSheetRef={bottomSheetRef}
      title="Ajouter une tâche"
      baseFooterButton={{
        text: "Ajouter",
        iconName: "arrow-up-outline",
        action: handleSubmit(onSubmit)
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