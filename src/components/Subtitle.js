import React from "react";
import { Text, StyleSheet } from "react-native";
import fonts from "@const/fonts";

const Subtitle = ({ children, color, textAlignC, margin, ...props }) => {
  return (
    <Text
      style={[
        styles.subtitle,
        {
          textAlign: textAlignC ? "center" : "auto",
          marginTop: margin,
          color: color ? color : "#fff",
          marginBottom: margin,
          ...props,
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    fontFamily: fonts.PRIMARY_FONT_500,
    marginHorizontal: 15
  },
});
