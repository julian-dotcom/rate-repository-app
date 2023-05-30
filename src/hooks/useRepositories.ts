import { Repository } from "../config/types";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { parseString, parseNumber } from "../config/utils";

const processRepository = (repo: any): Repository => {
  const parsed: Repository = {
    id: parseString("id", repo),
    fullName: parseString("fullName", repo),
    description: parseString("description", repo),
    language: parseString("language", repo),
    forksCount: parseNumber("forksCount", repo),
    stargazersCount: parseNumber("stargazersCount", repo),
    ownerAvatarUrl: parseString("ownerAvatarUrl", repo),
    ...(repo.ratingAverage && { ratingAverage: parseNumber("ratingAverage", repo) }),
    ...(repo.reviewCount && { reviewCount: parseNumber("reviewCount", repo) }),
  };

  return parsed;
};
export const useRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const { data } = useQuery(GET_REPOSITORIES, { fetchPolicy: "cache-and-network" });

  useEffect(() => {
    const res = data?.repositories?.edges;
    if (res) {
      const processedRepos = Array.from(res, (r: any) => processRepository(r.node));
      setRepositories(processedRepos);
    }
  }, [data]);

  return { repositories };
};
