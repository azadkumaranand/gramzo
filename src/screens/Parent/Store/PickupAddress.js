import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import fonts, { textStyle } from "@const/fonts";
import NextButton from "@/OrderComponents/NextButton";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DottedCheckBox from "@/storecomponent/DottedCheckBox";
import { useDispatch, useSelector } from "react-redux";
import { change_default_pickup_address_api } from "@func/api_functions";
import { setStore } from "@rdx/VendorSlice";
import colors from "@const/colors";

const PickupAddress = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { store } = useSelector((state) => state.vendor);
  // console.log(store);
  const defAddress = store?.address;
  const pickupAddresses = store?.pickup_details?.pickup_address;
  console.log(pickupAddresses);
  // const [DefaultAddress, setDefaultAddress] = useState(params?.Location || "");
  const [selectedAddress, setSelectedAddress] = useState("gramzoLoc");

  useEffect(() => {
    setDefaultAddress(
      [store.address, ...store.pickup_details.pickup_address].find(
        (a) => a.isDefault
      )._id
    );
  }, [store]);

  const handlechangeScrenn = async () => {
    setIsLoading(true);
    const [data, err] = await change_default_pickup_address_api({
      store_id: store._id,
      address_id: DefaultAddress,
    });
    setIsLoading(false);
    console.log(data.store.address);
    if (err) return console.log(err);
    dispatch(setStore(data.store));
    navigation.goBack();
  };

  const handleAddress = () => {
    navigation.navigate("WorkDetails", {
      pickup: true,
    });
  };

  const onhandleDiliverry = (addressType) => {
    // setDefaultAddress(defaultType);
    setSelectedAddress(addressType);
  };

  const DeliveryBox = ({ lable, location, addressType }) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.timeBox,
          borderColor: selectedAddress == addressType ? "#42AF10" : "#D1D5DB",
        }}
        onPress={() => onhandleDiliverry(addressType)}
      >
        <View style={styles.leftPart}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#1B1816")}>
              {label || address?.address_type}
            </Text>
            {selectedAddress == addressType && (
              <View style={styles.defaultbox}>
                <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#FB7D13")}>
                  Default
                </Text>
              </View>
            )}
          </View>
          <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#6B7280")}>
            {address.addressLine1}{" "}
          </Text>
        </View>

        <View style={styles.RightPart}>
          <DottedCheckBox ischecked={selectedAddress == addressType} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Maincontainer}>
      {/* <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#71C442"
        translucent={true}
      /> */}
      <StoreHeaders lable={"Pickup Addresses "} navigation={true} />

      <View style={styles.afterHeader}>
        <DeliveryBox
          lable={"GramZo location"}
          addressType={"gramzoLoc"}
          location={defAddress?.addressLine1}
        />
        {pickupAddresses?.map((pa) => (
          <DeliveryBox
            lable={pa.address_type}
            addressType={pa.address_type}
            location={pa?.addressLine1}
          />
        ))}

        {/* <DeliveryBox
          lable={"Warehouse 2"}
          addressType={"warehouse2"}
          location={"Asilai, Ahiraula, Azamgarh, 223221"}
          defaultType={"Warehouse 2"}
        /> */}
      </View>

      <TouchableOpacity style={styles.differentPickup} onPress={handleAddress}>
        <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#1B1816")}>
          Add different pickup address
        </Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          <Entypo name="plus" size={20} color="#93908F" />
        </TouchableOpacity>
      </TouchableOpacity>
      {error_message && (
        <Text
          style={[
            textStyle(15, fonts.PRIMARY_FONT_400, "red"),
            { paddingHorizontal: 25, lineHeight: 26, marginTop: 20 },
          ]}
        >
          {error_message}
        </Text>
      )}
      <NextButton
        lable={"Save"}
        handlechangeScrenn={handlechangeScrenn}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  RightPart: {
    alignItems: "center",
    justifyContent: "center",
  },
  differentPickup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
  defaultbox: {
    borderLeftWidth: 1,
    borderColor: "#1B1816",
    paddingHorizontal: 15,
  },

  afterHeader: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  leftPart: {
    gap: 3,
  },

  timeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
  Maincontainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },
});
export default PickupAddress;
