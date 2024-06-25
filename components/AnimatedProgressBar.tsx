import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

interface AnimatedProgressBarProps {
  value: number;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({ value }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
});

export default AnimatedProgressBar;
