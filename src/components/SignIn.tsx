import { View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import { useAuthenticate } from "../hooks/useAuthenticate";
import { useAuthStorage } from "../hooks/useAuthStorage";
import { useEffect } from "react";
import LongButton from "./LongButton";

const SignIn = () => {
  const { signIn } = useAuthenticate();

  const authStorage = useAuthStorage();
  useEffect(() => {
    const print = async () => {
      console.log("authStorage: ", await authStorage.getAccessToken());
    };
    print();
  }, []);

  const onSubmit = async (values: { username: string; password: string }) => {
    console.log(values);
    const { username, password } = values;

    try {
      const res = await signIn({ username, password });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
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
  });

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.box}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />
          <LongButton text="Sign In" func={async () => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    height: 170,
  },
});
export default SignIn;
