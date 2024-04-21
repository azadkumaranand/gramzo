import { View, Text, StyleSheet, Modal } from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";
import { Feather } from "@expo/vector-icons";
import fonts from "@const/fonts";

const PickUpSheduleModal = ({ item, visible, handlemodalChange }) => {
  return (
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
          paddingTop: 65,
          paddingHorizontal: 15,
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.63)",
        }}
      >
        <View style={styles.Modal_Conatiner}>
          <View style={styles.Header}>
            <ModalHeader item={item} handlemodalChange={handlemodalChange} />
          </View>

          <View style={styles.AfterHeader}>
            <View style={styles.donebox}>
              <Feather name="check" size={50} color="#FFFFFF" />
            </View>

            <View
              style={{
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_500,
                  fontSize: 18,
                  color: "#404040",
                }}
              >
                Pickup Scheduled{" "}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_500,
                  fontSize: 15,
                  color: "#26A823",
                }}
              >
                for tomorrow
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_500,
                  fontSize: 15,
                  color: "#93908F",
                }}
              >
                Please prepare with the{" "}
              </Text>

              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_500,
                  fontSize: 15,
                  color: "#93908F",
                }}
              >
                product packaging
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modal_Conatiner: {
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  AfterHeader: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    gap: 20,
  },

  donebox: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    borderRadius: 9999,
    backgroundColor: "#4BA74E",
  },
});
export default PickUpSheduleModal;
