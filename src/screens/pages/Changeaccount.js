import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import upiImg from "@assets/upi.png";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import { useNavigation } from "@react-navigation/native";

const Changeaccount = () => {
  const navigation = useNavigation();
  const upiredirect = () => {
    navigation.navigate("Bankdetails");
  };

  const bankredirect = () => {
    navigation.navigate("Upidetails");
  };
  return (
    <View style={{ backgroundColor: "#FBFFF9", flex: 1 }}>
      <StoreHeaders lable={"Payment Settings"} navigation={true} />
      <View
        style={{
          marginHorizontal: 30,
          marginTop: 24,
          marginBottom: 20,
        }}
      >
        <Text style={styles.boldheadeing}>
          Choose an option to receive your payment
        </Text>
        <View style={styles.paymentOptionsBox}>
          <TouchableOpacity style={styles.paymentBox} onPress={upiredirect}>
            <View style={[styles.iconbox, { backgroundColor: "#EAFAFF" }]}>
              <FontAwesome name="bank" color="#009DCF" size={30} />
            </View>
            <View>
              <Text
                style={{
                  color: "#009DCF",
                  fontSize: 12,
                  fontFamily: fonts.PRIMARY_FONT_400,
                }}
              >
                Receive via bank
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentBox} onPress={bankredirect}>
            <View style={[styles.iconbox1, { backgroundColor: "#FCF8EB" }]}>
              <Image source={upiImg} />
            </View>
            <View>
              <Text
                style={{
                  color: "#E9B200",
                  fontSize: 12,
                  fontFamily: fonts.PRIMARY_FONT_400,
                }}
              >
                Receive via UPI ID
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Changeaccount;

const styles = StyleSheet.create({
  boldheadeing: {
    fontSize: 20,
    fontFamily: fonts.PRIMARY_FONT_600,
    lineHeight: 24,
    color: "#555",
  },
  paymentOptionsBox: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  paymentBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#555",
    paddingHorizontal: 30,
    paddingVertical: 11,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // marginHorizontal: 20,
  },
  iconbox: {
    padding: 10,
    borderRadius: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconbox1: {
    padding: 5,
    marginBottom: 10,
    borderRadius: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
