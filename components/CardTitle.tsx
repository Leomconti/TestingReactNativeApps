import React, { ReactNode } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface CardTitleProps {
  children: ReactNode;
  style?: TextStyle;
}

const CardTitle = ({ children, style }: CardTitleProps) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CardTitle;
