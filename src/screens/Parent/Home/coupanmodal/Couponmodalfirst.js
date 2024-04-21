import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "@const/colors";
import fonts from "@const/fonts";
import InputFields from "../../../../components/InputFields";
import DropdownDemo from "../../../../components/OnboardingComponents/DropdownDemo";
import PrimaryButton from "../../../../components/PrimaryButton";
import DateTimePicker from "../../../../components/DateTimePicker";
import DateField from "./DateField";

const Couponmodalfirst = ({
  onClose,
  modalVisible,
  setModalVisible,
  secondModalVisible,
  data,
  setData,
  item,
}) => {
  const [openDatePicker, setOpenDAtePicker] = useState(false);

  const [dateField, setDateField] = useState("");
  const [couponName, setCouponName] = useState("");
  const [discountType, setDiscountType] = useState("Flat");
  const [flatoffamount, setFlatoffamount] = useState("");
  const [percentDiscount, setPercentDiscount] = useState("");
  const [minOrderValForThisCoupan, setMinOrderValForThisCoupan] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [startDate, setStartDate] = useState("Start Date");
  const [endDate, setEndDate] = useState("End Date");

  const discountTypeOptions = [
    { value: "Flat", label: "Flat Off" },
    { value: "Percent", label: "Percent Off" },
  ];

  const [error_message, setError_message] = useState("");
  const submitForm = () => {
    if (!couponName) return setError_message("Please enter coupon name");
    if (!minOrderValForThisCoupan)
      return setError_message("Please enter minimum value for this coupon");
    if (discountType === "Flat") {
      if (!flatoffamount)
        return setError_message("Please enter flat off amount");
      if (parseInt(flatoffamount) > parseInt(minOrderValForThisCoupan))
        return setError_message(
          "Flat off amount cannot be greater than MIN Order value"
        );
    }
    if (discountType === "Percent") {
      if (!percentDiscount || !maxDiscount)
        return setError_message(
          "Please enter percent discount and max discount"
        );
      if (maxDiscount > minOrderValForThisCoupan)
        return setError_message(
          "Max Discount cannot be greater than MIN Order value"
        );
    }

    const newData = {
      couponName,
      discountType,
      flatoffamount,
      percentDiscount,
      minOrderValForThisCoupan,
      maxDiscount,
      startDate,
      endDate,
    };
    // console.log(newData);
    setData((prev) => ({ ...prev, ...newData }));
    setError_message("");
    secondModalVisible(true);
    setModalVisible(false);
  };

  // Update state when 'item' prop changes

  useEffect(() => {
    // console.log(item);
    if (item) {
      setCouponName(item.couponCode || "");
      setFlatoffamount(item.flatoffamount + "" || "");
      setMinOrderValForThisCoupan(item.minOrderValForThisCoupan + "" || "");
      setDiscountType(item.couponDiscountType || "");
      setMaxDiscount(item.maxDiscount || "");
      setStartDate(item.startDate || "");
      setEndDate(item.endDate || "");
    } else {
      setCouponName("");
      setFlatoffamount("");
      setMinOrderValForThisCoupan("");
      setDiscountType("");
      setMaxDiscount("");
      setStartDate("Start Date");
      setEndDate("End Date");
    }
    setError_message("");
  }, [item, modalVisible]);

  const handleInputChange = (name, value) => {
    setInputValue((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const HandleDateTimePickerModal = (type) => {
    setOpenDAtePicker(true);
    setDateField(type);
  };

  const handleSelectDate = (pickedDate) => {
    const selectedDate = new Date(pickedDate).toLocaleDateString();
    if (dateField === "Start") {
      setStartDate(selectedDate);
    } else if (dateField === "End") {
      setEndDate(selectedDate);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <DateTimePicker
        open={openDatePicker}
        setOpen={setOpenDAtePicker}
        mode="date"
        handleSelectDate={handleSelectDate}
      />
      <View
        style={[
          styles.modalContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ScrollView>
          <View style={styles.onboardingForm}>
            <View style={styles.formTop}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: fonts.PRIMARY_FONT_600,
                  color: "#404040",
                  paddingHorizontal: 15,
                }}
              >
                Add New Offer
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  padding: 4,
                  borderRadius: 50,
                  backgroundColor: "#E3E3E3",
                }}
              >
                <AntDesign name="close" size={20} color="#555" />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: 24 }}>
              <InputFields
                label="Enter Code Name"
                value={couponName}
                onChangeText={setCouponName}
              />
              <View style={styles.twoInputFieldBox}>
                <View style={styles.halfinput}>
                  <DropdownDemo
                    item={discountTypeOptions}
                    dropdown_type="Discount Type"
                    handleChange={setDiscountType}
                  />
                </View>
                <View style={styles.halfinput}>
                  {discountType === "Flat" ? (
                    <InputFields
                      label="Flat Off Amount"
                      value={flatoffamount}
                      onChangeText={setFlatoffamount}
                      keyboardType="numeric"
                    />
                  ) : (
                    <InputFields
                      label="% Discount"
                      value={percentDiscount}
                      onChangeText={setPercentDiscount}
                      keyboardType="numeric"
                    />
                  )}
                </View>
              </View>

              <InputFields
                label="Min order value for this coupon "
                value={minOrderValForThisCoupan}
                onChangeText={setMinOrderValForThisCoupan}
                keyboardType="numeric"
              />

              {discountType === "Percent" && (
                <InputFields
                  label="Max discount while using this code"
                  value={maxDiscount}
                  onChangeText={setMaxDiscount}
                  keyboardType="numeric"
                />
              )}

              <View style={styles.twoInputFieldBox}>
                <TouchableOpacity
                  style={[styles.halfinput]}
                  onPress={() => {
                    HandleDateTimePickerModal("Start");
                  }}
                >
                  <DateField placeholder={startDate} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.halfinput]}
                  onPress={() => {
                    HandleDateTimePickerModal("End");
                  }}
                >
                  <DateField placeholder={endDate} />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: "red",
                  paddingHorizontal: 15,
                  marginTop: 20,
                  fontFamily: fonts.PRIMARY_FONT_500,
                }}
              >
                {error_message != "" ? error_message : ""}
              </Text>
              <View style={[styles.btnContainer, { marginVertical: 16 }]}>
                <PrimaryButton width="100%" onPress={submitForm}>
                  Next
                </PrimaryButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Couponmodalfirst;

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
    backgroundColor: "#fff",
    width: "90%",
    marginVertical: 15,
    marginHorizontal: "5%",
    paddingVertical: 23,
    borderRadius: 15,
  },
  formTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 23,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  twoInputFieldBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
