import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import fonts from "@const/fonts";
import NextButton from "../NextButton";
import DeliveryOptionsModal from "./DeliveryOptionsModal";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DottedCheckBox from "@/storecomponent/DottedCheckBox";
import { useSelector } from "react-redux";

const PickUpAddressModal = ({
  pickUpaddressScreen,
  item,
  handlePickUp,
  handelDelivery,
}) => {
  const navigation = useNavigation();
  const store = useSelector((state) => state.vendor.store);

  const [deliveryParterner, setdeliveryParterner] = useState(false);

  const [selectAdress, setselectAdress] = useState("");

  useEffect(() => {
    setselectAdress(
      [store.address, ...store.pickup_details.pickup_address][0]._id
    );
  }, [store]);

  const handleAddress = (type) => {
    setselectAdress(type);
  };

  const handleAddAddress = () => {
    handelDelivery();
    navigation.navigate("WorkDetails", {
      pickup: true,
    });
  };
  const handlechangeScrenn = () => {
    setdeliveryParterner(!deliveryParterner);
  };

  const RadioButton = ({ address }) => {
    return (
      <TouchableOpacity
        style={styles.RadioContainer}
        onPress={() => handleAddress(address._id)}
      >
        <View style={styles.RadioleftPart}>
          <Text
            style={{
              fontFamily: fonts.PRIMARY_FONT_500,
              fontSize: 14,
              color: "#555555",
            }}
          >
            {address.address_type}
          </Text>
          <Text
            style={{
              fontFamily: fonts.PRIMARY_FONT_400,
              fontSize: 14,
              color: "#93908F",
            }}
          >
            {address.addressLine1}
          </Text>
        </View>

        <View style={styles.RadioRightPart}>
          <DottedCheckBox ischecked={address._id == selectAdress} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <DeliveryOptionsModal
        item={item}
        visible={deliveryParterner}
        handlemodalChange={handlechangeScrenn}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={pickUpaddressScreen}
        onRequestClose={handlePickUp}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.5}
      >
        <View
          style={{
            paddingTop: 65,
            paddingHorizontal: 15,
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.63)",
          }}
        >
          <View style={styles.Modal_Conatiner}>
            <View style={styles.Header}>
              <View style={styles.leftPart}>
                <TouchableOpacity onPress={handlePickUp}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>

                <Text>Choose a pickup address</Text>
              </View>

              <TouchableOpacity style={styles.RightPart}>
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.radiobuttonbox}>
              {[store.address, ...store.pickup_details.pickup_address].map(
                (address) => (
                  <RadioButton key={address._id} address={address} />
                )
              )}
            </View>

            <TouchableOpacity
              style={styles.AddAddress}
              onPress={handleAddAddress}
            >
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_400,
                  fontSize: 14,
                  color: "#93908F",
                }}
              >
                Add different pickup address{" "}
              </Text>

              <View>
                <Entypo name="plus" size={20} color="#C1C1C1" />
              </View>
            </TouchableOpacity>

            <View style={{ paddingHorizontal: 15 }}>
              <NextButton
                lable={"Next"}
                handlechangeScrenn={handlechangeScrenn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  RadioRightPart: {
    alignItems: "center",
    justifyContent: "center",
  },

  AddAddress: {
    borderTopWidth: 1,
    paddingVertical: 15,
    borderColor: "#93908F",
    flexDirection: "row",
    borderStyle: "dotted",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  RadioContainer: {
    paddingVertical: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 35,
    marginVertical: 10,
  },

  RadioleftPart: {
    gap: 2,
  },
  leftPart: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  Modal_Conatiner: {
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },

  Header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  RightPart: {
    backgroundColor: "#F3F3F3",
    borderRadius: 9999,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
});

export default PickUpAddressModal;
