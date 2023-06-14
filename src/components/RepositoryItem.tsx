import { Repository } from "../config/types";
import { View, Image, StyleSheet } from "react-native";

import { theme } from "../config/theme";
import RepoStat from "./RepoStat";
import Text from "./Text";
import LongButton from "./LongButton";
import * as Linking from "expo-linking";

const RepositoryItem = ({ repo, github = false }: { repo: Repository; github?: boolean }) => {
  return (
    <View style={styles.card}>
      <View style={styles.summary}>
        <Image style={styles.image} source={{ uri: repo.ownerAvatarUrl }} />
        <View testID="repositoryItem">
          <Text style={styles.nameText}>{repo.fullName}</Text>
          <Text testID="description" style={styles.descriptionText}>
            {repo.description}
          </Text>
          <View style={styles.repoLanguageBox}>
            <Text style={styles.repoLanguageText}>{repo.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.repoStatistics}>
        <RepoStat val={repo.stargazersCount} name="Stars" />
        <RepoStat val={repo.forksCount} name="Forks" />
        <RepoStat val={repo?.reviewCount || "n/a"} name="Reviews" />
        <RepoStat val={repo?.ratingAverage || "n/a"} name="Rating" />
      </View>
      {github && <LongButton text="Open in GitHub" func={() => Linking.openURL(repo.url)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
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
