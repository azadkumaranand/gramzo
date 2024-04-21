import { View, ActivityIndicator } from "react-native";
import React from "react";

const Loader = ({ size = 60, color = "#FFAC74", p = 10, absolute }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: p,
        // aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        ...(absolute && { position: "absolute" }),
      }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;
