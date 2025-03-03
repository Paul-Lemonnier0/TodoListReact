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

/**
 * The bottom sheet to add a new todo item
 */
export const AddTodoBottomSheet: FC<AddTodoBottomSheetProps> = ({
  bottomSheetRef,
  addTodoItem
}) => {

  // Form management with react-hook-form (we just need a title field)
  const { control, handleSubmit } = useForm<BasicTodoInfo>({
    defaultValues: {
      title: "",
    },
  });

  // Submittion management
  const onSubmit = (data: BasicTodoInfo) => {
    addTodoItem(data.title)
    bottomSheetRef.current?.close()
  }

  //UI Definition using the BaseBottomSheet component we defined earlier
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
      {/* View ~= div in React Native, it's the base container */}
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