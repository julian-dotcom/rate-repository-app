import { View, Text, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import LongButton from "./LongButton";
import { CREATE_NEW_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { NewUser } from "../config/types";
import { useAuthenticate } from "../hooks/useAuthenticate";

const SignUp = () => {
  const { signIn } = useAuthenticate();
  const [mutate] = useMutation(CREATE_NEW_USER);

  const onSubmit = async (newUser: NewUser) => {
    const { username, password } = newUser;
    const { data } = await mutate({
      variables: {
        user: { username, password },
      },
    });
    console.log(data);
    await signIn({ username, password });
  };
  return (
    <Formik
      initialValues={{ username: "", password: "", passwordConfirmation: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.box}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />
          <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" />
          <LongButton text="Sign Up" func={async () => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Password confirmation must match the password")
    .required("Password confirmation is required"),
});

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    justifyContent: "space-between",
    gap: 15,
  },
});

export default SignUp;
