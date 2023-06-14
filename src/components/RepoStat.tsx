import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../config/theme";
import Text from "./Text";
const SUFFIXES = ["", "k", "m", "b", "t"];

const RepoStat = ({ val, name }: { val: number | string; name: string }) => {
  let simplified;
  if (typeof val === "number") {
    const suffixIndex = Math.floor((val.toString().length - 1) / 3);
    let simplifiedNumber = (val / Math.pow(1000, suffixIndex)).toFixed(1);
    // Remove trailing ".0" if present
    if (simplifiedNumber.endsWith(".0")) simplifiedNumber = simplifiedNumber.slice(0, -2);
    simplified = simplifiedNumber + SUFFIXES[suffixIndex];
  }
  return (
    <View style={styles.box}>
      <Text style={styles.statNumber}>{simplified || val}</Text>
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
