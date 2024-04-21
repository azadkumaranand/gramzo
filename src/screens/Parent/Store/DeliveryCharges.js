import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React from "react";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import fonts from "@const/fonts";
import InputFields from "@/InputFields";
import NextButton from "@/OrderComponents/NextButton";
import { useNavigation, useRoute } from "@react-navigation/core";
import { add_delivery_charges_api } from "../../../functions/api_functions";
import { useDispatch, useSelector } from "react-redux";
import { setStore } from "@rdx/VendorSlice";
import colors from "@const/colors";

const DeliveryCharges = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const dispatch = useDispatch();
  const store = useSelector((state) => state.vendor.store);
  // console.log(store.pickup_details.delivery_charges);
  const { location } = params;
  const deliveryCharges = store?.pickup_details?.delivery_charges?.[location];

  const [deliveryOption, setDeliveryOption] = useState(
    deliveryCharges?.type === "free"
      ? 1
      : deliveryCharges?.type === "limit"
      ? 2
      : deliveryCharges?.type === "fixed"
      ? 3
      : 0
  );

  const [chargesDetails, setchargesDetails] = useState({
    min_order_amount: deliveryCharges?.min_order_amount
      ? deliveryCharges?.min_order_amount + ""
      : "",
    delivery_charge:
      deliveryCharges?.delivery_charge && deliveryCharges?.type === "limit"
        ? deliveryCharges?.delivery_charge + ""
        : "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [fixCharges, setfixCharges] = useState(
    deliveryCharges?.delivery_charge && deliveryCharges?.type === "fixed"
      ? deliveryCharges?.delivery_charge + ""
      : ""
  );

  const handlechargesDetails = (text, type) => {
    setchargesDetails((prev) => ({
      ...prev,
      [type]: text,
    }));
  };

  const isButtonDisabled = () => {
    if (deliveryOption == 2) {
      return (
        chargesDetails.min_order_amount == "" ||
        chargesDetails.delivery_charge == ""
      );
    } else if (deliveryOption == 3) {
      return fixCharges == "";
    }
    return deliveryOption == 0;
  };

  const handleSaveButton = async () => {
    let type = "free";
    let delivery_charge = 0;
    if (deliveryOption == 2) {
      type = "limit";
      delivery_charge = chargesDetails.delivery_charge;
    } else if (deliveryOption == 3) {
      type = "fixed";
      delivery_charge = fixCharges;
    }

    const body = {
      type,
      location,
      delivery_charge,
      store_id: store._id,
    };
    if (type == "limit")
      body.min_order_amount = chargesDetails.min_order_amount;
    // console.log(body);
    setIsLoading(true);
    const [data, error] = await add_delivery_charges_api(body);
    setIsLoading(false);
    // console.log(data, error);
    dispatch(setStore(data.store));
    navigation.navigate("PickupAndDellivery");
  };

  const handleCharges = (type) => {
    setDeliveryOption(type);
  };

  const CheckBox = ({ label: Label, onClick, selectcharges }) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          // marginTop: 8,
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor:
              selectcharges == deliveryOption ? "#555555" : "white",
            borderWidth: 1,
            borderColor: "#555555",
            borderRadius: 1000,
          }}
        ></View>
        <Text
          style={{
            color: "#555555",
            fontFamily: fonts.PRIMARY_FONT_400,
            fontSize: 15,
          }}
        >
          {Label}
        </Text>
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

      <StoreHeaders
        lable={`Delivery Charges ${
          location == "within_city" ? "Within City" : "Across India"
        }`}
        navigation={true}
      />

      <View style={styles.AfterHeader}>
        <CheckBox
          label={"Free delivery on all orders"}
          onClick={() => handleCharges(1)}
          selectcharges={1}
        />
        <CheckBox
          label={"Free delivery above a certain bill"}
          onClick={() => handleCharges(2)}
          selectcharges={2}
        />

        {deliveryOption == 2 && (
          <View style={styles.chargesBox}>
            <InputFields
              label="Min amount for free delivery"
              value={chargesDetails.min_order_amount}
              onChangeText={(text) =>
                handlechargesDetails(text, "min_order_amount")
              }
              keyboardType="numeric"
              labelBg={colors.PRIMARY_BACKGROUND_COLOR}
            />
            <InputFields
              label="Charges below min amount"
              value={chargesDetails.delivery_charge}
              onChangeText={(text) =>
                handlechargesDetails(text, "delivery_charge")
              }
              keyboardType="numeric"
              labelBg={colors.PRIMARY_BACKGROUND_COLOR}
            />
          </View>
        )}

        <CheckBox
          label={"Fixed delivery charges for all orders"}
          onClick={() => handleCharges(3)}
          selectcharges={3}
        />

        {deliveryOption == 3 && (
          <View style={styles.chargesBox}>
            <InputFields
              label="Enter fix charge"
              value={fixCharges}
              onChangeText={(text) => setfixCharges(text)}
              keyboardType="number-pad"
              labelBg={colors.PRIMARY_BACKGROUND_COLOR}
            />
          </View>
        )}

        <NextButton
          disabled={isButtonDisabled() || isLoading}
          lable={"Save"}
          handlechangeScrenn={handleSaveButton}
          isLoading={isLoading}
        />
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chargesBox: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  Maincontainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },

  AfterHeader: {
    paddingHorizontal: 25,
    marginTop: 25,
    gap: 10,
  },
});

export default DeliveryCharges;
