import React, { ReactNode } from "react";
import { View } from "react-native";

interface CardContentProps {
  children: ReactNode;
}

const CardContent = ({ children }: CardContentProps) => {
  return <View>{children}</View>;
};

export default CardContent;
