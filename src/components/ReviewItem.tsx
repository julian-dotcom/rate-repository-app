import { View, Text, StyleSheet } from "react-native";
import { Review } from "../config/types";

const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
const formatDate = (date: string) => new Date(date).toLocaleDateString("de-DE", options);
const RATING_CIRCLE_HEIGHT = 50;

const ReviewItem = ({ review }: { review: Review }) => {
  console.log(review.createdAt);
  return (
    <View style={styles.card}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.textUsername}>{review.user.username}</Text>
        <Text style={styles.textDate}>{formatDate(review.createdAt)}</Text>
        <Text style={styles.textRating} ellipsizeMode="tail">
          {review.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    gap: 10,
    borderRadius: 10,
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
