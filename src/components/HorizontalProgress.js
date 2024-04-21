import { View, Text } from "react-native";
import React from "react";
import fonts from "@const/fonts";

const HorizontalProgress = ({ Raing, Percent }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
        gap: 10,
        // backgroundColor:"red",
        width: 320,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontFamily: fonts.PRIMARY_FONT_400,
          color: "#404040",
        }}
      >
        {Raing} Star
      </Text>

      <View
        style={{
          backgroundColor: "rgba(217, 217, 217, 1)",
          borderRadius: 999,
          height: 12,
          width: 220,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(243, 198, 35, 1)",
            borderRadius: 999,
            width: `${Percent}`,
            height: 12,
          }}
        ></View>
      </View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: fonts.PRIMARY_FONT_400,
          color: "#404040",
        }}
      >
        {Percent}
      </Text>
    </View>
  );
};

export default HorizontalProgress;
