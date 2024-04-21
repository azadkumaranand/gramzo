import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import fonts from "@const/fonts";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/core";
import HeaderStyle from "@const/HeaderStyle";

const StoreHeaders = ({ lable, money, navigation, handlnavigation }) => {
  const n = useNavigation();
  return (
    <View style={styles.Maincontainer}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {navigation && (
          <TouchableOpacity
            style={styles.button}
            onPress={handlnavigation ? handlnavigation : n.goBack}
          >
            <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <Text
          style={{
            fontFamily: fonts.PRIMARY_FONT_600,
            fontSize: 18,
            color: "#FFFFFF",
          }}
        >
          {lable}
        </Text>
      </View>

      {money && (
        <TouchableOpacity style={styles.Right} onPress={() => n.navigate("Paymentsetting")}>
          <Text
            style={{
              fontFamily: fonts.PRIMARY_FONT_700,
              fontSize: 17,
              color: "#42AF10",
            }}
          >
            ₹ 0
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Maincontainer: {
    // width: "100%",
    height: HeaderStyle.height,
    // paddingBottom: 20,
    paddingHorizontal: 25,
    paddingTop: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.HEADER_GREEN_COLOR,
    // backgroundColor: "red"
  },
  Right: {
    paddingHorizontal: 25,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 77,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
export default StoreHeaders;
