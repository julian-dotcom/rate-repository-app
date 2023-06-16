import { View, Text, FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";
import { useRepository } from "../hooks/useRepository";
import { Review } from "../config/types";

const SingleRepository = () => {
  const { repository, fetchMore, loading } = useRepository();
  return (
    <View>
      {repository && (
        <FlatList
          data={repository.reviews}
          renderItem={({ item }: { item: Review }) => <ReviewItem review={item} />}
          keyExtractor={({ id }: { id: string }) => id}
          ListHeaderComponent={() => <RepositoryItem repo={repository} github />}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={() => fetchMore()}
          onEndReachedThreshold={0.5}
        />
      )}
      {loading && <Text>Loading...</Text>}
    </View>
  );
};

export default SingleRepository;
