import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";
import { Repository } from "../config/types";
import { parseRepository } from "../utils/helpers";

export const useRepository = () => {
  const [repository, setRepository] = useState<Repository>();
  const { id } = useParams();
  console.log(id);

  const { data } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  useEffect(() => {
    const raw: any = data?.repository;
    if (!raw) return;
    const parsed = parseRepository(raw);
    console.log("\n");
    setRepository(parsed);
  }, [data]);

  return repository;
};
