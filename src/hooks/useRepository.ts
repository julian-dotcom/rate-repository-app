import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";
import { Repository } from "../config/types";
import { parseRepository } from "../utils/helpers";

const REVIEWS_FIRST = 4;

export const useRepository = () => {
  const [repository, setRepository] = useState<Repository>();
  const { id } = useParams();

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id, reviewsFirst: REVIEWS_FIRST },
  });

  useEffect(() => {
    const raw = data?.repository;
    if (!raw) return;
    const parsed = parseRepository(raw);
    setRepository(parsed);
  }, [data]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      variables: {
        reviewsAfter: data.repository.reviews.pageInfo.endCursor,
        reviewsFirst: REVIEWS_FIRST,
        repositoryId: id,
      },
    });
  };

  return { repository, fetchMore: handleFetchMore, loading };
};
