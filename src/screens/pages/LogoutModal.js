import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { textStyle } from "@const/fonts";
import fonts from "@const/fonts";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { vendorLogout } from "@rdx/VendorSlice";

const LogoutModal = ({ visible, handleClose }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(vendorLogout());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "splashScreen",
        },
      ],
    });
  };

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
          <Text
            style={{
              lineHeight: 30,
              ...textStyle(22, fonts.PRIMARY_FONT_700, "rgba(85, 85, 85, 1)"),
            }}
          >
            Logout Your Store
          </Text>
          <Text
            style={{
              lineHeight: 30,
              ...textStyle(
                18,
                fonts.PRIMARY_FONT_500,
                "rgba(147, 144, 143, 1)"
              ),
            }}
          >
            Are You Sure?
          </Text>

          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.Cancle} onPress={handleClose}>
              <Text
                style={textStyle(
                  14,
                  fonts.PRIMARY_FONT_700,
                  "rgba(255, 255, 255, 1)"
                )}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.LogOut} onPress={handleLogout}>
              <Text
                style={textStyle(
                  14,
                  fonts.PRIMARY_FONT_700,
                  "rgba(147, 144, 143, 1)"
                )}
              >
                LogOut
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },

  Cancle: {
    width: 110,
    height: 40,
    backgroundColor: "rgba(66, 175, 16, 1)",
    borderRadius: 71,
    alignItems: "center",
    justifyContent: "center",
  },
  LogOut: {
    width: 110,
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(147, 144, 143, 1)",
    borderRadius: 71,
    alignItems: "center",
    justifyContent: "center",
  },
  MainBox: {
    justifyContent: "center",
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.63)",
  },
  text2: {
    fontSize: 18,
    fontFamily: fonts.PRIMARY_FONT_500,
    color: "#93908F",
    lineHeight: 21,
  },
  text1: {
    fontSize: 22,
    fontFamily: fonts.PRIMARY_FONT_700,
    color: "#555555",
    // lineHeight: 21,
  },

  ModalBox: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    gap: 10,
    paddingVertical: 20,
    borderRadius: 15,
  },
});

export default LogoutModal;
