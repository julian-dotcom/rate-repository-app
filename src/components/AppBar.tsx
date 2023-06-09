import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { theme } from "../config/theme";
import { Link } from "react-router-native";
import Text from "./Text";
import { useAuthenticate } from "../hooks/useAuthenticate";
import { useCurrentUser } from "../hooks/useCurrentUser";

const AppBar = () => {
  const { signOut } = useAuthenticate();
  const { currentUser } = useCurrentUser();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        {currentUser ? (
          <>
            <Pressable>
              <Link to="/review">
                <Text style={styles.text}>Create Review</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/myreviews">
                <Text style={styles.text}>My Reviews</Text>
              </Link>
            </Pressable>
            <Pressable onPress={signOut}>
              <Text style={styles.text}>Sign Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable>
              <Link to="/signup">
                <Text style={styles.text}>Sign Up</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/signin">
                <Text style={styles.text}>Sign In</Text>
              </Link>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundNav,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingBottom: 10,
    paddingRight: 15,
  },
});

export default AppBar;
