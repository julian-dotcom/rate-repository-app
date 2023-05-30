import { StyleSheet, View, ViewStyle } from "react-native";
import { useField } from "formik";
import { theme } from "../config/theme";
import Text from "./Text";
import TextInput from "./TextInput";

const FormikTextInput = ({ name, ...props }: { name: string; placeholder: string }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View>
      <TextInput
        style={[styles.box, showError && styles.errorBox] as ViewStyle}
        onChangeText={(value: string) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: "#d73a4a",
  },
  box: {
    height: 40,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    padding: 10,
  },
  errorBox: {
    borderColor: "#d73a4a",
  },
});

export default FormikTextInput;
