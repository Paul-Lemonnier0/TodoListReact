import { useThemeColor } from "@/hooks/useThemeColor"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { FC, useState } from "react"
import { Control, Controller } from "react-hook-form"
import React, { StyleSheet, TextInput, View } from "react-native"

interface CustomTextInputProps {
  placeholder?: string,
  disabled?: boolean,
  name: any;
  control: Control<any>;
  bottomSheetInput?: boolean
}

export const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  disabled,
  control,
  name,
  bottomSheetInput,
}) => {

  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [isWrong, setIsWrong] = useState<boolean>(false)

  const fontColor = useThemeColor({}, "font")
  const fontGray = useThemeColor({}, "fontGray")
  const secondary = useThemeColor({}, "secondary")
  const fieldColor = useThemeColor({}, "field")
  const contrast = useThemeColor({}, "contrast")
  const error = useThemeColor({}, "error")

  const backgroundColor = disabled ? secondary : fieldColor;
  const borderColor =
    disabled ? secondary
    : isFocus ? contrast
    : isWrong ? error
    : secondary;

  const TextComponent = bottomSheetInput ? BottomSheetTextInput : TextInput

  return(
    <View style={[styles.container, { borderColor, backgroundColor }]}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextComponent
            value={value ?? ""}
            onChangeText={onChange}
            placeholder={placeholder ?? ""}
            placeholderTextColor={fontGray}
            editable={!disabled}
            selectionColor={fontColor}
            autoCorrect={false}

            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}

            style={[
              styles.textInput,
              {
                paddingRight: isWrong ? 0 : 15,
                color: fontColor,
              },
            ]}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 15,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 15,
    borderRadius: 15,
    fontFamily: "fontMedium",
    margin: 5,
  },
})