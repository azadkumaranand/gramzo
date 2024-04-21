import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import OnboardingNavbar from "@/OnboardingComponents/OnboardingNavbar";
import ProgressBar from "@/OnboardingComponents/ProgressBar";
import PrimaryButton from "@/PrimaryButton";
import { Entypo } from "@expo/vector-icons";
import { setCurrentUser, setStore } from "@rdx/VendorSlice";
import { useDispatch, useSelector } from "react-redux";
import fonts from "@const/fonts";
import InputFields from "@/InputFields";
import { add_pickup_address_api, create_vendor_api } from "@func/api_functions";
import * as Location from "expo-location";
import { reverseGeocoding } from "@func/utils";
import Loader from "@/Loader";
import CheckBox from "@/CheckBox";
import colors from "@const/colors";

const addressTypes = [
  {
    type: "storeAddress",
    label: "Store Location",
  },
  { type: "warehouse1", label: "Warehouse 1" },
  { type: "warehouse2", label: "Warehouse 2" },
];

const WorkDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { user, store } = useSelector((state) => state.vendor);

  const location = params?.pickup ? params?.location : store?.address;

  const [error_message, setError_message] = useState("");
  const [addressLine1, setAddressLine1] = useState(
    location?.addressLine1 ?? ""
  );
  const [addressLine2, setAddressLine2] = useState(
    location?.addressLine2 ?? ""
  );
  const [landmark, setLandmark] = useState(location?.landmark ?? "");
  const [city, setCity] = useState(location?.city ?? "");
  const [pinCode, setPinCode] = useState(location?.pinCode ?? "");
  const [district, setDistric] = useState(location?.district ?? "");
  const [state, setState] = useState(location?.state ?? "");
  const [contactPersonName, setContactPersonName] = useState(
    location?.contactPersonInfo?.contactPersonName ?? ""
  );
  const [contactPersonNumber, setContactPersonNumber] = useState(
    location?.contactPersonInfo?.contactPersonNumber ?? ""
  );
  const [addressType, setAddressType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latitude, setLatitude] = useState(location?.latitude ?? "");
  const [longitude, setLongitude] = useState(location?.longitude ?? "");
  const [locationLoading, setLocationLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(!!location?.isDefault);
  const addNewPickupAddress = async (data) => {
    // console.log(data);
    setIsLoading(true);
    const [res, err] = await add_pickup_address_api(data);
    setIsLoading(false);
    if (err) {
      setError_message(err.error ?? err.message);
      return;
    }
    dispatch(setStore(res.store));
    navigation.goBack();
  };

  const saveHandler = async () => {
    setError_message("");
    if (
      !addressLine1 ||
      !pinCode ||
      !city ||
      !state ||
      !district ||
      !contactPersonName ||
      !contactPersonNumber
    ) {
      setError_message("Please fill all the fields");
      return;
    }

    const data = {
      phone_number: user?.phone_number,
      store_id: user?.store ?? store?._id,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      pinCode: pinCode,
      city: city,
      state: state,
      district: district,
      isDefault,
      contactPersonInfo: {
        contactPersonName,
        contactPersonNumber,
      },
      latitude,
      longitude,
      address_type: addressType.type,
      address_label: addressType.label,
      step: 2,
    };

    if (params?.pickup) return addNewPickupAddress(data);

    setIsLoading(true);
    const [res, err] = await create_vendor_api(data);
    setIsLoading(false);

    if (err) {
      setError_message(err.error ?? err.message);
      return;
    }

    dispatch(setCurrentUser(res.vendor));
    dispatch(setStore(res.store));
    navigation.navigate("PrivateDetails");
  };

  const handleClose = (location, address) => {
    setIsModalOpen(false);
    if (location) {
      setLatitude(location.latitude.toString());
      setLongitude(location.longitude.toString());
    }
    if (address) {
      setAddressLine1(address);
    }
  };

  const getLatLng = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      setLocationLoading(false);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = location.coords;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    getLatLng();
  }, []);

  const getLocation = async () => {
    setLocationLoading(true);
    const [res, err] = await reverseGeocoding(latitude, longitude);
    setLocationLoading(false);
    console.log(res, err);
    if (err || !res) return;
    const data = res[0];
    const postal_code = res.find((item) => item.postal_code)?.postal_code;

    setAddressLine1(data.address);
    setAddressLine2(data?.sublocality);
    setPinCode(postal_code);
    setState(data.region);
    setCity(data.area);
    setDistric(data.locality);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.HEADER_GREEN_COLOR}
        translucent={true}
      />
      <OnboardingNavbar
        lable={params?.pickup ? "Pickup Addresses " : "Fill Store Address"}
      />
      {!params?.pickup ? (
        <ProgressBar
          progressOne="done"
          progressTwo="onit"
          progressThree="not"
        />
      ) : null}
      {/* <MapModal isVisible={isModalOpen} handleClose={handleClose} /> */}
      <ScrollView>
        <View style={styles.onboardingForm}>
          <View style={styles.mapbox}>
            <ImageBackground
              source={require("/assets/map.png")}
              style={styles.mapcontainer}
            >
              <TouchableOpacity
                style={styles.overlay}
                onPress={getLocation}
                disabled={locationLoading}
              >
                {locationLoading ? (
                  <Loader size={30} />
                ) : (
                  <View style={styles.maptext}>
                    <Entypo name="location-pin" size={25} color="#60B527" />
                    <Text style={{ color: "#60B527" }}>Locate Me</Text>
                  </View>
                )}
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <InputFields
            label="Address line 1"
            value={addressLine1}
            onChangeText={setAddressLine1}
          />

          <InputFields
            label="Address line 2 (optional)"
            value={addressLine2}
            onChangeText={setAddressLine2}
            //   keyboardType="numeric"
            Unrequired
          />

          <InputFields
            label="Landmark (optional)"
            value={landmark}
            onChangeText={setLandmark}
            Unrequired
          />

          <View style={styles.twoInputFieldBox}>
            <View style={styles.halfinput}>
              <InputFields
                label="City"
                value={city}
                onChangeText={setCity}
                //   keyboardType="numeric"
              />
            </View>

            <View style={styles.halfinput}>
              <InputFields
                label="Zip/postcode"
                value={pinCode}
                // onChangeTee3ext={setPinCode}
                onChangeText={(txt) => {
                  const formattedText = txt
                    .replace(/[^0-9]/g, "")
                    .substring(0, 10);
                  setPinCode(formattedText);
                }}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
          </View>

          <View style={styles.twoInputFieldBox}>
            <View style={styles.halfinput}>
              <InputFields
                label="Your District"
                value={district}
                onChangeText={setDistric}
                //   keyboardType="numeric"
              />
            </View>
            <View style={styles.halfinput}>
              <InputFields
                label="Your State"
                value={state}
                onChangeText={setState}
              />
            </View>
          </View>

          <View style={styles.twoInputFieldBox}>
            <View style={styles.halfinput}>
              <InputFields
                label="Contact Person"
                value={contactPersonName}
                onChangeText={setContactPersonName}
              />
            </View>
            <View style={styles.halfinput}>
              <InputFields
                label="Contact Person No."
                value={contactPersonNumber}
                onChangeText={(txt) => {
                  const formattedText = txt
                    .replace(/[^0-9]/g, "")
                    .substring(0, 10);
                  setContactPersonNumber(formattedText);
                }}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: "#667085",
                fontFamily: fonts.PRIMARY_FONT_500,
                fontSize: 12,
                marginVertical: 9,
              }}
            >
              Address Type
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              {addressTypes?.map((at, index) => (
                <Pressable key={index} onPress={() => setAddressType(at)}>
                  <Text
                    style={{
                      backgroundColor:
                        addressType?.type == at.type ? "#55A630" : "#F3F3F3",
                      color:
                        addressType?.type == at.type ? "#FFFFFF" : "#1B1816",
                      ...styles.addressTag,
                    }}
                  >
                    {at.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {params?.pickup && (
            <CheckBox
              label="Mark it as a default address"
              isChecked={isDefault}
              onClick={() => setIsDefault((p) => !p)}
            />
          )}

          <Text style={{ color: "red", paddingHorizontal: 15 }}>
            {error_message != "" ? error_message : ""}
          </Text>
          <View style={[styles.btnContainer, { marginVertical: 15 }]}>
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
    </>
  );
};

export default WorkDetails;

const styles = StyleSheet.create({
  AddressType: {
    gap: 10,
    marginTop: 15,
  },
  TypeBox: {
    backgroundColor: "#F3F3F3",
    borderRadius: 32,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  onboardingForm: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    paddingVertical: 32,
  },
  mapcontainer: {
    flex: 1,
    height: 100,
    resizeMode: "cover",
    // borderRadius: 100
  },
  mapbox: {
    flex: 1,
    borderRadius: 21,
    overflow: "hidden",
    marginBottom: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add an overlay to make text more readable
    justifyContent: "center",
    alignItems: "center",
  },
  maptext: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    color: "#69BB3D",
    fontWeight: "600",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  twoInputFieldBox: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    // backgroundColor: "red",
  },
  halfinput: {
    flex: 1,
  },
  addressTag: {
    borderRadius: 32,
    paddingVertical: 4,
    paddingHorizontal: 11,
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 12,
  },
});
