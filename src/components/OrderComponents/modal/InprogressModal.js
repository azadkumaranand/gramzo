import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Modal, ScrollView } from "react-native";
import ModalHeader from "../ModalHeader";
import { StyleSheet } from "react-native";
import BillDetailsPart from "../BillDetailsSection";
import TrackOrdreScreen from "../TrackOrdreScreen";
import CircularCheckbox from "../CircularCheckbox";
import { useState } from "react";
import Swipe_Button from "../SwipeButton";
import NextButton from "../NextButton";
import { useNavigation } from "@react-navigation/native";
import PickUpAddressModal from "./PickUpAddressModal";
import InputFields from "@/InputFields";

const InprogressModal = ({
  visible,
  handlemodalChange,
  item,
  TopTabScreen,
  pickModalVisible,
}) => {
  const status = [
    "received",
    "accepted",
    "processed",
    "pickup_done",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];
  const Time = item?.timestamps;

  const navigation = useNavigation();

  const [isChecked, setisChecked] = useState(false);

  const [pickUpaddressScreen, setpickUpaddressScreen] = useState(
    pickModalVisible || false
  );

  const [deliveryPesons, setdeliveryPesons] = useState({
    Number: "",
    Name: "",
  });

  const [OrderItemDetails, setOrderItemDetails] = useState({
    Weight: "",
    Height: "",
    Width: "",
    Length: "",
  });

  const [swipeStatus, setswipeStatus] = useState(false);
  const [deliveryOption, setdeliveryOption] = useState("");

  const handleOrderdeatils = (text, input) => {
    setOrderItemDetails((prev) => ({
      ...prev,
      [input]: text,
    }));
  };

  const handlePickUp = () => {
    handlemodalChange();
    setpickUpaddressScreen(!pickUpaddressScreen);
  };

  const handelDelivery = () => {
    setpickUpaddressScreen(!pickUpaddressScreen);
  };

  // const handlePickupModal = () => {
  //     handlemodalChange()
  //     setpickUpaddressScreen(!pickUpaddressScreen)
  // }

  // useEffect(() => {
  //     const swipeButton = setTimeout(() => {
  //         setswipeStatus(false)
  //     }, 5000);
  // }, [swipeStatus])

  const handleSwipeButton = () => {
    if (deliveryOption) {
      setswipeStatus(true);
    } else {
      alert("please select delivery option");
    }
  };

  const handlCheckBox = (Option) => {
    setswipeStatus(false);
    setdeliveryOption(Option);
    setisChecked(!isChecked);
  };

  const handleDeliveryDetails = (text, input) => {
    setdeliveryPesons((prev) => ({
      ...prev,
      [input]: text,
    }));
  };

  return (
    <>

      <PickUpAddressModal
        item={item}
        pickUpaddressScreen={pickUpaddressScreen}
        handlePickUp={handlePickUp}
        handelDelivery={handelDelivery}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={handlemodalChange}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.5}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.63)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.Modal_Conatiner}>
            <ModalHeader item={item} handlemodalChange={handlemodalChange} />

            <ScrollView>
              <View
                style={{
                  paddingBottom: 50,
                  flex: 1,
                }}
              >
                <BillDetailsPart item={item} />

                <TrackOrdreScreen item={item} TopTabScreen={TopTabScreen} />

                {TopTabScreen === "inprogress" && (
                  <View>
                    <View style={styles.deliveryOptionBox}>
                      <Text
                        style={{
                          fontFamily: fonts.PRIMARY_FONT_400,
                          fontSize: 14,
                          lineHeight: 16,
                        }}
                      >
                        Choose Delivery Option
                      </Text>

                      <View style={styles.DeliveryOption}>
                        <CircularCheckbox
                          label={"BY GramZo"}
                          onClick={() => handlCheckBox("BY GramZo")}
                          isChecked={deliveryOption == "BY GramZo"}
                        />
                        <CircularCheckbox
                          label={"Self"}
                          onClick={() => handlCheckBox("Self")}
                          isChecked={deliveryOption == "Self"}
                        />
                      </View>
                    </View>

                    <View style={styles.SwipeButton}>
                      <Swipe_Button
                        onSwipeSuccess={handleSwipeButton}
                        active={!deliveryOption}
                      />
                    </View>

                    {
                      swipeStatus && (deliveryOption == "Self" ? (
                        <View style={styles.DelievryProson}>
                          <InputFields
                            label="Deliver Person contact Number"
                            value={deliveryPesons.Number}
                            onChangeText={(text) => handleDeliveryDetails(text, "Number")}
                          />
                          <InputFields
                            label="Deliver Person Name"
                            value={deliveryPesons.Name}

                            onChangeText={(text) => handleDeliveryDetails(text, "Name")}
                          />
                        </View>
                      ) : (
                        <View style={styles.setOrderItemDetails}>

                          <InputFields
                            label="Weight"
                            value={OrderItemDetails.Weight}
                            onChangeText={(text) => handleOrderdeatils(text, "Weight")}
                          />
                          <InputFields
                            label="Height"
                            value={OrderItemDetails.Height}
                            onChangeText={(text) => handleOrderdeatils(text, "Height")}
                          />
                          <InputFields
                            label="Width"
                            value={OrderItemDetails.Width}
                            onChangeText={(text) => handleOrderdeatils(text, "Width")}
                          />
                          <InputFields
                            label="Length"
                            value={OrderItemDetails.Length}
                            onChangeText={(text) => handleOrderdeatils(text, "Length")}
                          />

                          {swipeStatus && <NextButton lable={deliveryOption == "Self" ? "Process Now" : "Next"} handlechangeScrenn={handlePickUp} disabled={!swipeStatus} />}

                        </View>
                      ))
                    }

                  </View>
                )
                }

              </View>

            </ScrollView>

          </View>
        </View>

      </Modal>

    </>
  )
}

const styles = StyleSheet.create({
  Modal_Conatiner: {
    borderRadius: 13,
    height: Dimensions.get("screen").height - 150,
    width: Dimensions.get("screen").width - 25,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },

  deliveryOptionBox: {
    paddingHorizontal: 15,
    backgroundColor: "#F4F4F4",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  DeliveryOption: {
    flexDirection: "row",
    gap: 15,
  },
  SwipeButton: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    height: 80,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  DelievryProson: {
    paddingHorizontal: 20,
    gap: 5,
    marginTop: 20,
  },

  setOrderItemDetails: {
    paddingHorizontal: 20,
    gap: 5,
    marginTop: 20,
  },
});

export default InprogressModal;
