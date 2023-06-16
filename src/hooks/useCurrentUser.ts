import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { parseUser } from "../utils/helpers";

export const useCurrentUser = (fetchReviews = false) => {
  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: fetchReviews },
    fetchPolicy: "cache-and-network",
  });

  const processed = parseUser(data);

  return { currentUser: processed, refetch };
};
