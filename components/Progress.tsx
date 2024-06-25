import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressProps {
  value: number;
}

const Progress = ({ value }: ProgressProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${value}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#007bff",
  },
});

export default Progress;
