import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../config/theme";
import Text from "./Text";

const RepoStat = ({ num, name }: { num: number; name: string }) => {
  const suffixes = ["", "k", "m", "b", "t"];
  const suffixIndex = Math.floor((num.toString().length - 1) / 3);
  let simplifiedNumber = (num / Math.pow(1000, suffixIndex)).toFixed(1);
  // Remove trailing ".0" if present
  if (simplifiedNumber.endsWith(".0")) simplifiedNumber = simplifiedNumber.slice(0, -2);
  const simplified = simplifiedNumber + suffixes[suffixIndex];

  return (
    <View style={styles.box}>
      <Text style={styles.statNumber}>{simplified}</Text>
      <Text style={styles.statName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { alignItems: "center" },
  statNumber: {
    fontWeight: "bold",
  },
  statName: {
    color: theme.colors.textSecondary,
  },
});
export default RepoStat;
