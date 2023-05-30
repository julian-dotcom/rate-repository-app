import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useAuthStorage } from "./useAuthStorage";

export const useSignIn = (): [
  ({ username, password }: { username: string; password: string }) => Promise<any>,
  any
] => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }: { username: string; password: string }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    console.log(data);
    return data;
  };
  return [signIn, result];
};
