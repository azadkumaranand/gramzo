import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import InputFields from "@/InputFields";
import fonts, { textStyle } from "@const/fonts";
import NextButton from "@/OrderComponents/NextButton";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setStore } from "@rdx/VendorSlice";
import {
  check_store_name_api,
  edit_store_details_api,
  generate_otp_api,
  is_new_vendor_api,
} from "@func/api_functions";
import * as ImagePicker from "expo-image-picker";
import * as Crypto from "expo-crypto";
import { uploadFileAndGetURL } from "src/config/firebase";
import Loader from "@/Loader";
import OTPModal from "@/OnboardingComponents/OTPModal";
import colors from "@const/colors";

const EditePage = () => {
  const { store, user: vendor } = useSelector((state) => state.vendor);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [storename, setstorename] = useState(store?.store_name || "");
  const [contactNumber, setcontactNumber] = useState(
    vendor?.phone_number || ""
  );
  const [emailId, setemailId] = useState(vendor?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isStoreNameExists, setIsStoreNameExists] = useState(false);
  const [userId, setUserId] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [image, setImage] = useState(store?.image_url);
  const [imageLoading, setImageLoading] = useState(false);

  const isButtonDisabled = useMemo(() => {
    return (
      storename === "" ||
      contactNumber.length < 10 ||
      emailId === "" ||
      !image ||
      (contactNumber === vendor?.phone_number &&
        emailId === vendor?.email &&
        storename === store?.store_name &&
        image === store?.image_url)
    );
  }, [
    storename,
    contactNumber,
    emailId,
    image,
    store?.store_name,
    store?.image_url,
    vendor?.phone_number,
    vendor?.email,
  ]);

  useEffect(() => {
    if (storename === "" || store.store_name === storename) return;
    const timeout = setTimeout(async () => {
      check_store_name_api(storename).then(([res, err]) => {
        if (res.taken) {
          setIsStoreNameExists(true);
        }
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [storename, store.store_name]);

  useEffect(() => {
    setIsLoading(false);
    const timeout = setTimeout(() => {
      setErrorMessage("");
    }, 3e3);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.assets) {
      setImageLoading(true);
      let random = Crypto.randomUUID();
      const url = await uploadFileAndGetURL(random, result.assets[0].uri);
      console.log(url);
      setImage(url);
    }
  };

  const handlechage = async () => {
    //check email
    if (vendor?.email !== emailId) {
      const isValidEmail = emailId.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
      if (!isValidEmail) {
        setErrorMessage("Invalid email");
        return;
      }

      setIsLoading(true);
      const [res, err2] = await is_new_vendor_api({
        email: emailId.toLowerCase(),
      });
      setIsLoading(false);
      if (!res.message) {
        setErrorMessage("Email already exists");
        return;
      }
    }

    //check phone
    if (vendor?.phone_number !== contactNumber) {
      setIsLoading(true);
      const [data, err] = await is_new_vendor_api({ phone: contactNumber });
      setIsLoading(false);
      if (!data.message) {
        setErrorMessage("Contact number already exists");
        return;
      }

      Alert.alert(
        `${contactNumber} will be your new login number`,
        "Are you sure?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: sendOTP },
        ]
      );

      // setOtpModalVisible(true);
      return;
    }

    otpHandler();
  };

  const sendOTP = async () => {
    if (contactNumber.length !== 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    const [data, err] = await generate_otp_api(contactNumber);
    setIsLoading(false);
    console.log(err);
    if (err) return alert("Error sending OTP");

    const { error, status, userId } = data;
    setUserId(userId);

    if (error) return alert("Error sending OTP");

    if (status === "pending") {
      setOtpModalVisible(true);
    }
  };

  const otpHandler = async () => {
    setIsLoading(true);
    const body = {
      store_name: storename,
      store_id: store._id,
    };

    if (image) body.image_url = image;
    if (vendor?.email !== emailId) body.email = emailId.toLowerCase();
    if (vendor?.phone_number !== contactNumber)
      body.phone_number = contactNumber;

    const [data, err] = await edit_store_details_api(body);
    // console.log(data, err);
    setIsLoading(false);
    if (data) {
      dispatch(setStore(data?.store));
      dispatch(setCurrentUser(data?.vendor));
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.Maincontainer}>
      <OTPModal
        userId={userId}
        setUserId={setUserId}
        otpModalVisible={otpModalVisible}
        onVerify={otpHandler}
        phoneNumber={contactNumber}
        handleClose={() => setOtpModalVisible(false)}
      />
      {/* <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#71C442"
        translucent={true}
      /> */}
      <StoreHeaders lable={"Edit Details"} navigation={true} />

      <View style={styles.AfterHeader}>
        <InputFields
          label="Store name"
          value={storename}
          onChangeText={setstorename}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
          editable={!isLoading}
        />
        {isStoreNameExists && (
          <Text
            style={[
              textStyle(13, fonts.PRIMARY_FONT_400, "red"),
              { top: -16, left: 10 },
            ]}
          >
            Store name already exists
          </Text>
        )}
        <InputFields
          label="Contact number"
          value={contactNumber}
          // editable={false}
          onChangeText={setcontactNumber}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
          maxLength={10}
          keyboardType="number-pad"
          editable={!isLoading}
        />
        <InputFields
          label="Email ID"
          value={emailId}
          // editable={false}
          onChangeText={setemailId}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
          inputMode="email"
          editable={!isLoading}
        />

        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text style={textStyle(13, fonts.PRIMARY_FONT_400, "#667085")}>
            Upload a new logo
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 30,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.fileUploaded}
            onPress={pickImage}
            disabled={isLoading}
          >
            <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#448526")}>
              Choose Logo
            </Text>
          </TouchableOpacity>

          <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#667085")}>
            {image ? "file uploaded" : "No file choosen"}
          </Text>
        </View>
        <View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, marginTop: 5 }}
              onLoadEnd={() => setImageLoading(false)}
            />
          )}
          {imageLoading && <Loader size={30} absolute />}
        </View>

        <View style={{ marginTop: 20 }}>
          {errorMessage && (
            <Text
              style={[
                textStyle(13, fonts.PRIMARY_FONT_400, "red"),
                { top: -6, left: 20, lineHeight: 18 },
              ]}
            >
              {errorMessage}
            </Text>
          )}
          <NextButton
            lable={"Save"}
            handlechangeScrenn={handlechage}
            disabled={isButtonDisabled || isLoading}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fileUploaded: {
    width: "50%",
    height: 40,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    borderColor: "#448526",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  Maincontainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },

  AfterHeader: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
});
export default EditePage;
