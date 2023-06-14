import { Text, Pressable, StyleSheet } from "react-native";

const LongButton = ({ text, func }: { text: string; func: () => unknown }) => {
  return (
    <Pressable style={styles.submitButton} onPress={func}>
      <Text style={styles.submitText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 10,
    backgroundColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default LongButton;
