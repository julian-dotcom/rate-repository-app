import { FlatList, View, Pressable } from "react-native";
import { Repository, SortType } from "../config/types";
import { useNavigate } from "react-router-native";
import { useRepositories } from "../hooks/useRepositories";
import { useEffect, useState } from "react";
import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";
import SortRepositories from "./SortRepositories";
import { PaperProvider } from "react-native-paper";
import { sortRepos } from "../utils/helpers";

export const RepositoryList = () => {
  const [sort, setSort] = useState<SortType>(SortType.LATEST);
  const { repositories } = useRepositories(sort);
  // const [sorted, setSorted] = useState<Repository[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const sorted = sortRepos(repositories, sort);

  //   setSorted(sorted);
  // }, [repositories, sort]);

  console.log(
    repositories.map((s) => ({
      name: s.fullName,
      createdAt: s.createdAt,
      ratingAverage: s.ratingAverage,
    }))
  );
  return (
    <PaperProvider>
      <View>
        <FlatList
          data={repositories}
          extraData={repositories}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={<SortRepositories setSort={setSort} />}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigate(`repositories/${item.id}`)}>
              <RepositoryItem repo={item} />
            </Pressable>
          )}
        />
      </View>
    </PaperProvider>
  );
};

export default RepositoryList;
