import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import fonts, { textStyle } from "@const/fonts";
import InputFields from "@/InputFields";
import { useSelector } from "react-redux";
import colors from "@const/colors";

const CardDetails = ({ lable, cardName, cardNumer, cardPhoto }) => {
  return (
    <View style={styles.CardDetails}>
      <Text style={textStyle(18, fonts.PRIMARY_FONT_500, "#000000")}>
        {lable} Details
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <InputFields
          label={`Name (According to ${lable})`}
          value={cardName}
          editable={false}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
        />
        <InputFields
          label={`${lable} Card Number`}
          value={cardNumer}
          editable={false}
          labelBg={colors.PRIMARY_BACKGROUND_COLOR}
        />

        <View>
          <Text
            style={textStyle(13, fonts.PRIMARY_FONT_400, "#667085")}
          >{`Upload pdf of ${lable} (front and back both side)`}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 30,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <View style={styles.fileUploaded}>
            <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#448526")}>
              Already chosen{" "}
            </Text>
          </View>

          <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#667085")}>
            {cardPhoto}
          </Text>
        </View>
      </View>
    </View>
  );
};

const KYC_varification = () => {
  const [AdharcardName, setAdddharcardName] = useState("");
  const [AdharcardNumber, setAdharcardNumber] = useState("");
  const [aadhar_image_url, setAadharImage] = useState(null);
  const [aadhaarLoading, setAadhaarLoading] = useState(false);
  const [panLoading, setPanLoading] = useState(false);

  const { user } = useSelector((state) => state.vendor);
  const kyc_status = user?.kyc_status;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.Maincontainer}>
      {/* <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#71C442" translucent={true} /> */}

      <StoreHeaders lable={"KYC Verification "} navigation={true} />

      {kyc_status === "Verified" && (
        <View style={styles.varifyButton}>
          {/* <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={20}
            color="#FB7D13"
          /> */}
          <Entypo name="info-with-circle" size={18} color="#FB7D13" />
          <Text
            style={{
              fontFamily: fonts.PRIMARY_FONT_700,
              fontSize: 14,
              color: "#FB7D13",
            }}
          >
            Verified
          </Text>
        </View>
      )}

      <ScrollView style={styles.AfterHeader}>
        <CardDetails
          lable={"Aadhaar"}
          cardName={user?.aadhar_details?.aadhar_name}
          cardNumer={user?.aadhar_details?.aadhar_number}
          cardPhoto={"deepak.adhar.pdf"}
        />

        <CardDetails
          lable={"Pan"}
          cardName={user?.pan_details?.pan_name}
          cardNumer={user?.pan_details?.pan_number}
          cardPhoto={"deepak.adhar.pdf"}
        />
        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  CardDetails: {
    paddingVertical: 15,
  },

  fileUploaded: {
    width: "50%",
    height: 40,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    borderColor: "#448526",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  Maincontainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },
  varifyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    height: 40,
    backgroundColor: "#FFF8F2",
  },
  AfterHeader: {
    paddingHorizontal: 26,
    marginTop: 10,
  },
});

export default KYC_varification;
