import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import fonts from "@const/fonts";
import { useNavigation } from "@react-navigation/native";

const SuccessRejectModal = ({ type, item, handleClose, visible }) => {
  const navigation = useNavigation();
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => {
      handleClose();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [visible, navigation]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.5}
    >
      <View style={styles.MainBox}>
        <View style={styles.ModalBox}>
          <View style={styles.header}>
            <View style={styles.leftPart}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: fonts.PRIMARY_FONT_600,
                  color: type == "Accept" ? "#404040" : "#FF0000",
                }}
              >
                {type == "Accept" ? "Order ID" : "Reject"}: #{item?.track_id}
              </Text>
              <View style={styles.Payment}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.PRIMARY_FONT_600,
                    color: "#55A630",
                  }}
                >
                  {item?.payment?.payment_mode}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.RightPart} onPress={handleClose}>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "#E5E7EB",
              paddingBottom: 20,
            }}
          >
            <View style={styles.Earning}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.PRIMARY_FONT_400,
                  color: "#555555",
                }}
              >
                your earnings from this order: ₹{item?.total_bill}/-
              </Text>
            </View>

            <View></View>
          </View>

          <View style={styles.belowBox}>
            <View style={styles.checkButoon}>
              <Feather name="check" size={60} color="#FFFFFF" />
            </View>

            <Text
              style={{
                fontFamily: fonts.PRIMARY_FONT_600,
                fontSize: 18,
                color: "#404040",
              }}
            >
              {type === "reject" ? "Rejected" : "Accepted"} Successfully
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  checkButoon: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    backgroundColor: "#4BA74E",
    borderRadius: 9999,
  },
  belowBox: {
    alignItems: "center",
    gap: 10,
    marginVertical: 40,
  },

  Earning: {
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    // width: 'auto', // Set width to auto
  },

  Payment: {
    backgroundColor: "#D3FFBF",
    borderRadius: 9999,
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  leftPart: {
    flexDirection: "row",
    gap: 10,
  },
  RightPart: {
    backgroundColor: "#F3F3F3",
    borderRadius: 9999,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    alignItems: "center",
  },
  MainBox: {
    paddingTop: 65,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.63)",
  },
  ModalBox: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 8,
  },
});

export default SuccessRejectModal;
