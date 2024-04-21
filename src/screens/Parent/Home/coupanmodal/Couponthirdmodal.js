import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import colors from "@const/colors";
import PrimaryButton from "../../../../components/PrimaryButton";
import { AntDesign } from "@expo/vector-icons";
import Radiobutton from "../../../../components/Radiobutton";
import { addCoupon } from "@rdx/CouponSlice";
import { useDispatch, useSelector } from "react-redux";

const Couponthirdmodal = ({
  targetCustomerModal,
  secondModalVisible,
  thirdModalVisible,
  showSuccessModal,
  setSuccessMessage,
  setData,
  data,
  item,
}) => {
  const dispatch = useDispatch();
  const [radiobutton, setRadioButton] = useState(null);
  const [itemId, setItemId] = useState(null);
  const initialTargetCustomer = [
    {
      name: "Only once for first time customers",
      isChecked: false,
      code: "ONCEFORFT",
    },
    {
      name: "Only once for all the customers",
      isChecked: false,
      code: "ONCEFORALL",
    },
    {
      name: "Unlimited times for all, till campaign expires",
      isChecked: false,
      code: "UNTILLEXPIRY",
    },
  ];
  const [targetCustomer, setTargetCustomer] = useState(initialTargetCustomer);
  const vendor_id = useSelector((state) => state.vendor.user._id);
  const store_id = useSelector((state) => state.vendor.store._id);
  const [errorMsg, setErrorMsg] = useState("");
  // useEffect(() => {
  //   if (item) {
  //     // console.log(item)
  //     setItemId(item._id);
  //     const editAllowedCustomer = targetCustomer.map((e) => {
  //       const matchedItem =
  //         item.allowedToCustomer.trim().toLowerCase() ==
  //         e.name.trim().toLowerCase();
  //       if (matchedItem) {
  //         console.log(item.allowedToCustomer.trim().toLowerCase());
  //         return {
  //           ...e,
  //           isChecked: true,
  //         };
  //       } else {
  //         return {
  //           ...e,
  //         };
  //       }
  //     });
  //     setTargetCustomer(editAllowedCustomer);
  //   } else {
  //     console.log("not allowed customer found");
  //   }
  // }, [item]);

  useEffect(() => {
    let updatedCustomer = targetCustomer;
    updatedCustomer.map((cust) => {
      if (cust.code === item?.targetCustomers) {
        // console.log(cust);
        cust.isChecked = true;
      }
    });
    setTargetCustomer(updatedCustomer);
    setErrorMsg("");
  }, [item]);

  const updateRadio = (index) => {
    let updatedCustomer = [...targetCustomer];
    for (let i = 0; i < targetCustomer.length; i++) {
      if (i === index) {
        updatedCustomer[index].isChecked = true;
      } else {
        updatedCustomer[i].isChecked = false;
        continue;
      }
      setTargetCustomer(updatedCustomer);
    }
  };

  const saveCoupon = (status, successMsg) => {
    const newData = targetCustomer.filter((item) => {
      return item.isChecked == true;
    });
    if (newData.length === 0)
      return setErrorMsg("Select one of the above options");
    setErrorMsg("");
    setData((prev) => ({
      ...prev,
      customer_type: newData,
      targetCustomers: newData[0].code,
      status: "published",
      itemId,
    }));
    const couponData = {
      // couponName: data.couponName,
      couponId: item?.vendor && item?.vendor != "" ? item?._id : "",
      couponCode: data.couponName,
      couponDiscountType: data.discountType,
      flatoffamount: data.flatoffamount || 0,
      percentDiscount: data.percentDiscount || 0,
      maxDiscount: data.maxDiscount || 0,
      minOrderValForThisCoupan: parseInt(data.minOrderValForThisCoupan),
      startDate: data.startDate,
      endDate: data.endDate,
      status: status,
      targetProducts: data.targetProucts,
      targetCustomers: newData[0].code,
      store_id: store_id,
      vendor_id: vendor_id,
      quickCouponId: item?.vendor && item?.vendor != "" ? "" : item?._id,
    };
    // console.log(couponData);
    setSuccessMessage(successMsg);
    dispatch(addCoupon(couponData));
    thirdModalVisible(false);
    showSuccessModal(true);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={targetCustomerModal}
      onRequestClose={() => {
        thirdModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <ScrollView>
          <View style={styles.onboardingForm}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  gap: 8,
                  color: "#404040",
                  // paddingHorizontal: 15,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  secondModalVisible(true);
                  thirdModalVisible(false);
                }}
              >
                <AntDesign name="arrowleft" size={22} color="black" />
                <Text
                  style={{
                    fontFamily: fonts.PRIMARY_FONT_500,
                    fontSize: 18,
                    // paddingHorizontal: 5,
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  thirdModalVisible(false);
                  setTargetCustomer(initialTargetCustomer);
                }}
                style={{
                  marginBottom: 10,
                  padding: 4,
                  borderRadius: 50,
                  backgroundColor: "#E3E3E3",
                }}
              >
                <AntDesign name="close" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 0.8,
                borderStyle: "solid",
                borderColor: "#E5E7EB",
                marginTop: 20,
              }}
            ></View>
            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                fontFamily: fonts.PRIMARY_FONT_500,
              }}
            >
              Target Customers
            </Text>
            <View
              style={{
                borderWidth: 0.8,
                borderStyle: "solid",
                borderColor: "#E3E3E3",
                marginTop: 20,
              }}
            ></View>

            <View style={{ marginTop: 15 }}>
              {targetCustomer.map((item, index) => {
                return (
                  <View key={index}>
                    <Radiobutton
                      label={item.name}
                      isChecked={item.isChecked}
                      onClick={() => updateRadio(index)}
                    />
                  </View>
                );
              })}
            </View>
            {errorMsg && (
              <Text
                style={{
                  color: "red",
                  paddingHorizontal: 15,
                  // marginTop: 20,
                  fontFamily: fonts.PRIMARY_FONT_500,
                }}
              >
                {errorMsg}
              </Text>
            )}
            <View
              style={[
                styles.btnContainer,
                {
                  marginVertical: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <PrimaryButton
                width="45%"
                onPress={() =>
                  saveCoupon("draft", "Coupon Added as draft Successfully!")
                }
                background="none"
              >
                Save as Draft
              </PrimaryButton>
              <PrimaryButton
                width="45%"
                onPress={() =>
                  saveCoupon("published", "Coupon Added Successfully!")
                }
              // background="yes"
              >
                Publish
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Couponthirdmodal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    height: 125,
    width: "100%",
    padding: 24,
    backgroundColor: colors.HEADER_GREEN_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 20,
    fontFamily: fonts.PRIMARY_FONT_700,
    color: "rgba(255, 255, 255, 1)",
  },
  btnsContainer: {
    // gap: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    marginVertical: 16,
  },
  btnHeading: {
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 7,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 18,
    color: "#555",
  },
  coupanContainer: {
    paddingHorizontal: 23,
  },
  addOffer: {
    color: "#93908F",
    borderWidth: 1,
    borderColor: "#93908F",
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 3,
    // backgroundColor: "red",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 10,
    marginVertical: 10,
  },
  coupanCard: {
    paddingHorizontal: 19,
    paddingTop: 20,
    marginBottom: 10,
  },
  cardLine1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBoldText: {
    color: "#555",
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 15,
  },
  cardDateText: {
    color: "#93908F",
    fontSize: 13,
  },
  cardSaveText: {
    color: "#3ABD9E",
    fontSize: 13,
    paddingHorizontal: 34,
    // backgroundColor: 'red',
    marginVertical: 10,
  },
  cardLine3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EBFFEB",
  },
  button: {
    flexDirection: "row",
    width: "30%",
    paddingVertical: 15,
    justifyContent: "center",
  },
  onboardingForm: {
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: "5%",
    paddingVertical: 23,
    borderWidth: 4,
    borderColor: "white",
    borderStyle: "solid",
    borderRadius: 20,
  },
  twoInputFieldBox: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  halfinput: {
    flex: 1,
    width: "45%",
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
