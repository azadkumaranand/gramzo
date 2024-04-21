import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PayoutBox from "@/storecomponent/PayoutBox";
import fonts, { textStyle } from "@const/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import ToggleSwitch from "toggle-switch-react-native";
import LogoutModal from "../../pages/LogoutModal";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import AfterHeaderPart from "@/storecomponent/AfterHeaderPart";
import { changeStoreStatus } from "@rdx/VendorSlice";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import colors from "@const/colors";
// import Share from 'react-nativeshare';

const MyStoreScreen = () => {
  const dispatch = useDispatch();
  const { params } = useRoute();

  const { store, isLoading, user } = useSelector((state) => state.vendor);
  const [AcceeptingOrder, setAcceeptingOrder] = useState(
    store?.status === "open"
  );

  const [chooseLanguage, setchooseLanguage] = useState(
    params?.languange || "English"
  );

  // const handleShare = async () => {
  //   try {
  //     const options = {
  //       url: shareContent.url, // URL to your website
  //       title: shareContent.title,
  //       message: shareContent.message,
  //       imageUrl: shareContent.imageUrl, // URL of the image to share
  //     };

  //     await Share.open(options);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onToggle = () => {
    setAcceeptingOrder(!AcceeptingOrder);
    dispatch(changeStoreStatus()).then((err) => {
      if (err) setAcceeptingOrder(store.status === "open");
    });
  };

  const navigation = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!logoutModalVisible);
  };

  return (
    <SafeAreaView style={styles.Maincontainer}>
      <LogoutModal
        visible={logoutModalVisible}
        handleClose={toggleLogoutModal}
      />
      {/* <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#71C442"
        translucent={true}
      /> */}
      <StoreHeaders lable={store?.store_name || "My Store"} money={true} />

      <ScrollView>
        <View style={{ marginBottom: 80 }}>
          <View style={styles.AfterHeader}>
            <AfterHeaderPart />
          </View>

          <View style={styles.acceptOrder}>
            <View style={styles.acceptOrderleft}>
              <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#404040")}>
                Accepting Order
              </Text>

              <View>
                <ToggleSwitch
                  isOn={AcceeptingOrder}
                  onColor="green"
                  offColor="rgba(85, 85, 85, 1)"
                  labelStyle={{ color: "black", fontWeight: "900" }}
                  size="small"
                  onToggle={onToggle}
                  disabled={isLoading}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.acceptOrderRight}
              onPress={() => navigation.navigate("ChooseLanguage")}
            >
              <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#404040")}>
                Language
              </Text>
              <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#93908F")}>
                {chooseLanguage}
              </Text>
              <AntDesign name="right" size={12} color="#93908F" />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <PayoutBox
              lable={"Payouts"}
              date={"26th Feb - 2nd March"}
              button={"View"}
              onhandlechange={() => navigation.navigate("Payout")}
            />

            <View style={styles.StoreSetting}>
              <Text style={textStyle(16, fonts.PRIMARY_FONT_600, "#555555")}>
                {store?.store_name} Settings
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.settingComponent}
                  onPress={() => {
                    navigation.navigate("Coupan");
                  }}
                >
                  <View style={styles.icons}>
                    <Feather name="gift" size={27} color="#FB7D13" />
                  </View>
                  {/* <View
                    style={{
                      alignItems: "center",
                    }}
                  > */}
                  <Text
                    style={{
                      ...textStyle(14, fonts.PRIMARY_FONT_500, "#93908F"),
                      width: 65,
                      lineHeight: 18,
                      textAlign: "center",
                    }}
                  >
                    Coupons & Discounts
                  </Text>
                  {/* <Text
                      style={textStyle(14, fonts.PRIMARY_FONT_500, "#93908F")}
                    >
                      Discounts
                    </Text> */}
                  {/* </View> */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.settingComponent}
                  onPress={() => {
                    navigation.navigate("PickupAndDellivery");
                  }}
                >
                  <View style={styles.icons}>
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      size={27}
                      color="#FB7D13"
                    />
                  </View>
                  {/* <View
                    style={{
                      alignItems: "center",
                    }}
                  > */}
                  <Text
                    style={{
                      ...textStyle(14, fonts.PRIMARY_FONT_500, "#93908F"),
                      width: 56,
                      lineHeight: 18,
                      textAlign: "center",
                    }}
                  >
                    Pickup & Delivery
                  </Text>
                  {/* <Text
                      style={textStyle(14, fonts.PRIMARY_FONT_500, "#93908F")}
                    >
                      Delivery
                    </Text> */}
                  {/* </View> */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.settingComponent}
                  onPress={() => navigation.navigate("Paymentsetting")}
                >
                  <View style={styles.icons}>
                    <MaterialIcons name="payment" size={27} color="#FB7D13" />
                  </View>
                  {/* <View
                    style={{
                      alignItems: "center",
                    }}
                  > */}
                  <Text
                    style={{
                      ...textStyle(14, fonts.PRIMARY_FONT_500, "#93908F"),
                      width: 56,
                      lineHeight: 18,
                      textAlign: "center",
                    }}
                  >
                    Payment Setting
                  </Text>
                  {/* <Text
                      style={textStyle(14, fonts.PRIMARY_FONT_500, "#93908F")}
                    >
                      Setting
                    </Text> */}
                  {/* </View> */}
                </TouchableOpacity>
              </View>
            </View>

            <PayoutBox
              lable={"KYC Status :"}
              date={"Pending"}
              button={"Verify Now"}
              onhandlechange={() => {
                navigation.navigate("KYC_varification");
              }}
              // disabled
            />

            <View style={styles.Other}>
              <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#555555")}>
                Other
              </Text>
              <View style={{ gap: 8 }}>
                <TouchableOpacity
                  style={styles.othercomponenr}
                  onPress={() => navigation.navigate("Faq")}
                >
                  <Text
                    style={textStyle(14, fonts.PRIMARY_FONT_500, "#555555")}
                  >
                    FAQs
                  </Text>
                  <AntDesign name="right" size={15} color="#404040" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.othercomponenr}>
                  <Text
                    style={textStyle(14, fonts.PRIMARY_FONT_500, "#555555")}
                  >
                    Help & Support
                  </Text>
                  <AntDesign name="right" size={15} color="#404040" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.othercomponenr}>
                  <Text
                    style={textStyle(14, fonts.PRIMARY_FONT_500, "#555555")}
                  >
                    Legal, Terms & Condition
                  </Text>
                  <AntDesign name="right" size={15} color="#404040" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.Logout} onPress={toggleLogoutModal}>
              <AntDesign name="logout" size={20} color="#FB7D13" />
              <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#404040")}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Logout: {
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    marginVertical: 15,
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
    marginBottom: 30,
  },

  othercomponenr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  Other: {
    gap: 15,
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
  settingComponent: {
    // width: 70,
    gap: 5,
  },
  icons: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: "#FFF8F2",
    alignItems: "center",
    justifyContent: "center",
  },

  StoreSetting: {
    gap: 12,
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
  acceptOrder: {
    flexDirection: "row",
    // justifyContent: "center",
    gap: 8,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  acceptOrderRight: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
  acceptOrderleft: {
    gap: 10,
    width: "48%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
  AfterHeader: {
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 12,
  },
  Maincontainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },
});

export default MyStoreScreen;
