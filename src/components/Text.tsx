import { Platform, Text as NativeText, TextProps, StyleSheet } from "react-native";
import { theme } from "../config/theme";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const Text = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <NativeText style={[styles.text, style]} {...props}>
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily:
      Platform.OS === "android"
        ? theme.fonts.android
        : Platform.OS === "ios"
        ? theme.fonts.ios
        : theme.fonts.default,
  },
});

export default Text;
