import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InputFields from "@/InputFields";
import OnboardingNavbar from "@/OnboardingComponents/OnboardingNavbar";
import ProgressBar from "@/OnboardingComponents/ProgressBar";
import colors from "@const/colors";
import PrimaryButton from "@/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import DropdownDemo from "@/OnboardingComponents/DropdownDemo";
import { setCurrentUser, setStore } from "@rdx/VendorSlice";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import fonts from "@const/fonts";
import { Feather } from "@expo/vector-icons";
import CameraPicker from "@/OnboardingComponents/CamraPicker";
import { uploadFileAndGetURL } from "src/config/firebase";
import Loader from "@/Loader";
import * as Crypto from "expo-crypto";
import { check_store_name_api, create_vendor_api } from "@func/api_functions";

const languageData = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Marathi", value: "Marathi" },
];

const PersonalDetails = () => {
  const { user, store } = useSelector((state) => state.vendor);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState(user?.name || "");
  const [storeName, setStoreName] = useState(store?.store_name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || "");
  const [email, setEmail] = useState(user?.email || "");
  const [language, setLanguage] = useState(user?.language || "");
  const [whatsAppUpdate, setWhatsAppUpdate] = useState(
    user?.phone_number === user?.whatsapp_number
  );
  const [whatsAppNumber, setWhatsAppNumber] = useState(
    user?.whatsapp_number || ""
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [error_message, setError_message] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [FileChosen, setFileChosen] = useState(true);
  const [isStoreNameExists, setIsStoreNameExists] = useState(false);

  const [image, setImage] = useState(user.photo_url || "");

  useEffect(() => {
    if (!storeName) return;

    const timeout = setTimeout(async () => {
      check_store_name_api(storeName).then(([res, err]) => {
        setIsStoreNameExists(res.taken);
        console.log(res);
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [storeName]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        // If permission is not granted, request it
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          // Handle permission denied
          console.error("Media Library permission denied");
          return;
        }
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage("");
        setImageLoading(true);
        let random = Crypto.randomUUID();
        console.log(random);
        const url = await uploadFileAndGetURL(
          random + "-photo",
          result.assets[0].uri
        );
        setImage(url);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFileChosen(false);
    }
  };

  const saveHandler = async () => {
    if (
      name == "" ||
      email == "" ||
      language == "" ||
      !phoneNumber ||
      !storeName
    ) {
      setError_message("Please fill all the requirements!");
      return;
    }

    const data = {
      name: name,
      store_name: storeName,
      phone_number: phoneNumber,
      email: email,
      language: language,
      whatsapp_number: whatsAppNumber,
      photo_url: image,
      step: 1,
    };

    setError_message("");

    setIsLoading(true);
    const [res, err] = await create_vendor_api(data);
    console.log(res, err);
    setIsLoading(false);
    if (err) {
      setError_message(err.error ?? err.message);
      return;
    }

    dispatch(setCurrentUser(res.vendor));
    dispatch(setStore(res.store));
    navigation.navigate("WorkDetails");
  };
  return (
    <>
      <View style={styles.onboardingContainer}>
        <OnboardingNavbar lable={"Fill your basic details"} />

        <ProgressBar progressOne="onit" progressTwo="not" progressThree="not" />

        <ScrollView>
          <View style={styles.onboardingForm}>
            <InputFields label="Name" value={name} onChangeText={setName} />

            <InputFields
              label="Store Name"
              value={storeName}
              onChangeText={setStoreName}
            />
            {isStoreNameExists && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 15,
                  marginTop: -10,
                  left: 10,
                  fontFamily: fonts.PRIMARY_FONT_500,
                }}
              >
                Store name already exists
              </Text>
            )}

            <View style={styles.phoneNumberBox}>
              <View style={styles.phoneInput}>
                <InputFields
                  label="Phone"
                  value={phoneNumber}
                  keyboardType="numeric"
                  maxLength={10}
                  editable={false}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  marginTop: -10,
                }}
              >
                <Feather name="check-circle" size={20} color="#60B527" />
                <Text
                  style={{
                    color: "#60B527",
                    fontFamily: fonts.PRIMARY_FONT_700,
                  }}
                >
                  Verified
                </Text>
              </View>
            </View>

            <InputFields label="Email" value={email} onChangeText={setEmail} />

            <View
              style={{
                marginBottom: 24,
                marginTop: 10,
              }}
            >
              <DropdownDemo
                item={languageData}
                dropdown_type="Language"
                handleChange={setLanguage}
                defaultValue={language}
              />
            </View>

            <View style={{ paddingHorizontal: 10 }}>
              <BouncyCheckbox
                size={15}
                style={{ marginVertical: 8 }}
                fillColor={colors.PRIMARY_GREEN_COLOR}
                unfillColor="#FFFFFF"
                text="Same as Phone Number"
                iconStyle={{
                  borderColor: colors.INPUT_BORDER_COLOR,
                  borderRadius: 4,
                }}
                textStyle={{
                  color: "black",
                  textDecorationLine: "none",
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily: fonts.PRIMARY_FONT_400,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: colors.INPUT_BORDER_COLOR,
                }}
                isChecked={whatsAppUpdate}
                onPress={(isChecked) => {
                  setWhatsAppUpdate(isChecked);
                  if (isChecked === true) setWhatsAppNumber(phoneNumber);
                  else setWhatsAppNumber("");
                }}
              />
            </View>

            <InputFields
              label="WhatsApp Number"
              value={whatsAppNumber}
              onChangeText={setWhatsAppNumber}
              keyboardType="numeric"
              maxLength={10}
            />

            <View style={{ paddingHorizontal: 10, marginVertical: 15 }}>
              <Text
                style={{ fontFamily: fonts.PRIMARY_FONT_400, fontSize: 14 }}
              >
                Now, Add your selfie for trust! Your customers would love to see
                you!
              </Text>
            </View>

            <View style={styles.selfiContainer}>
              <View style={styles.selfiBox}>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                    onLoadEnd={() => setImageLoading(false)}
                  />
                )}
                {!image && !imageLoading && (
                  <AntDesign name="camera" size={30} color="#278B55" />
                )}

                {imageLoading && (
                  <View
                    style={{
                      position: "absolute",
                    }}
                  >
                    <Loader size={60} color="#278B55" />
                  </View>
                )}
              </View>
            </View>

            <View style={styles.selfiFooter}>
              {/* <TouchableOpacity style={styles.selfiBtnBox} onPress={pickImage}>
                <View style={styles.selfiBtn}>
                  <AntDesign name="upload" size={30} color="#FFF" />
                </View>
                <Text>Upload file</Text>
              </TouchableOpacity> */}

              <CameraPicker
                setImage={setImage}
                setImageLoading={setImageLoading}
              />
            </View>
            <Text style={{ color: "red", paddingHorizontal: 15 }}>
              {error_message != "" ? error_message : ""}
            </Text>
            <View style={styles.btnContainer}>
              <PrimaryButton
                width="100%"
                onPress={saveHandler}
                disabled={isLoading}
                isLoading={isLoading}
              >
                Next
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
  },
  onboardingForm: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    paddingVertical: 32,
  },
  phoneNumberBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  phoneInput: {
    width: "73%",
  },
  checkboxContainer: {
    marginTop: 12,
    gap: 7,
  },
  checkboxes: {
    marginVertical: 12,
    width: "65%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  selfiContainer: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  selfiBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 5,
    borderColor: "#60B527",
    // backgroundColor: "red"
  },
  selfiFooter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  selfiBtnBox: {
    // backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  selfiBtn: {
    backgroundColor: "#278B55",
    padding: 10,
    borderRadius: 100,
  },
  btnContainer: {
    marginVertical: 25,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    // padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: colors.INPUT_BORDER_COLOR,
    borderRadius: 50,
    // marginTop: 6,
    // marginBottom: 12,
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Inputbox: {},
  upload_heading: {
    fontSize: 12,
    fontFamily: fonts.PRIMARY_FONT_400,
    lineHeight: 16,
    color: "#000",
    marginTop: 24,
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
  upload_btn_txt: {
    fontFamily: fonts.PRIMARY_FONT_700,
    fontSize: 14,
    lineHeight: 20,
    color: "#448521",
  },
});

////////////////////////////////////
