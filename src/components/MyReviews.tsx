import { View, FlatList } from "react-native";
import { useCurrentUser } from "../hooks/useCurrentUser";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";

const MyReviews = () => {
  const { currentUser, refetch } = useCurrentUser(true);
  return (
    <View>
      <FlatList
        data={currentUser?.reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      />
    </View>
  );
};

export default MyReviews;
