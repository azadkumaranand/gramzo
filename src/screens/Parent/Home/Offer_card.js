import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { delete_coupon_api } from "@func/api_functions";
import { showTost } from "../../../functions/utils";
import fonts from "@const/fonts";

const Offer_card = ({ item }) => {
  const dispatch = useDispatch();

  console.log(item);
  const navigation = useNavigation();
  const offercard = useSelector((state) => state.offercard);
  const [isLoading, setIsLoading] = useState(false);

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const EndDate = new Date(item.end_date).toLocaleDateString("en-GB", options);
  const startDate = new Date(item.start_date).toLocaleDateString(
    "en-GB",
    options
  );

  const handleRemoveOffercard = async () => {
    setIsLoading(true);
    try {
      const res = await delete_coupon_api({ coupon_id: item._id });
      if (res.error) {
        alert("Error while deleting!");
        return;
      }
     
      showTost("Offer deleted sucessfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleupdate = () => {
    navigation.navigate("OfferCard", {
      updatestatus: "true",
      ...item,
    });
  };

  return (
    <View style={{}}>
      <View style={styles.Offer_card}>
        {item.is_draft && (
          <View style={styles.Draft}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: fonts.PRIMARY_FONT_600,
                color: "rgba(64, 64, 64, 1)",
              }}
            >
              Draft Coupon
            </Text>
          </View>
        )}

        <View style={styles.Top_BOx}>
          <View style={styles.Offer}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.PRIMARY_FONT_400,
                color: "rgba(194, 194, 194, 1)",
              }}
            >
              Code: {item.offer_code}
            </Text>
          </View>

          <View style={styles.Offer}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.PRIMARY_FONT_400,
                color: "rgba(194, 194, 194, 1)",
              }}
            >
              Applied to all Foods
            </Text>
          </View>
        </View>

        <View style={styles.Bottom_BOx}>
          <View style={styles.left}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.PRIMARY_FONT_400,
                color: "rgba(64, 64, 64, 1)",
              }}
            >
              {startDate} to {EndDate}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.PRIMARY_FONT_700,
                color: "rgba(85, 166, 48, 1)",
              }}
            >
              Flat {item.percent_discount}% off
            </Text>
          </View>

          <View style={styles.right}>
            <TouchableOpacity
              style={styles.reject}
              onPress={handleRemoveOffercard}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.PRIMARY_FONT_700,
                  color: "rgba(237, 28, 36, 1)",
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accept} onPress={handleupdate}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.PRIMARY_FONT_700,
                  color: "rgba(255, 255, 255, 1)",
                }}
              >
                Review
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Offer_card: {
    // width: 160,
    // height: 140,
    backgroundColor: "rgba(255, 255, 255, 1)",

    // paddingHorizontal: 10,
    // paddingVertical: 10,

    borderRadius: 10,
  },
  Offer: {
    borderLeftWidth: 4,
    paddingHorizontal: 5,
    borderColor: "rgba(194, 194, 194, 1)",
  },

  Top_BOx: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderColor: "rgba(229, 231, 235, 1)",
  },
  Bottom_BOx: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  right: {
    width: 120,
    gap: 10,
  },
  left: {
    gap: 10,
  },
  reject: {
    // width: "46%",
    // width:100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 77,
    borderWidth: 1,
    borderColor: "rgba(237, 28, 36, 1)",
  },
  accept: {
    // width: "46%",
    // width:100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 77,
    backgroundColor: "rgba(85, 166, 48, 1)",
  },

  Draft: {
    zIndex: 999,
    position: "absolute",
    paddingHorizontal: 5,
    paddingVertical: 5,
    top: 0,
    right: 0,
    backgroundColor: "rgba(214, 255, 213, 1)",
    borderTopRightRadius: 10,
  },
});

export default Offer_card;
