import { Repository } from "../config/types";
import { View, Image, StyleSheet } from "react-native";

import { theme } from "../config/theme";
import RepoStat from "./RepoStat";
import Text from "./Text";

const RepositoryItem = ({ repo }: { repo: Repository }) => {
  return (
    <View style={styles.card}>
      <View style={styles.summary}>
        <Image style={styles.image} source={{ uri: repo.ownerAvatarUrl }} />
        <View>
          <Text style={styles.nameText}>{repo.fullName}</Text>
          <Text style={styles.descriptionText}>{repo.description}</Text>
          <View style={styles.repoLanguageBox}>
            <Text style={styles.repoLanguageText}>{repo.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.repoStatistics}>
        <RepoStat num={repo.stargazersCount} name="Stars" />
        <RepoStat num={repo.forksCount} name="Forks" />
        <RepoStat num={repo.reviewCount || 0} name="Reviews" />
        <RepoStat num={repo?.ratingAverage || 0} name="Rating" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
  },
  descriptionText: {
    fontSize: 17,
    color: theme.colors.textSecondary,
    paddingVertical: 7,
  },
  image: {
    borderRadius: 5,
    width: 70,
    height: 70,
    marginRight: 10,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  repoLanguageBox: {
    backgroundColor: "#0366d6",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 5,
    alignSelf: "flex-start",
  },
  repoLanguageText: {
    color: "white",
    fontSize: 17,
  },
  repoStatistics: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
  },
  summary: {
    flexDirection: "row",
  },
});

export default RepositoryItem;
