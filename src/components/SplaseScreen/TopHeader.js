import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TopHeader = ({ Screens, index }) => {
  const windowWidth = Dimensions.get("window").width;
  const [progressValues] = useState({
    first: new Animated.Value(0),
    second: new Animated.Value(0),
    Third: new Animated.Value(0),
  });

  useEffect(() => {
    // Start progress animation for current index
    animateProgress(index);
  }, [index]);

  const animateProgress = (currentIndex) => {
    // Reset progress values
    for (const key in progressValues) {
      progressValues[key].setValue(0);
    }

    // Start animation for the current index
    const progressToAnimate = progressValues[currentIndex];
    Animated.timing(progressToAnimate, {
      toValue: 1,
      duration: 5000, // 10 seconds
      useNativeDriver: false,
    }).start();
  };

  const renderProgressBar = (key) => {
    const progressToRender = progressValues[key];
    const interpolatedWidth = progressToRender.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    });

    return (
      <View key={key} style={{ width: windowWidth / 3.6, ...styles.container }}>
        {index === key && (
          <Animated.View
            key={`${key}-progress`}
            style={[styles.progressBar, { width: interpolatedWidth }]}
          />
        )}
      </View>
    );
  };

  return (
    <>
      <View style={styles.container1}>
        {Object.keys(progressValues).map((key) => renderProgressBar(key))}
      </View>

      <LinearGradient
        colors={["rgba(0, 0, 0, 0.00)", "rgba(0, 0, 0, 0.72)", "#000"]}
        style={{ height: 150, position: "absolute", bottom: 0, width: "100%" }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>{Screens}</Text>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    gap: 20,
  },
  container: {
    height: 4,
    backgroundColor: "rgba(208, 208, 208, 1)",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 1)", // Change color as needed
  },
});

export default TopHeader;
