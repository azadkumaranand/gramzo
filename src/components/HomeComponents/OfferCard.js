import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import OnboardingInputFields from "../OnboardingComponents/OnboardingInputFields";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "@const/colors";
import RoundedButton from "../RoundedButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { add_update_coupon_api } from "@func/api_functions";
import OverlayLoading from "../OverlayLoading";
import DateTimePicker from "../DateTimePicker";
import { showTost } from "../../functions/utils";
import CoupenModalSecond from "./CoupenModalSecond";
import Product from "./Product";
import fonts from "@const/fonts";

const OfferCard = ({ hideCard, offers }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const route = useRoute();

  const { params } = route;
  const [DataType, setDataType] = useState("");

  const [VisibleModal, setVisibleModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [isAllProducts, setIsAllProducts] = useState(true);
  const [selectProduct, setselectProduct] = useState(params?.ItemValidforOffer || []);
  const [isSpecificProduct, setIsSpecificProduct] = useState(false);
  const [campaignName, setCampaignName] = useState(params?.campaign_name || "");
  const [offerCode, setOfferCode] = useState(params?.offer_code || "");

  const [discount, setDiscount] = useState(
    params?.percent_discount.toString() ?? ""
  );

  const [minimumOrder, setMinimumOrder] = useState(
    params?.min_order_discount.toString() ?? ""
  );

  const [maxDisconut, setmaxDisconut] = useState(
    params?.max_discount.toString() ?? ""
  );

  const [startDate, setStartDate] = useState(params?.start_date || "");
  const [endDate, setEndDate] = useState(params?.end_date || "");

  const [isLoading, setIsLoading] = useState(false);

  const offercard = useSelector((state) => state.offercard);
  const store = useSelector((state) => state.vendor.store);

  const isDateError = useMemo(() => {
    return startDate && endDate && new Date(startDate) > new Date(endDate);
  }, [startDate, endDate]);

  const HandleDateTimePickerModal = (type) => {
    setOpen(true)
    setDataType(type)
  }



  const handleStartDate = (pickedDate) => {
    console.log(new Date(pickedDate).toLocaleDateString());
    if (DataType === "Start") {
      setStartDate(pickedDate);
    } else if (DataType === "End") {
      setEndDate(pickedDate);
    }
    else if (DataType === "End") {
      setEndDate(pickedDate)
    }
  }

  // console.log(!offerCode)

  // const handleAllProductsClick = () => {
  // 	setIsAllProducts(true);
  // 	setIsSpecificProduct(false);
  // };

  // const handleSpecificProductClick = () => {
  // 	setIsAllProducts(false);
  // 	setIsSpecificProduct(true);
  // };

  const dimensionWidth = Dimensions.get("screen").width;
  const dimensionHeight = Dimensions.get("window").height;

  const handleSecondModal = (VisibleModal) => {
    if (
      !offerCode ||
      !discount ||
      !minimumOrder ||
      !maxDisconut ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill all the fields");
      return;
    } else {
      setVisibleModal(!VisibleModal);
    }
  };

  const handleOfferCard = async () => {
    const data = {
      campaign_name: campaignName,
      offer_code: offerCode.toUpperCase(),
      percent_discount: discount,
      min_order_discount: minimumOrder,
      max_discount: maxDisconut,
      start_date: startDate,
      end_date: endDate,
      discountStatus: true,
      store_id: store?._id,
      ItemValidforOffer: selectProduct,
    };

    console.log(data);

    if (params?._id) data["coupon_id"] = params._id;

    if (data.ItemValidforOffer.length === 0) {
      alert("Please select item");
      return;
    }
    setIsLoading(true);
    try {
      const res = await add_update_coupon_api(data);
      console.log(JSON.stringify(res, null, 2));
      if (res.error) {
        alert("Internal Server Error!");
        return;
      }

      showTost("Offer added sucessfully");

      if (params?.updatestatus) {
        navigation.navigate("OfferScreen");
      } else {
        hideCard();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <DateTimePicker
        open={open}
        setOpen={setOpen}
        handleSelectDate={handleStartDate}
        mode="date"
      />

      <CoupenModalSecond
        handleSecondModal={handleSecondModal}
        VisibleModal={VisibleModal}
        handleOfferCard={handleOfferCard}
        selectProduct={selectProduct}
        setselectProduct={setselectProduct}
      />

      {isLoading && <OverlayLoading />}
      <ScrollView style={styles.card}>
        <View style={styles.cardHeader}>
          <Pressable onPress={hideCard} style={{ marginRight: 8 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>

          {params?.updatestatus && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "rgba(85, 166, 48, 1)",
              }}
            >
              "Code: {params?.offer_code}"
            </Text>
          )}
          <Text
            style={{
              fontSize: 18,
              fontFamily: fonts.PRIMARY_FONT_500,
              color: "rgba(64, 64, 64, 1)",
            }}
          >
            {params?.updatestatus ? "Review" : "Add New Offer"}
          </Text>
        </View>

        <View>
          <OnboardingInputFields
            name="Offer Code"
            placeholder="Enter Here"
            value={offerCode}
            autoCapitalize="characters"
            keyboardType="name-phone-pad"
            maxLength={10}
            onChangeText={(text) =>
              setOfferCode(text.replace(/[^a-z0-9]/gi, ""))
            }
          />

          <OnboardingInputFields
            keyboardType="numeric"
            name="% Discount"
            placeholder="Enter Here"
            value={discount}
            onChangeText={setDiscount}
          />
          <OnboardingInputFields
            keyboardType="numeric"
            name="Discount on min order of (Rs)"
            placeholder="Enter Here"
            value={minimumOrder}
            onChangeText={setMinimumOrder}
          />

          <OnboardingInputFields
            keyboardType="numeric"
            name="Maximum discount (Rs)"
            placeholder="Enter Here"
            value={maxDisconut}
            onChangeText={setmaxDisconut}
          />

          <View style={styles.customizationContainer}>
            <View style={styles.TimePickerContainer}>
              <Text style={styles.Type}>Start Date</Text>
              <TouchableOpacity
                style={styles.TimePicker}
                onPress={() => HandleDateTimePickerModal("Start")}
              >
                <Text>
                  {!startDate
                    ? "xx/xx/xxxx"
                    : new Date(startDate).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.TimePickerContainer}>
              <Text
                style={{
                  color: "#344054",
                  fontFamily: fonts.PRIMARY_FONT_400,
                  fontSize: 14,
                }}
              >
                End Date
              </Text>
              <TouchableOpacity
                style={styles.TimePicker}
                onPress={() => HandleDateTimePickerModal("End")}
              >
                <Text>
                  {!endDate
                    ? "xx/xx/xxxx"
                    : new Date(endDate).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            {/* <OnboardingInputFields
              name="Start Date"
              placeholder="xx/xx/xxxx"
              width={dimensionWidth / 2.6}
              value={startDate}
              onChangeText={setStartDate}
            />
            <OnboardingInputFields
              name="End Date"
              placeholder="xx/xx/xxxx"
              width={dimensionWidth / 2.6}
              value={endDate}
              onChangeText={setEndDate}
            /> */}
          </View>


          {
            params?.updatestatus &&
            <Product selectProduct={selectProduct} setselectProduct={setselectProduct} handleOfferCard={handleOfferCard} update={params?.updatestatus} />
          }

          {isDateError ? <View style={{ marginBottom: 10 }}>
            <Text style={{ color: "red", fontSize: 10 }}>*End Date should be greater than start date</Text>
          </View> : null}


          <View style={styles.btn}>
            <RoundedButton
              color={colors.ORANGE_SHADE}
              width="100%"
              onPress={handleSecondModal}
            >
              Next
            </RoundedButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default OfferCard;

const dimensionHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000AA",
  },

  card: {
    height: "100%",
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    marginVertical: dimensionHeight / 10,
    borderRadius: 15,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 32,
    alignItems: "center",
    gap: 5,
  },
  customizationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  chekcboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otherOptionContainer: {
    marginVertical: 18,
  },
  checkBoxText: {
    color: "black",
    textDecorationLine: "none",
    fontSize: 15,
    fontFamily: fonts.PRIMARY_FONT_400,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderColor: colors.INPUT_BORDER_COLOR,
  },
  btn: {
    marginBottom: 40,
  },

  TimePickerContainer: {
    width: "45%",
  },
  TimePicker: {
    borderWidth: 1,
    padding: 10,
    fontFamily: fonts.PRIMARY_FONT_400,
    borderColor: colors.INPUT_BORDER_COLOR,
    borderRadius: 50,
    marginTop: 6,
    marginBottom: 12,
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },

  Type: {
    color: "#344054",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 14,
  },
});
