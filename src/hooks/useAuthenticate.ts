import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import { useAuthStorage } from "./useAuthStorage";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

export const useAuthenticate = () => {
  const [mutate] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async ({ username, password }: { username: string; password: string }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
    }
    navigate("/");
    return data;
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return { signIn, signOut };
};
