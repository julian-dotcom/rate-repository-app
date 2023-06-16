import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";
import CreateReview from "./CreateReview";
import { Route, Routes, Navigate } from "react-router-native";

import { theme } from "../config/theme";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  content: {
    padding: 10,
    backgroundColor: theme.colors.backgroundPrimary,
    height: "100%",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.content}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="repositories/:id" element={<SingleRepository />} />
          <Route path="review" element={<CreateReview />} />
          <Route path="myreviews" element={<MyReviews />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
