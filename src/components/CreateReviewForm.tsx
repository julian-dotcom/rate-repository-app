import { View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import LongButton from "./LongButton";

const CreateReviewForm = ({ handleSubmit }: { handleSubmit: () => void }) => {
  return (
    <View style={styles.box}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <LongButton text="Create a review" func={async () => handleSubmit()} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    justifyContent: "space-between",
    gap: 15,
  },
});

export default CreateReviewForm;
