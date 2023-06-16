import { FlatList, View, Pressable } from "react-native";
import { PaperProvider, Searchbar } from "react-native-paper";
import { Repository } from "../config/types";
import { sortRepos } from "../utils/helpers";
import { SortType } from "../config/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-native";
import { useRepositories } from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";
import SortRepositories from "./SortRepositories";

export const RepositoryList = () => {
  const [sort, setSort] = useState<SortType>(SortType.LATEST);
  const [sortedRepos, setSortedRepos] = useState<Repository[]>([]);
  const { repositories, query, setQuery } = useRepositories();
  const navigate = useNavigate();

  useEffect(() => {
    const sorted = sortRepos(repositories, sort);
    setSortedRepos([...sorted]);
  }, [repositories, sort]);

  return (
    <PaperProvider>
      <View>
        <FlatList
          data={sortedRepos}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={
            <>
              <Searchbar
                placeholder="Search"
                onChangeText={(input) => setQuery(input)}
                value={query}
              />
              <SortRepositories setSort={setSort} />
            </>
          }
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
