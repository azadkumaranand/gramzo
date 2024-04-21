import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import fonts, { textStyle } from "@const/fonts";
import NextButton from "@/OrderComponents/NextButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import DottedCheckBox from "@/storecomponent/DottedCheckBox";
import colors from "@const/colors";

const DeliveryTime = () => {
  const { params } = useRoute();

  const navigation = useNavigation();
  const [deliveryType, setdeliveryType] = useState(
    params.deliveryType || "Automatic"
  );

  const handlechangeScrenn = () => {
    navigation.navigate("PickupAndDellivery", { deliveryType: deliveryType });
  };

  const onhandleDiliverry = (type) => {
    setdeliveryType(type);
  };

  const handleNavigation = () => { };

  return (
    <SafeAreaView style={styles.Maincontainer}>
      {/* <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#71C442"
        translucent={true}
      /> */}
      <StoreHeaders lable={"Delivery Time"} navigation={true} />

      <View style={styles.afterHeader}>
        <TouchableOpacity
          style={{
            ...styles.timeBox,
            borderColor: deliveryType == "Automatic" ? "#42AF10" : "#D1D5DB",
          }}
          onPress={() => onhandleDiliverry("Automatic")}
        >
          <View style={styles.leftPart}>
            <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#1B1816")}>
              Automatic
            </Text>
            <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#6B7280")}>
              GramZo will calculate the delivery time{" "}
            </Text>
          </View>

          <View style={styles.RightPart}>
            <DottedCheckBox ischecked={deliveryType == "Automatic"} />
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{
            ...styles.timeBox,
            borderColor: deliveryType == "Custom" ? "#42AF10" : "#D1D5DB",
          }}
          onPress={() => onhandleDiliverry("Custom")}
        >
          <View style={styles.leftPart}>
            <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#1B1816")}>Custom</Text>
            <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#6B7280")}>
              set min and max delivery time{" "}
            </Text>
          </View>

          <View style={styles.RightPart}>
            <DottedCheckBox ischecked={deliveryType == "Custom"} />
          </View>
        </TouchableOpacity> */}

        <NextButton lable={"Save"} handlechangeScrenn={handlechangeScrenn} />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  RightPart: {
    alignItems: "center",
    justifyContent: "center",
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
export default DeliveryTime;
