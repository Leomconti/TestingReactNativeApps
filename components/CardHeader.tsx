import React, { ReactNode } from "react";
import { View } from "react-native";

interface CardHeaderProps {
  children: ReactNode;
}

const CardHeader = ({ children }: CardHeaderProps) => {
  return <View>{children}</View>;
};

export default CardHeader;
