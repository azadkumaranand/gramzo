import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import fonts from "@const/fonts";

const CheckBox = ({ label, isChecked, onClick }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onClick}
        style={{
          flexDirection: "row",
          // backgroundColor: isChecked ? "green" : "white",
          alignItems: "center",
          gap: 5,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: isChecked ? "rgba(100, 182, 58, 1)" : "white",
            borderWidth: isChecked ? null : 1,
            borderColor: "rgba(100, 182, 58, 1)",
            borderRadius: 1,
            marginRight: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isChecked && <Feather name="check" size={15} color="white" />}
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

export default CheckBox;
