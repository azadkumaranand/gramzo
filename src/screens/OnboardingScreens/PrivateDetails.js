import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ProgressBar from "@/OnboardingComponents/ProgressBar";
import * as ImagePicker from "expo-image-picker";
import colors from "@const/colors";
import PrimaryButton from "@/PrimaryButton";
import { uploadFileAndGetURL } from "src/config/firebase";
import Paragraph from "@/Paragraph";
import { setCurrentUser } from "@rdx/VendorSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Crypto from "expo-crypto";
import Loader from "@/Loader";
import fonts from "@const/fonts";
import InputFields from "@/InputFields";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import { create_vendor_api } from "@func/api_functions";

const randomImage =
  "https://firebasestorage.googleapis.com/v0/b/auntypanel.appspot.com/o/images%2F1254c24e-bbca-429b-92a0-d32e1f940be9--aadhaar.jpg?alt=media&token=fdd5463b-5162-45c0-926e-c0f3ab1fdced";

const PrivateDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.vendor.user);

  const [aadhar_name, setAadhar_name] = useState(user.aadhar_details?.aadhar_name ?? "");
  const [aadhar_number, setAadhar_number] = useState(user.aadhar_details?.aadhar_number ?? "");
  const [aadhar_image_url, setAadharImage] = useState(user.aadhar_details?.aadhar_image_url ?? "");
  const [pan_name, setPan_name] = useState(user.pan_details?.pan_name ?? "");
  const [pan_number, setPan_number] = useState(user.pan_details?.pan_number ?? "");
  const [pan_image_url, setPanImage] = useState(user.pan_details?.pan_image_url ?? "");
  const [error_message, setError_message] = useState("");
  const [isSelected, setSelection] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [aadhaarLoading, setAadhaarLoading] = useState(false);
  const [panLoading, setPanLoading] = useState(false);

  const pickImage = async (type) => {
    if (!type) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets) {
      setAadhaarLoading(type == "aadhaar");
      setPanLoading(type == "pan");
      let random = Crypto.randomUUID();
      const url = await uploadFileAndGetURL(
        random + "-" + type,
        result.assets[0].uri
      );
      // console.log(url);
      if (type == "aadhaar") {
        // setAadhaarLoading(false);
        setAadharImage(url);
      } else if (type == "pan") {
        // setPanLoading(false);
        setPanImage(url);
      }
    }
  };

  async function saveDetails() {
    if (!aadhar_name) return setError_message("Please enter your aadhar name");
    if (!aadhar_number)
      return setError_message("Please enter your aadhar number");
    if (aadhar_number.length != 14)
      //+2 for spaces
      return setError_message("Aadhar number needs to be of 12 digits");
    if (!aadhar_image_url)
      return setError_message("Please upload aadhaar image");
    if (!pan_name) return setError_message("Please enter your pan name");
    if (!pan_number) return setError_message("Please enter your pan number");
    if (pan_number.length !== 10)
      return setError_message("Pan number needs to be of 10 characters");
    if (!pan_image_url) return setError_message("Please upload pan image");
    if (!isSelected)
      return setError_message("Please accept the terms and conditions");

    const data = {
      vendor_id: user._id,
      aadhar_details: {
        aadhar_name,
        aadhar_number,
        aadhar_image_url,
      },
      pan_details: {
        pan_name,
        pan_number,
        pan_image_url,
      },
      step: 3,
    };

    setIsLoading(true);
    const [res, err] = await create_vendor_api(data);
    setIsLoading(false);
    if (err) {
      setError_message(err.error ?? err.message);
      return;
    }

    dispatch(setCurrentUser(res.vendor));

    navigation.reset({
      index: 0,
      routes: [
        {
          name: "ConfirmationScreen",
        },
      ],
    });
  }
  const handleAadharCard = (text) => {
    const formattedText = text.replace(/[^0-9]/g, "").substring(0, 12);
    const formattedNumber = formattedText.replace(/(\d{4})/g, "$1 ").trim();
    setAadhar_number(formattedNumber);
  };

  const handlePancard = (text) => {
    // const formattedText = text.replace(/[^0-9]/g, "").substring(0, 10);
    setPan_number(text.toUpperCase());
  };
  return (
    <SafeAreaView style={styles.onboardingContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.HEADER_GREEN_COLOR}
        translucent={true}
      />
      <StoreHeaders lable={"Upload your documents"} navigation={true} />

      <ProgressBar progressOne="done" progressTwo="done" progressThree="onit" />

      <ScrollView>
        <View style={styles.onboardingForm}>
          <View>
            <Text style={styles.section_heading}>Aadhaar Details</Text>

            <InputFields
              label="Name (According to Aadhaar)"
              value={aadhar_name}
              onChangeText={setAadhar_name}
            />
            <View style={styles.addharwithoptbtn}>
              <View style={styles.numberbox}>
                <InputFields
                  label="Aadhaar Card Number"
                  value={aadhar_number}
                  onChangeText={handleAadharCard}
                  keyboardType="numeric"
                  maxLength={14}
                />
              </View>
              {/* 
              <View>
                {aadhar_number ? (
                  aadhar_number.length == 14 ? (
                    <TouchableOpacity>
                      <Text style={[styles.otpbtn, { color: "red" }]}>
                        Send OTP
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Text style={[styles.otpbtn, { color: "#999" }]}>
                        Send OTP
                      </Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <Text style={[styles.otpbtn, { color: "#999" }]}>
                    Send OTP
                  </Text>
                )}
              </View> */}
            </View>
          </View>

          <View style={styles.aadhar_upload}>
            <Text style={styles.upload_heading}>
              Upload a photo of your Aadhaar Card{" "}
            </Text>
            <View style={styles.img_box}>
              <Pressable
                style={styles.upload_btn}
                onPress={() => pickImage("aadhaar")}
              >
                <Text style={styles.upload_btn_txt}>Choose File</Text>
              </Pressable>
              <Paragraph color="#000" textAlignC={true}>
                {aadhar_image_url ? "file uploaded" : "No file choosen"}
              </Paragraph>
            </View>
            <View>
              {aadhar_image_url && (
                <Image
                  source={{ uri: aadhar_image_url }}
                  style={{ width: 300, height: 100, marginTop: 5 }}
                  onLoadEnd={() => setAadhaarLoading(false)}
                />
              )}
              {aadhaarLoading && <Loader size={30} absolute />}
            </View>
          </View>
          <View style={{ marginTop: 24 }}>
            <Text style={[styles.section_heading, { marginTop: 24 }]}>
              Pan Card Details
            </Text>

            <InputFields
              label="Name (According to Pan Card)"
              value={pan_name}
              onChangeText={setPan_name}
            />

            <InputFields
              label="Pan Card Number"
              value={pan_number}
              onChangeText={handlePancard}
              maxLength={10}
              autoCapitalize="characters"
            />
          </View>
          <View style={styles.aadhar_upload}>
            <Text style={styles.upload_heading}>
              Upload a photo of your Pan Card{" "}
            </Text>
            <View style={styles.img_box}>
              <Pressable
                style={styles.upload_btn}
                onPress={() => pickImage("pan")}
              >
                <Text style={styles.upload_btn_txt}>Choose File</Text>
              </Pressable>

              <Paragraph color="#000" textAlignC={true}>
                {pan_image_url ? "file uploaded" : "No file choosen"}
              </Paragraph>
            </View>

            <View>
              {pan_image_url && (
                <Image
                  source={{ uri: pan_image_url }}
                  style={{ width: 300, height: 100, marginTop: 5 }}
                  onLoadEnd={() => setPanLoading(false)}
                />
              )}
              {panLoading && <Loader size={30} absolute />}
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              size={25}
              // style={{ width: 90 }}
              fillColor={colors.PRIMARY_GREEN_COLOR}
              unfillColor="#FFFFFF"
              text="I agree that the name and details of my Aadhar card and Pan Card are right in my knowledge. "
              iconStyle={{
                borderColor: colors.INPUT_BORDER_COLOR,
                borderRadius: 4,
              }}
              textStyle={{
                color: "black",
                textDecorationLine: "none",
                fontSize: 14,
                fontFamily: fonts.PRIMARY_FONT_400,
              }}
              innerIconStyle={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: colors.INPUT_BORDER_COLOR,
              }}
              onPress={(isChecked) => {
                setSelection(isChecked);
              }}
            />
          </View>

          {error_message && (
            <Text
              style={{
                color: "red",
                marginBottom: 10,
                fontFamily: fonts.PRIMARY_FONT_500,
              }}
            >
              {error_message}
            </Text>
          )}
          <PrimaryButton
            width="100%"
            onPress={saveDetails}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Save
          </PrimaryButton>
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivateDetails;

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    height: "100%",
  },
  onboardingForm: {
    backgroundColor: "#fff",
    // background: "linear-gradient(132.18deg, #55A630 0%, #71C442 100%);",
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    paddingVertical: 32,

    // flex: 1,
  },
  name_available: {
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 12,
    color: "#60B527",
    // marginLeft: 30,
  },
  phoneNumberBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  upload_heading: {
    fontSize: 12,
    fontFamily: fonts.PRIMARY_FONT_400,
    lineHeight: 16,
    color: "#667085",
    marginTop: 12,
  },
  img_box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 19,
    marginTop: 12,
  },
  upload_btn: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#448526",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 41,
    // width: "fit-content",
  },
  addharwithoptbtn: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  numberbox: {
    flex: 1,
  },
  otpbtn: {
    fontWeight: "bold",
  },
  upload_btn_txt: {
    fontFamily: fonts.PRIMARY_FONT_700,
    fontSize: 14,
    lineHeight: 20,
    color: "#448521",
  },
  section_heading: {
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 18,
    lineHeight: 28,
    color: "#000",
    marginBottom: 12,
    marginTop: 12,
  },
  checkboxContainer: {
    width: "90%",
    flexDirection: "row",
    gap: 24,
    marginTop: 54,
    marginBottom: 24,
  },
  checkbox: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 4,
  },
  btn: {
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#55A630",
  },
  btnText: {
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 14,
    lineHeight: 20,
    color: "#fff",
    textAlign: "center",
  },
});
