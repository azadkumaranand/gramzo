import { View, Text } from "react-native";
import React from "react";
import fonts from "@const/fonts";

const DeliveryDetailsSection = ({ item }) => {
  return (
    <>
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingVertical: 7,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: fonts.PRIMARY_FONT_400,
            color: "#404040",
          }}
        >
          Order delivered at 2 April 2023 at 3:15pm
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#C2C2C2",
            fontFamily: fonts.PRIMARY_FONT_400,
          }}
        >
          by Raghav Kumar
        </Text>
      </View>
    </>
  );
};

export default DeliveryDetailsSection;
