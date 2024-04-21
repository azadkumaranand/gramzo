import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import fonts from "@const/fonts";
import Loader from "@/Loader";

const NextButton = ({ lable, handlechangeScrenn, disabled, isLoading }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.maincontainer,
        backgroundColor: disabled
          ? "rgba(66, 175, 16,0.6)"
          : "rgba(66, 175, 16, 1)",
      }}
      disabled={disabled}
      onPress={() => handlechangeScrenn()}
    >
      {isLoading ? <Loader size={30} p={0} color={"#FFFFFF"} /> : (<Text
        style={{
          fontFamily: fonts.PRIMARY_FONT_700,
          fontSize: 14,
          color: "#FFFFFF",
        }}
      >
        {lable}
      </Text>)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 91,
    // marginHorizontal: 20,
    marginVertical: 20,
  },
});
export default NextButton;
