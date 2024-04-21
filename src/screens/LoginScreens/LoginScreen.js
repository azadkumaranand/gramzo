import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useState } from "react";
import OTPModal from "@/OnboardingComponents/OTPModal";
import TopHeader from "@/SplaseScreen/TopHeader";
import FooterPart from "@/SplaseScreen/FooterPart";
import OverlayLoading from "@/OverlayLoading";
import { useNavigation } from "@react-navigation/native";
import { is_new_vendor_api } from "@func/api_functions";
import { setCurrentUser, setStore } from "@rdx/VendorSlice";

const Screens = [
  {
    Index: "first",
    Image: 1,
    Heading: "Insurance upto 5 lakh",
  },
  {
    Index: "second",
    Image: 2,
    Heading: "Zero Joining Fee",
  },
  {
    Index: "Third",
    Image: 3,
    Heading: "Guaranteed Safety",
  },
];

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpModalVisible, setotpModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const otpHandler = async () => {
    const [data, error] = await is_new_vendor_api({
      phone: phoneNumber,
    });
    console.log(data, error);
    if (error) return alert(error);
    setotpModalVisible(!otpModalVisible);

    if (data.message) {
      //new vender
      dispatch(
        setCurrentUser({
          phone_number: phoneNumber,
        })
      );

      navigation.navigate("PersonalDetails", {
        phone_number: phoneNumber,
      });

      return;
    }

    //existing vendor
    const { vendor: user, store } = data;

    dispatch(setCurrentUser(user));
    dispatch(setStore(store));
    if (user?.step == 1) {
      navigation.replace("WorkDetails");
      return;
    }

    if (user?.step == 2) {
      navigation.replace("PrivateDetails");
      return;
    }

    if (user?.step == 3) {
      navigation.replace("ParentScreen");
      return;
    }
  };

  const [index, setindex] = useState(0);

  useEffect(() => {
    const screenChange = setTimeout(() => {
      setindex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
    }, 10000);

    return () => clearTimeout(screenChange);
  }, [index]);

  return (
    <View style={styles.MainContainer}>

      <OTPModal
        userId={userId}
        setUserId={setUserId}
        otpModalVisible={otpModalVisible}
        onVerify={otpHandler}
        phoneNumber={phoneNumber}
        handleClose={() => setotpModalVisible(false)}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.ImagePart}>
          <TopHeader
            Screens={Screens[index].Heading}
            index={Screens[index].Index}
          />
        </View>

        <View style={styles.FooterPart}>
          <FooterPart
            setUserId={setUserId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            otpHandler={() => setotpModalVisible(!otpModalVisible)}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  ImagePart: {
    height: (Dimensions.get("screen").height * 5) / 8,
    backgroundColor: "rgba(254, 182, 182, 1)",
  },
  FooterPart: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 30,
  },
});
