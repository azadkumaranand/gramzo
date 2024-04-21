import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import HeaderStyle from "@const/HeaderStyle";
import fonts, { textStyle } from "@const/fonts";
import { useNavigation } from "@react-navigation/native";

const ProductHeader = ({ selectedProductsCount }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainconatiner}>
      <View style={styles.Textbox}>
        <Text style={styles.Header}>Select your products</Text>
      </View>

      {selectedProductsCount == 0 && (
        <TouchableOpacity
          style={styles.SkipButton}
          onPress={() => navigation.navigate("ParentScreen")}
        >
          <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "white")}>
            Skip
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  SkipButton: {
    borderBottomWidth: 1.5,
    borderColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 1,
  },

  mainconatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#71C442",
    height: HeaderStyle.height,
    paddingHorizontal: 25,
    paddingTop: HeaderStyle.top,
  },
  Textbox: {
    // position: "absolute",
    // bottom: 15,
    // left: 20
  },
  Header: {
    fontSize: 20,
    fontFamily: "Mukta-600",
    color: "rgba(255, 255, 255, 1)",
  },
});
export default ProductHeader;
