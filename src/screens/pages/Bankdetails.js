import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import PrimaryButton from "@/PrimaryButton";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import InputFields from "@/InputFields";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentSetting } from "@rdx/VendorSlice";
import Loader from "@/Loader";
import { useNavigation } from "@react-navigation/native";
import NextButton from "@/OrderComponents/NextButton";
import colors from "@const/colors";

const Bankdetails = () => {
  const { isLoading, isError, store } = useSelector((state) => state.vendor);
  var paymentSetting = store.payment_settings.filter(
    (ps) => ps.status === "active"
  );

  const [accountHolderName, setAccountHolderName] = useState(
    paymentSetting?.length ? paymentSetting[0]?.name : ""
  );
  const [accountNumber, setAccountNumber] = useState(
    paymentSetting?.length ? paymentSetting[0]?.account_number : ""
  );
  const [repeatAccountNo, setRepeatAccountNo] = useState(
    paymentSetting?.length ? paymentSetting[0]?.account_number : ""
  );
  const [ifsCode, setIfsCode] = useState(
    paymentSetting?.length ? paymentSetting[0]?.ifsc : ""
  );
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const submitForm = () => {
    if (!accountHolderName)
      return setErrorMsg("Please enter Account Holder name");
    if (!accountNumber) return setErrorMsg("Please enter your account number");
    if (!repeatAccountNo)
      return setErrorMsg("Please re-enter your account number");
    if (!ifsCode) return setErrorMsg("Please enter your IFS Code");
    if (accountNumber != repeatAccountNo)
      return setErrorMsg("Account number don't match");
    if (ifsCode.length != 11)
      return setErrorMsg("IFS Code should be 11 characters long");

    // console.log(accountHolderName, accountNumber, ifsCode);
    setErrorMsg("");
    dispatch(
      addPaymentSetting({
        type: "bank",
        name: accountHolderName,
        account_number: accountNumber,
        ifsc: ifsCode,
        status: "active",
      })
    ).then(() => navigation.navigate("Paymentsetting"));
  };
  const verifyAccount = accountNumber !== repeatAccountNo && repeatAccountNo.length > 0

  const disabled = isLoading || verifyAccount || !accountHolderName || !accountNumber || !repeatAccountNo || !ifsCode

  return (
    <View style={{ backgroundColor: colors.PRIMARY_BACKGROUND_COLOR, flex: 1 }}>
      <StoreHeaders lable={"Add your bank Details"} navigation={true} />
      <View style={styles.upidetailsForm}>
        <InputFields
          label="Account holder name"
          value={accountHolderName}
          onChangeText={setAccountHolderName}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
        />
        <InputFields
          label="Bank account number "
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
          maxLength={16}
        />
        <InputFields
          label="Re-enter bank account number  "
          value={repeatAccountNo}
          onChangeText={setRepeatAccountNo}
          keyboardType="numeric"
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
          maxLength={16}
          masked={true}
        />

        <InputFields
          label="IFSC code"
          value={ifsCode}
          onChangeText={setIfsCode}
          maxLength={11}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
        />

        {verifyAccount && (
          <Text style={{ color: "red", fontSize: 12, marginBottom: 10 }}>
            Account number does not match
          </Text>
        )}

        {/* 
        <View style={{ marginVertical: 15 }}>
          <PrimaryButton
            width="100%"
            onPress={submitForm}
            isLoading={isLoading}
            // disabled={
            //   isLoading ||
            //   !accountHolderName ||
            //   !accountNumber ||
            //   !repeatAccountNo ||
            //   !ifsCode
            // }
          >
            <Text>Verify</Text>
          </PrimaryButton>
        </View> */}

        <NextButton
          lable="Verify"
          handlechangeScrenn={submitForm}
          disabled={disabled}
          isLoading={isLoading}
        />

      </View>
    </View>
  );
};

export default Bankdetails;

const styles = StyleSheet.create({
  upidetailsForm: {
    marginHorizontal: 30,
    marginVertical: 25,
  },
});
