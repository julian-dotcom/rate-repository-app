import { Repository } from "../config/types";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { parseRepository } from "../utils/helpers";
import { useDebounce } from "use-debounce";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const { data } = useQuery(GET_REPOSITORIES, {
    variables: { searchKeyword: debouncedQuery },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    console.log("fetched");
    const raw = data?.repositories?.edges;
    if (raw) {
      const processedRepos = Array.from(raw, (r: any) => parseRepository(r.node));
      setRepositories(processedRepos);
    }
  }, [data]);

  return { repositories, query, setQuery };
};
