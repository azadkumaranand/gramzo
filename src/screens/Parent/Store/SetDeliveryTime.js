import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import InputFields from "@/InputFields";
import { useState } from "react";
import NextButton from "@/OrderComponents/NextButton";
import fonts from "@const/fonts";

const SetDeliveryTime = () => {
  const [deleveryDays, setdeleveryDays] = useState({
    minimumDays: "",
    maximumDays: "",
  });

  const onHandleDays = (text, type) => {
    setdeleveryDays((prev) => ({
      ...prev,
      [type]: text,
    }));
  };

  const handlechangeScrenn = () => {};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      // visible={}
      // onRequestClose={}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.5}
    >
      <View style={styles.MainBox}>
        <View style={styles.ModalBox}>
          <View style={styles.Header}>
            <Text
              style={{
                fontFamily: fonts.PRIMARY_FONT_600,
                fontSize: 18,
                color: "#404040",
              }}
            >
              Set Delivery time
            </Text>

            <TouchableOpacity style={styles.CancleButton}>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.AfterHeader}>
            <InputFields
              label="Minimum Days"
              value={deleveryDays.minimumDays}
              onChangeText={(text) => onHandleDays(text, "minimumDays")}
            />
            <InputFields
              label="Maximum Days"
              value={deleveryDays.maximumDays}
              onChangeText={(text) => onHandleDays(text, "maximumDays")}
            />
          </View>

          <NextButton lable={"Save"} handlechangeScrenn={handlechangeScrenn} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  AfterHeader: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 20,
    alignItems: "center",
  },

  CancleButton: {
    backgroundColor: "#E3E3E3",
    borderRadius: 999,
    padding: 3,
  },
  MainBox: {
    paddingTop: 65,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.63)",
  },
  ModalBox: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
    borderRadius: 15,
  },
});

export default SetDeliveryTime;
