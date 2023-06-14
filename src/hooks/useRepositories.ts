import { Repository } from "../config/types";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { parseRepository } from "../utils/helpers";
import { SortType } from "../config/types";
import { sortRepos } from "../utils/helpers";

export const useRepositories = (sort: SortType) => {
  const [originalRepositories, setOriginalRepositories] = useState<Repository[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const { data } = useQuery(GET_REPOSITORIES, { fetchPolicy: "cache-and-network" });

  useEffect(() => {
    const res = data?.repositories?.edges;
    if (res) {
      const processedRepos = Array.from(res, (r: any) => parseRepository(r.node));
      setOriginalRepositories(processedRepos);
    }
  }, [data]);

  useEffect(() => {
    const sorted = sortRepos(originalRepositories, sort);
    setRepositories([...sorted]);
  }, [originalRepositories, sort]);

  return { repositories };
};
