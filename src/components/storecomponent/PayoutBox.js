import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import fonts from "@const/fonts";

const PayoutBox = ({ lable, date, button, onhandlechange, disabled }) => {
  return (
    <View style={styles.Payouts}>
      <View style={styles.PayoutsLeft}>
        <Text
          style={{
            fontFamily: fonts.PRIMARY_FONT_400,
            fontSize: 14,
            color: "#404040",
          }}
        >
          {lable}
        </Text>
        <Text
          style={{
            fontFamily: fonts.PRIMARY_FONT_400,
            fontSize: 14,
            color: "#42AF10",
          }}
        >
          {date}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.PayoutsRight}
        onPress={onhandlechange}
        disabled={disabled}
      >
        <Text
          style={{
            fontFamily: fonts.PRIMARY_FONT_400,
            fontSize: 14,
            color: "#555555",
          }}
        >
          {button}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PayoutsLeft: {
    flexDirection: "row",
    gap: 10,
  },
  Payouts: {
    marginTop: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
  PayoutsRight: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: "#E3E3E3",
    borderRadius: 999,
  },
});
export default PayoutBox;
