import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import fonts, { textStyle } from "@const/fonts";
import OrderDetailsModal from "@/OrderComponents/modal/OrderDetailsModal";
import InprogressModal from "@/OrderComponents/modal/InprogressModal";
import RejectModal from "./modal/RejectModal";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { update_order_status_api } from "@func/api_functions";
import { acceptOrder } from "@rdx/OrderSlice";
import SuccessRejectModal from "./modal/SuccessRejectModal";

const OrderdItem = ({ item, Inprogress, pickModalVisible, routeName }) => {
  const [rejectModal, setrejectModal] = useState(false);
  const [PrintRow, setPrintRow] = useState(false);

  const time = dayjs(item?.timestamps?.received_at).format("DD MMM, hh:mma");
  const [isLoading, setIsLoading] = useState(false);

  const [visible, setvisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [EarningScreen, setEarningScreen] = useState(false);
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setvisible(!visible);
  };

  const handleAccept = async () => {
    setIsLoading(true);
    //api call
    const [data, err] = await update_order_status_api({
      order_id: item._id,
      status: "accepted",
    });
    setIsLoading(false);
    console.log(data, err);
    if (!err) dispatch(acceptOrder(data.order));
    setvisible(false);
    setSuccessModalVisible(true);
  };

  const handleInprogress = () => {};

  const handleForPickup = () => {
    setPrintRow(!PrintRow);
  };

  const handlEarningScrenn = () => {
    setEarningScreen(!EarningScreen);
  };

  const handleDeliver = () => {};

  const handelOutForDelivery = () => {};

  const handleReject = () => {
    setvisible(false);
    setrejectModal(!rejectModal);
  };

  const callToActionButton = () => {
    if (routeName == "inprogress") return "Ready";
    if (routeName == "Earning") return "Done";
    if (routeName == "forpickup") return PrintRow ? "-" : "+";
    if (routeName == "todeliver") return "View";
    if (routeName == "outfordelivery") return "View";
    if (routeName == "cancel") return "View";
    return "Accept";
  };

  const onClick = () => {
    // return handleModalOpen
    if (routeName == "inprogress") return handleInprogress;
    if (routeName == "forpickup") return handleForPickup;
    if (routeName == "todeliver") return handleDeliver;
    if (routeName == "outfordelivery") return handelOutForDelivery;
    if (routeName == "Earning") return null;
    return handleAccept;
  };

  return (
    <>
      <RejectModal
        visible={rejectModal}
        handleClose={() => setrejectModal(!rejectModal)}
        item={item}
      />

      <SuccessRejectModal
        item={item}
        type={"Accept"}
        visible={successModalVisible}
        handleClose={() => setSuccessModalVisible(!successModalVisible)}
      />

      {Inprogress ? (
        <InprogressModal
          pickModalVisible={pickModalVisible}
          visible={visible}
          TopTabScreen={routeName}
          handlemodalChange={handleModalOpen}
          item={item}
        />
      ) : (
        <OrderDetailsModal
          visible={visible}
          handlemodalChange={handleModalOpen}
          item={item}
          TopTabScreen={routeName}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      )}

      <View style={styles.mainContainer}>
        <Pressable onPress={handleModalOpen} style={styles.Mainbox}>
          <Text
            style={{
              width: "30%",
              fontFamily: fonts.PRIMARY_FONT_400,
              fontSize: 14,
              color: "#93908F",
            }}
          >
            {time}
          </Text>
          <Text
            style={{
              width: "25%",
              fontFamily: fonts.PRIMARY_FONT_400,
              fontSize: 14,
              color: "#93908F",
            }}
          >
            #{item?.track_id}
          </Text>
          <Text
            style={{
              width: "20%",
              fontFamily: fonts.PRIMARY_FONT_400,
              fontSize: 14,
              color: "#93908F",
            }}
          >
            {item?.total_bill}
          </Text>

          <TouchableOpacity
            style={styles.Button}
            onPress={onClick()}
            disabled={routeName == "Earning"}
          >
            <Text
              style={{
                fontFamily: fonts.PRIMARY_FONT_400,
                fontSize: routeName == "forpickup" ? 16 : 14,
                color: "#26A823",
              }}
            >
              {callToActionButton()}
            </Text>
          </TouchableOpacity>
        </Pressable>

        {PrintRow && (
          <View
            style={{
              flexDirection: "row",
              gap: 15,
            }}
          >
            <TouchableOpacity style={styles.PrintButton}>
              <Text style={textStyle(14, fonts.PRIMARY_FONT_600, "#555555")}>
                Print Label
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.PrintButton}>
              <Text style={textStyle(14, fonts.PRIMARY_FONT_600, "#555555")}>
                Print Manifest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.CancleButon}>
              <Text style={textStyle(14, fonts.PRIMARY_FONT_600, "#FB7D13")}>
                Cancel Schedule
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
    flex: 1,
    width: "100%",
  },
  CancleButon: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
    backgroundColor: "#FFF8F2",
  },
  PrintButton: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 9999,
    backgroundColor: "#E8E8E8",
  },
  Mainbox: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  Button: {
    backgroundColor: "#D6FFD5",
    // paddingHorizontal: 10,
    // paddingVertical: 3,
    alignItems: "center",
    justifyContent: "center",
    width: "16%",
    borderRadius: 4,
  },
});

export default OrderdItem;
