import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

export const useCurrentUser = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  });

  return { currentUser: data?.me };
};
