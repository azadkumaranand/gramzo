import React from "react";
import { Text, StyleSheet } from "react-native";
import fonts from "@const/fonts";

const Paragraph = ({ children, textAlignC, margin, color }) => {
  return (
    <Text
      style={[
        styles.paragraph,
        {
          textAlign: textAlignC ? "center" : "auto",
          marginTop: margin,
          color: color ? color : "#fff",
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default Paragraph;

const styles = StyleSheet.create({
  paragraph: {
    color: "#fff",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 14,
    textAlign: "center",
  },
});
