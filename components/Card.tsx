import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 16,
  },
});

export default Card;
