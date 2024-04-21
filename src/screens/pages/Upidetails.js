import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import PrimaryButton from "@/PrimaryButton";
import InputFields from "@/InputFields";
import { useNavigation } from "@react-navigation/native";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentSetting } from "@rdx/VendorSlice";
import fonts from "@const/fonts";
import Loader from "@/Loader";
import NextButton from "@/OrderComponents/NextButton";
import colors from "@const/colors";

const Upidetails = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, store } = useSelector((state) => state.vendor);
  const isdisabled = !upiId || !accountHolderName;
  var paymentSetting = store.payment_settings.filter(
    (ps) => ps.status === "active"
  );

  const [accountHolderName, setAccountHolderName] = useState(
    paymentSetting?.length ? paymentSetting[0]?.name : ""
  );
  const [upiId, setUpiId] = useState(
    paymentSetting?.length ? paymentSetting[0]?.upi_id : ""
  );
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();

  console.log(isdisabled);
  const submitForm = () => {
    if (!accountHolderName)
      return setErrorMsg("Please enter account holder name");
    if (!upiId) return setErrorMsg("Please enter your UPI ID");
    setErrorMsg("");
    dispatch(
      addPaymentSetting({
        type: "upi",
        name: accountHolderName,
        upi_id: upiId,
        status: "active",
      })
    ).then(() => navigation.navigate("Paymentsetting"));
  };

  return (
    <View style={{ backgroundColor: colors.PRIMARY_BACKGROUND_COLOR, flex: 1 }}>
      <StoreHeaders lable={"Add your UPI Details"} navigation={true} />
      <View style={styles.upidetailsForm}>
        <InputFields
          label="Account holder name"
          value={accountHolderName}
          onChangeText={setAccountHolderName}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
        />
        <InputFields
          label="UPI ID"
          value={upiId}
          onChangeText={setUpiId}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
        />

        {errorMsg && (
          <Text style={{ color: "red", fontFamily: fonts.PRIMARY_FONT_400 }}>
            {errorMsg}
          </Text>
        )}
        <View style={{ marginVertical: 15 }}>
          <PrimaryButton
            width="100%"
            onPress={submitForm}
            isLoading={isLoading}
            // disabled={isLoading || !accountHolderName || !upiId}
          >
            <Text>Verify</Text>
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default Upidetails;

const styles = StyleSheet.create({
  upidetailsForm: {
    marginHorizontal: 30,
    marginVertical: 30,
  },
});
