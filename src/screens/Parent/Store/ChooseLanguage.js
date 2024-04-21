import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import { useState } from "react";
import fonts, { textStyle } from "@const/fonts";
import NextButton from "@/OrderComponents/NextButton";
import { useNavigation } from "@react-navigation/native";
import DottedCheckBox from "@/storecomponent/DottedCheckBox";
import colors from "@const/colors";

const ChooseLanguage = () => {
  const navigation = useNavigation();
  const [languange, setlanguange] = useState("English");

  const handleChangelangunage = (type) => {
    if (type != "English") {
      alert("Coming Soon");
    } else {
      setlanguange(type);
    }
  };

  const LanguageBox = ({ lable, location }) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.timeBox,
          borderColor: lable == languange ? "#42AF10" : "#D1D5DB",
        }}
        onPress={() => handleChangelangunage(lable)}
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
              {lable}
            </Text>
          </View>
          <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#6B7280")}>
            {location}{" "}
          </Text>
        </View>

        <View style={styles.RightPart}>
          <DottedCheckBox ischecked={lable == languange} />
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
      <StoreHeaders lable={"Choose your language"} navigation={true} />

      <View
        style={{
          paddingHorizontal: 25,
          marginTop: 20,
        }}
      >
        <LanguageBox lable={"हिंदी"} location={"भारत की मातृभाषा"} />
        <LanguageBox
          lable={"संस्कृतम्"}
          location={"संस्कृतं भारत-आर्यभाषा अस्ति"}
        />
        <LanguageBox lable={"English"} location={"Friendly Communication"} />
        <LanguageBox lable={"Punjabi"} location={"Language of Panjab"} />
        <View
          style={{
            marginTop: 20,
          }}
        >
          <NextButton
            lable={"Save"}
            handlechangeScrenn={() =>
              navigation.navigate("Store", { languange: languange })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default ChooseLanguage;
