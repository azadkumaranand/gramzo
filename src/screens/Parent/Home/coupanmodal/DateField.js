import { View, Text, StyleSheet } from "react-native";
import React from "react";
import fonts from "@const/fonts";

const DateField = ({ placeholder }) => {
  return (
    <View style={styles.datepickerfield}>
      <Text style={{ color: "#aaa", fontFamily: fonts.PRIMARY_FONT_400 }}>
        {placeholder}
      </Text>
    </View>
  );
};

export default DateField;

const styles = StyleSheet.create({
  datepickerfield: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 30,
  },
});
