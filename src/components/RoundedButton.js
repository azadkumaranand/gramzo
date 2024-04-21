import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import fonts from "@const/fonts";

const RoundedButton = ({ children, onPress, width, color }) => {
  const pressHandler = () => {
    onPress();
  };
  return (
    // <LinearGradient
    //     colors={['#55A630', '#71C442']}
    //     style={styles.button}
    // >
    <Pressable
      style={[
        styles.button,
        { width: width ? width : "90%", backgroundColor: color },
      ]}
      onPress={pressHandler}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
    // </LinearGradient>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  button: {
    padding: 11,
    paddingVertical: 5,
    width: "90%",
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.PRIMARY_FONT_500,
  },
});
