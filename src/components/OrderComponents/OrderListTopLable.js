import { View, Text, StyleSheet } from "react-native";
import React from "react";
import fonts, { textStyle } from "@const/fonts";

const OrderListTopLable = () => {
  return (
    <View style={styles.ItemlistLable}>
      <View
        style={{
          width: "26%",
          // backgroundColor: "red"
        }}
      >
        <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#93908F")}>
          Date
        </Text>
      </View>

      <View style={styles.Box2}>
        <Text
          style={{
            width: "26%",
            ...textStyle(14, fonts.PRIMARY_FONT_500, "#93908F"),
          }}
        >
          Order ID
        </Text>
        <Text
          style={{
            width: "26%",
            ...textStyle(14, fonts.PRIMARY_FONT_500, "#93908F"),
          }}
        >
          Price(Rs)
        </Text>
        <Text
          style={{
            width: "26%",
            ...textStyle(14, fonts.PRIMARY_FONT_500, "#93908F"),
          }}
        >
          Action
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ItemlistLable: {
    flexDirection: "row",
    backgroundColor: "#EDEDED",
    // justifyContent: "space-between",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 13,
    paddingHorizontal: 10,
  },
  Box2: {
    flexDirection: "row",

    justifyContent: "space-around",
  },
});
export default OrderListTopLable;
