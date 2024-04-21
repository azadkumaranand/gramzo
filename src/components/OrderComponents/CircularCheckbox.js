import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import fonts from "@const/fonts";

const CircularCheckbox = ({ label, isChecked, onClick }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onClick}
        style={{
          flexDirection: "row",
          // backgroundColor: isChecked ? "green" : "white",
          alignItems: "center",
          gap: 7,
        }}
      >
        <View
          style={{
            width: 16,
            height: 16,
            backgroundColor: isChecked ? "#404040" : "#FFFFFF",
            borderWidth: isChecked ? null : 1,
            borderColor: "#404040",
            borderRadius: 9999,
            // marginRight: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isChecked && <Feather name="check" size={13} color="white" />}
        </View>
        <Text
          style={{
            color: "#333",
            fontFamily: fonts.PRIMARY_FONT_400,
            fontSize: 14,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CircularCheckbox;
