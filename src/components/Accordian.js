import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import fonts from "../constants/fonts";
import colors from "@const/colors";

const AccordionItem = ({
  isExpanded,
  content,
  clickedIndex,
  index,
  separator,
}) => {
  return (
    <>
      {isExpanded && index == clickedIndex && (
        <>
          {separator && <View style={styles.divider}></View>}
          <View
            style={[
              styles.listContainer,
              { backgroundColor: separator ? colors.PRIMARY_BACKGROUND_COLOR : "FBFFF9" },
            ]}
          >
            {content.map((item, index) => (
              <Text key={index} style={styles.listItem}>
                {separator && "•"} {item}
              </Text>
            ))}
          </View>
        </>
      )}
    </>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  titleContainer: {
    // padding: 10,
    backgroundColor: "#EBFFEB",
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.PRIMARY_FONT_500,
  },
  listContainer: {
    backgroundColor: "#EBFFEB",
    // marginBottom: 20,
  },
  listItem: {
    fontSize: 14,
    marginVertical: 2,
    fontWeight: "400",
    fontFamily: fonts.PRIMARY_FONT_400,
    color: "#555",
  },
  divider: {
    flex: 1,
    borderStyle: "dashed",
    borderWidth: 0.4,
    borderColor: "#555",
    marginTop: 20,
    marginBottom: 10,
  },
});
