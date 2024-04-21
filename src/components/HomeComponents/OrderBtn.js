import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "@const/colors";
import fonts from "@const/fonts";
// import LinearGradient from 'react-native-linear-gradient';

const OrderBtn = ({ children, onPress, width, type }) => {
  const pressHandler = () => {
    onPress();
  };
  return (
    <Pressable
      style={[
        styles.button,
        {
          width: width ? width : "90%",
          backgroundColor:
            type === "food" ? colors.PRIMARY_GREEN_COLOR : colors.ORANGE_SHADE,
        },
      ]}
      onPress={pressHandler}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default OrderBtn;

const styles = StyleSheet.create({
  button: {
    padding: 6,
    width: "90%",
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    fontFamily: fonts.PRIMARY_FONT_500,
  },
});
