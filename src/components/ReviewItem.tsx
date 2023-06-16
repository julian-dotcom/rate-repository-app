import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Review } from "../config/types";
import { useNavigate } from "react-router-native";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
const formatDate = (date: string) => new Date(date).toLocaleDateString("de-DE", options);
const RATING_CIRCLE_HEIGHT = 50;
interface ReviewItemProps {
  review: Review;
  refetch?: () => Promise<ApolloQueryResult<any>>;
}

const ReviewItem = ({ review, refetch }: ReviewItemProps) => {
  const navigate = useNavigate();

  let title = "";
  if ("user" in review) {
    title = review.user.username;
  } else {
    title = review.repository.fullName;
  }

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.textUsername}>{title}</Text>
          <Text style={styles.textDate}>{formatDate(review.createdAt)}</Text>
          <Text style={styles.textRating} ellipsizeMode="tail">
            {review.text}
          </Text>
        </View>
      </View>
      {"repository" in review && refetch && (
        <View style={styles.buttonsBox}>
          <Pressable
            style={[styles.button, { backgroundColor: "#0366d6" }]}
            onPress={() => navigate(`/repositories/${review.repository.id}`)}
          >
            <Text style={styles.textButton}>View repository</Text>
          </Pressable>
          <DeleteButton reviewId={review.id} refetch={refetch} />
        </View>
      )}
    </View>
  );
};

interface DeleteButtonProps {
  reviewId: string;
  refetch: () => Promise<ApolloQueryResult<any>>;
}
const DeleteButton = ({ reviewId, refetch }: DeleteButtonProps) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const deleteAlert = () => {
    Alert.alert("Delete review", "Are you sure you want to delete this review?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Delete", onPress: () => deleteRepo() },
    ]);
  };
  const deleteRepo = async () => {
    await deleteReview({ variables: { deleteReviewId: reviewId } });
    refetch();
  };

  return (
    <Pressable
      style={[styles.button, { backgroundColor: "#D70040" }]}
      onPress={() => deleteAlert()}
    >
      <Text style={styles.textButton}>Delete review</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    gap: 20,
  },
  info: {
    gap: 10,
    flexDirection: "row",
  },
  buttonsBox: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  ratingCircle: {
    width: RATING_CIRCLE_HEIGHT,
    height: RATING_CIRCLE_HEIGHT,
    borderRadius: RATING_CIRCLE_HEIGHT / 2,
    borderColor: "#0366d6",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    fontWeight: "bold",
    color: "#0366d6",
  },
  textBox: {
    gap: 2,
    flexShrink: 1,
  },
  textButton: { color: "white", fontWeight: "bold" },
  textUsername: {
    fontWeight: "bold",
  },
  textDate: {
    color: "grey",
  },
  textRating: {
    flexWrap: "wrap",
  },
});

export default ReviewItem;
