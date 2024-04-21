import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import { useNavigation } from "@react-navigation/native";

const Payout = () => {
  const navigation = useNavigation();
  const [searchValue, setsearchValue] = useState("");
  const userAnotherAccount = () => {
    navigation.navigate("changeAccount");
  };

  const transactionHistory = [
    {
      cycleId: "453452",
      orderId: "#5004563",
      payoutDate: "4th March",
      deliveryDate: "28 Jan, 05:10pm",
      via: "upi",
      amount: "23421",
      upiId: "deepak.shukla012000@okaysbi",
      status: "pending",
      currentPayOutCycle: "26th Feb - 2nd March",
      totalOrders: "456",
      totalAmount: "₹23421",
      earning: 567,
    },
    {
      cycleId: "453452",
      orderId: "#5004563",
      payoutDate: "4th March",
      deliveryDate: "28 Jan, 05:10pm",
      via: "upi",
      amount: "23421",
      upiId: "deepak.shukla012000@okaysbi",
      status: "released",
      currentPayOutCycle: "26th Feb - 2nd March",
      totalOrders: "456",
      totalAmount: "₹23421",
      earning: 567,
    },
    {
      cycleId: "453452",
      orderId: "#5004563",
      payoutDate: "4th March",
      deliveryDate: "28 Jan, 05:10pm",
      via: "upi",
      amount: "23421",
      upiId: "deepak.shukla012000@okaysbi",
      status: "pending",
      currentPayOutCycle: "26th Feb - 2nd March",
      totalOrders: "456",
      totalAmount: "₹23421",
      earning: 567,
    },
    {
      cycleId: "453452",
      orderId: "#5004563",
      payoutDate: "4th March",
      deliveryDate: "28 Jan, 05:10pm",
      via: "upi",
      amount: "23421",
      upiId: "deepak.shukla012000@okaysbi",
      status: "pending",
      currentPayOutCycle: "26th Feb - 2nd March",
      totalOrders: "456",
      totalAmount: "₹23421",
      earning: 567,
    },
    {
      cycleId: "453452",
      orderId: "#5004563",
      payoutDate: "4th March",
      deliveryDate: "28 Jan, 05:10pm",
      via: "upi",
      amount: "23421",
      upiId: "deepak.shukla012000@okaysbi",
      status: "released",
      currentPayOutCycle: "26th Feb - 2nd March",
      totalOrders: "456",
      totalAmount: "₹23421",
      earning: 567,
    },
  ];

  return (
    <>
      <View>
        <StoreHeaders lable={"Your Payouts"} navigation={true} />
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          paddingHorizontal: 11,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.transction}>
            {transactionHistory.map((item, index) => {
              return (
                <View style={styles.transctionBox} key={index}>
                  <View style={styles.boxLine1}>
                    <Text
                      style={{
                        color: "#FB7D13",
                        fontSize: 12,
                        fontFamily: fonts.PRIMARY_FONT_400,
                        lineHeight: 28,
                      }}
                    >
                      CYCLE ID: #{item.cycleId}
                    </Text>

                    <View
                      style={{
                        borderRadius: 100,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        backgroundColor:
                          item.status == "pending" ? "#F3F3F3" : "#E5FFD9",
                      }}
                    >
                      <Text
                        style={[
                          styles.viaUpi,
                          {
                            color:
                              item.status == "pending" ? "#1B1816" : "#55A630",
                          },
                        ]}
                      >
                        {item.status == "pending" ? "pending" : "released"}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.boxLine1]}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: fonts.PRIMARY_FONT_400,
                          color: "#93908F",
                          lineHeight: 20,
                          letterSpacing: 0.84,
                        }}
                      >
                        CURRENT PAYOUT CYCLE
                      </Text>
                      <Text
                        style={{
                          color: "#555",
                          fontSize: 14,
                          fontFamily: fonts.PRIMARY_FONT_600,
                          lineHeight: 20,
                        }}
                      >
                        {item.currentPayOutCycle}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingRight: 48,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: fonts.PRIMARY_FONT_400,
                          color: "#93908F",
                          letterSpacing: 0.84,
                          lineHeight: 20,
                        }}
                      >
                        PAYOUT DATE
                      </Text>
                      <Text
                        style={{
                          color: "#555",
                          fontSize: 14,
                          fontFamily: fonts.PRIMARY_FONT_600,
                          lineHeight: 20,
                        }}
                      >
                        {item.payoutDate}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.boxLine2}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: fonts.PRIMARY_FONT_400,
                          color: "#93908F",
                          letterSpacing: 0.84,
                          // lineHeight: 20,
                        }}
                      >
                        YOUR HARD WORK
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#42AF10",
                            fontSize: 20,
                            fontFamily: fonts.PRIMARY_FONT_700,
                          }}
                        >
                          {item.totalAmount}
                        </Text>
                        <Text
                          style={{
                            color: "#555",
                            fontSize: 14,
                            fontFamily: fonts.PRIMARY_FONT_500,
                          }}
                        >
                          456 orders
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#F3F3F3",
                        paddingHorizontal: 23,
                        paddingVertical: 9,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        navigation.navigate("Payoutdetails");
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: fonts.PRIMARY_FONT_600,
                          color: "#555",
                        }}
                      >
                        View Payouts
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Payout;

const styles = StyleSheet.create({
  boldheadeing: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    color: "#555",
  },
  SearchBar: {
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: "#5555",
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  boxLine1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: 10,
  },
  boxLine2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  viaUpi: {
    borderRadius: 20,
    fontSize: 12,
    fontFamily: fonts.PRIMARY_FONT_400,
    lineHeight: 16,
  },
  transctionBox: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    borderRadius: 10,
    gap: 10,
  },
  transction: {
    gap: 16,
    marginTop: 24,
    // marginVertical: 20,
    // width: '100%',
    // height: '100%',
    // backgroundColor: "#fff",
  },
});
