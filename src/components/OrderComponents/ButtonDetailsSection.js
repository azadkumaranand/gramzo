import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Loader from "../Loader";

const ButtonDetails = ({ handleAccept, handleReject }) => {
  const [isLoading, setIsLoading] = useState(false);

  const AcceptOrder = async () => {
    setIsLoading(true);
    await handleAccept();
    setIsLoading(false);
  };

  return (
    <View style={styles.Bottom_Button}>
      <TouchableOpacity style={styles.Reject} onPress={handleReject}>
        <Text
          style={{
            fontSize: 14,
            color: "rgba(237, 28, 36, 1)",
            fontFamily: fonts.PRIMARY_FONT_600,
          }}
        >
          Reject
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isLoading}
        style={{
          ...styles.accept,
          backgroundColor: isLoading ? "rgba(66, 175, 16, 0.5)" : "#42AF10",
        }}
        onPress={AcceptOrder}
      >
        {isLoading ? (
          <Loader size={26} color="#fff" />
        ) : (
          <Text
            style={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 1)",
              fontFamily: fonts.PRIMARY_FONT_600,
            }}
          >
            Accept
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Bottom_Button: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginVertical: 20,
  },
  accept: {
    borderRadius: 71,
    backgroundColor: "#42AF10",
    width: "47%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  Reject: {
    borderRadius: 71,
    borderWidth: 1,
    borderColor: "red",
    width: "47%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ButtonDetails;
