import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import { useSelector } from "react-redux";
import PrimaryButton from "@/PrimaryButton";
import NextButton from "@/OrderComponents/NextButton";
import fonts from "@const/fonts";
import colors from "@const/colors";

const transactionHistory = [
  {
    payoutDate: "4 march 2023",
    via: "upi",
    amount: "23421",
    upiId: "deepak.shukla012000@okaysbi",
  },
  {
    payoutDate: "4 march 2023",
    via: "bank",
    amount: "23421",
    upiId: "deepak.shukla012000@okaysbi",
  },
  {
    payoutDate: "4 march 2023",
    via: "upi",
    amount: "23421",
    upiId: "deepak.shukla012000@okaysbi",
  },
  {
    payoutDate: "4 march 2023",
    via: "bank",
    amount: "23421",
    upiId: "deepak.shukla012000@okaysbi",
  },
];

const Paymentsetting = () => {
  const navigation = useNavigation();
  const [searchValue, setsearchValue] = useState();
  const [paymentType, setPaymentType] = useState("bank");
  const { store } = useSelector((state) => state.vendor);

  var paymentSettings = store.payment_settings.filter(
    (ps) => ps.status === "active"
  );

  // console.log(paymentSettings);
  useEffect(() => {
    if (paymentSettings[0]?.type === "bank") {
      setsearchValue(paymentSettings[0]?.account_number);
      setPaymentType(paymentSettings[0]?.type);
    } else {
      setsearchValue(paymentSettings[0]?.upi_id);
      setPaymentType(paymentSettings[0]?.type);
    }
  }, [store]);
  const userAnotherAccount = () => {
    navigation.navigate("Changeaccount");
  };

  const searchItems = (text) => {};
  return (
    <>
      <View style={{ backgroundColor: colors.PRIMARY_BACKGROUND_COLOR }}>
        <StoreHeaders lable={"Payment Settings"} navigation={true} />
        <View style={{ marginHorizontal: 26, marginTop: 24, marginBottom: 10 }}>
          <Text style={styles.boldheadeing}>Added Account/UPI Details</Text>
          <View style={[styles.SearchBar]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 8,
                paddingVertical: 8,
              }}
            >
              {paymentSettings.length > 0 && (
                <TextInput
                  placeholder={"987654321678"}
                  placeholderTextColor="#777"
                  onChangeText={(text) => searchItems(text)}
                  value={searchValue}
                  style={{
                    width: 240,
                  }}
                  editable={false}
                />
              )}
              <View
                style={[
                  styles.payment_method,
                  {
                    backgroundColor: `${
                      paymentType === "upi" ? "#FCF8EB" : "#EAFAFF"
                    }`,
                  },
                ]}
              >
                {paymentType === "upi" ? (
                  <Text style={styles.viaUpi}>via UPI</Text>
                ) : (
                  <Text
                    style={[
                      styles.viaUpi,
                      {
                        color: "#009DCF",
                      },
                    ]}
                  >
                    via Bank
                  </Text>
                )}
              </View>
            </View>
          </View>

          
        <NextButton
          lable="Use another Account"
          handlechangeScrenn={userAnotherAccount}
        />
          {/* <View style={{ marginVertical: 20 }}>
            <PrimaryButton width="100%" onPress={userAnotherAccount}>
              <Text style={{ fontSize: 14, fontWeight: "700", lineHeight: 20 }}>
                Use another Account
              </Text>
            </PrimaryButton>
          </View> */}
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.PRIMARY_FONT_500,
              color: "#555",
              lineHeight: 28,
            }}
          >
            Transaction History
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 27,
          backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={styles.transction}> */}
          {transactionHistory.map((item, index) => {
            return (
              <View style={styles.transctionBox} key={index}>
                <View style={styles.boxLine1}>
                  <Text
                    style={{
                      color: "#93908F",
                      fontSize: 12,
                      fontFamily: fonts.PRIMARY_FONT_400,
                      lineHeight: 28,
                    }}
                  >
                    payout date: 4 march 2023
                  </Text>
                  <View
                    style={[
                      styles.payment_method,
                      {
                        backgroundColor:
                          item.via == "upi" ? "#FCF8EB" : "#EAFAFF",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.viaUpi,
                        {
                          color: item.via == "upi" ? "#E9B200" : "#009DCF",
                        },
                      ]}
                    >
                      via {item.via}
                    </Text>
                  </View>
                </View>
                <View style={styles.boxLine2}>
                  <Text
                    style={{
                      color: "#555",
                      fontFamily: fonts.PRIMARY_FONT_400,
                      fontSize: 14,
                      lineHeight: 28,
                    }}
                  >
                    deepak.shukla012000@okaysbi
                  </Text>
                  <Text
                    style={{
                      color: "#42AF10",
                      fontSize: 20,
                      fontFamily: fonts.PRIMARY_FONT_700,
                    }}
                  >
                    ₹23421
                  </Text>
                </View>
              </View>
            );
          })}
          {/* </View> */}
          <View style={{ marginBottom: 60 }}></View>
        </ScrollView>
      </View>
    </>
  );
};

export default Paymentsetting;

const styles = StyleSheet.create({
  boldheadeing: {
    fontSize: 20,
    fontFamily: fonts.PRIMARY_FONT_600,
    lineHeight: 24,
    color: "#555",
  },
  SearchBar: {
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    // paddingVertical: 8,
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
    // marginBottom: 10,
  },
  boxLine2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  payment_method: {
    borderRadius: 60,
    // backgroundColor: "#FCF8EB",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  viaUpi: {
    color: "#E9B200",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 12,
  },
  transctionBox: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 8,
    gap: 8,
  },
  transction: {
    // marginVertical: 20,
    // width: '100%',
    // height: '100%',
  },
});
