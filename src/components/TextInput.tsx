import { TextInput as NativeTextInput, ViewStyle } from "react-native";

interface TextInputProps {
  onChangeText: (value: string) => void;
  onBlur: () => void;
  value: string;
  error?: string | false | undefined;
  style?: ViewStyle;
  placeholder?: string;
}

const TextInput = ({ style, ...props }: TextInputProps) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
