import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import fonts from "@const/fonts";
import { useNavigation } from "@react-navigation/native";
import SuccessRejectModal from "./SuccessRejectModal";
import { reject_order_api } from "@func/api_functions";
import { useDispatch } from "react-redux";
import { rejectOrder } from "@rdx/OrderSlice";
import Loader from "@/Loader";

const RejectModal = ({ item, visible, handleClose }) => {
  const navigaition = useNavigation();
  const [reason, setreason] = useState("Unavailable");
  const [otherReason, setotherReason] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handreason = (reason) => {
    setreason(reason);
  };

  const handleReject = async () => {
    // api call
    const karan = reason === "other" ? otherReason : "Item not available";
    setIsLoading(true);
    const [data, err] = await reject_order_api(item._id, karan);
    setIsLoading(false);
    if (!err) dispatch(rejectOrder(data.order))
    navigaition.navigate("CancleOrderScreen");
    setmodalVisible(true);
    handleClose();
  };

  return (
    <>
      <SuccessRejectModal
        item={item}
        type={"reject"}
        visible={modalVisible}
        handleClose={() => setmodalVisible(!modalVisible)}
      />
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
                <TouchableOpacity onPress={handleClose}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: fonts.PRIMARY_FONT_600,
                    color: "#FF0000",
                  }}
                >
                  Reject: #{item?.track_id}
                </Text>
                <View style={styles.Payment}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: fonts.PRIMARY_FONT_600,
                      color: "#55A630",
                    }}
                  >
                    COD
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

            <View style={styles.Reason}>
              <TouchableOpacity
                style={{
                  ...styles.ReasonButton,
                  backgroundColor:
                    reason == "Unavailable" ? "#D6FFD5" : "#FFFFFF",
                  borderWidth: reason == "Unavailable" ? 0 : 1,
                }}
                onPress={() => handreason("Unavailable")}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.PRIMARY_FONT_500,
                    color: reason == "Unavailable" ? "#555555" : "#1B1816",
                  }}
                >
                  Item not available
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.ReasonButton,
                  backgroundColor: reason == "other" ? "#D6FFD5" : "#FFFFFF",
                  borderWidth: reason == "other" ? 0 : 1,
                }}
                onPress={() => handreason("other")}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.PRIMARY_FONT_500,
                    color: reason == "other" ? "#555555" : "#1B1816",
                  }}
                >
                  Other Reason
                </Text>
              </TouchableOpacity>
            </View>

            {reason === "other" && (
              <TextInput
                numberOfLines={6}
                onChangeText={setotherReason}
                textAlignVertical="top"
                placeholder="Write the reasons for rejecting the order"
                style={styles.reasonMessage}
                multiline={true} // or multiline
              />
            )}

            <TouchableOpacity
              disabled={(reason === 'other' && otherReason.length < 10) || isLoading}
              style={{
                ...styles.rejectButton,
                borderColor: (reason === 'other' && otherReason.length < 10) ? 'rgba(255, 58, 58, 0.5)' : 'rgb(255, 58, 58)'
              }}
              onPress={handleReject}
            >
              {isLoading ? <Loader color="rgb(255, 58, 58)" size={28} p={0} /> : (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.PRIMARY_FONT_500,
                    color: (reason === 'other' && otherReason.length < 10) ? 'rgba(255, 58, 58, 0.5)' : 'rgb(255, 58, 58)',
                  }}
                >
                  Reject
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  rejectButton: {
    borderWidth: 1,
    borderColor: "#FF3A3A",
    paddingVertical: 10,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },

  Reason: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    marginTop: 20,
  },
  reasonMessage: {
    width: "100%",
    marginVertical: 20,
    paddingVertical: 10,
    height: 100,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 12,
  },

  ReasonButton: {
    width: "45%",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderColor: "#D0D5DD",
  },
  MainBox: {
    paddingTop: 65,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.63)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    alignItems: "center",
  },

  ModalBox: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 8,
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
  Payment: {
    backgroundColor: "#D3FFBF",
    borderRadius: 9999,
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RejectModal;
