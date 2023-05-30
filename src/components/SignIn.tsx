import { View, Pressable, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import { useSignIn } from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { useAuthStorage } from "../hooks/useAuthStorage";
import { useEffect } from "react";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

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
      navigate("/");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, "Username must be at least 6 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
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
          <Pressable style={styles.submitButton} onPress={async () => handleSubmit()}>
            <Text style={styles.submitText}>Sign in</Text>
          </Pressable>
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
  submitButton: {
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
export default SignIn;
