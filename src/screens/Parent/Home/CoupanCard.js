import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Accordian from "../../../components/Accordian";
import { AntDesign } from "@expo/vector-icons";
import CoupanIcon from "@assets/coupanicon.png";
import { deleteCoupon, changeCouponStatus } from "@rdx/CouponSlice";

const cond = [
  "This offer may valid on specific products.",
  "Last date of this code is 12/4/2024.",
  "Min Cart Value ₹200 and Max off upto ₹120.",
  " Other T&C may apply",
];

export default CoupanCard = ({
  index,
  store_id,
  item,
  addHandler,
  //   deleteCouponCard,
  editCoupon,
  updateStatus,
}) => {
  const dispatch = useDispatch();
  const [expandedIndex, setIsExpandedIndex] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  //handle accordian
  const toggleAccordion = (index) => {
    setIsExpandedIndex(index);
    setIsExpanded(!isExpanded);
  };

  function deleteCouponCard(couponId) {
    if (!couponId || !store_id) return;
    dispatch(deleteCoupon(store_id, couponId));
  }

  function updateStatus(couponId, oldStatus) {
    if (!couponId || !store_id) return;
    let newStatus = "draft";
    if (oldStatus === "draft") newStatus = "published";
    dispatch(changeCouponStatus(couponId, store_id, newStatus));
  }

  return (
    <View key={index} style={styles.cardContainer}>
      <View style={styles.coupanCard}>
        <View style={styles.cardLine1}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Image source={CoupanIcon} />
            <Text style={styles.cardBoldText}>{item.couponName}</Text>
          </View>
          <View>
            <Text style={styles.cardDateText}>Till: {item.endDate}</Text>
          </View>
        </View>
        <View style={styles.cardLine2}>
          <Text style={styles.cardSaveText}>
            {`Save ${
              item?.couponDiscountType === "Percent"
                ? `Upto ₹${item?.maxDiscount}`
                : `₹${item?.flatoffamount}`
            } with this code`}
          </Text>
        </View>
        <View style={styles.cardLine3}>
          <Pressable style={styles.addBtn} onPress={addHandler}>
            <Text style={styles.addOffer}>{item?.couponCode}</Text>
          </Pressable>
          <TouchableOpacity onPress={() => toggleAccordion(index)}>
            <View
              style={{
                padding: 7,
                backgroundColor: "#EBFFEB",
                borderRadius: 50,
              }}
            >
              {isExpanded ? (
                <AntDesign name="up" size={18} color="#93908F" />
              ) : (
                <AntDesign name="down" size={18} color="#93908F" />
              )}
            </View>
          </TouchableOpacity>
        </View>
        {/* {isExpanded && ( */}
        <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
          <Accordian
            isExpanded={isExpanded}
            clickedIndex={expandedIndex}
            index={index}
            content={item?.conditions}
            separator={true}
          />
        </View>
        {/* )} */}
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={[styles.button, { borderRightWidth: 1 }]}
          onPress={() => {
            deleteCouponCard(item._id);
          }}
        >
          <Text
            style={[
              {
                color: "red",
              },
              styles.actionBtn,
            ]}
          >
            DELETE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => editCoupon(item)}
        >
          <Text
            style={[
              {
                color: "#42AF10",
              },
              styles.actionBtn,
            ]}
          >
            EDIT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { borderRightWidth: 0 }]}
          onPress={() => {
            updateStatus(item._id, item.status);
          }}
        >
          {item.status === "published" ? (
            <Text
              style={[
                {
                  color: "#1B1816",
                },
                styles.actionBtn,
              ]}
            >
              ARCHIEVE
            </Text>
          ) : (
            <Text
              style={[
                {
                  color: "#FB7D13",
                },
                styles.actionBtn,
              ]}
            >
              PUBLISH
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 16,
    marginBottom: 20,
  },
  coupanCard: {
    paddingHorizontal: 19,
    paddingTop: 18,
    // marginBottom: 10,
  },
  cardLine1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBoldText: {
    color: "#555",
    fontSize: 18,
    // fontWeight: "700",
    fontFamily: fonts.PRIMARY_FONT_700,
    // paddingHorizontal: 15,
  },
  cardDateText: {
    color: "#93908F",
    fontSize: 13,
    fontFamily: fonts.PRIMARY_FONT_400,
    lineHeight: 18,
  },
  cardSaveText: {
    color: "#3ABD9E",
    fontSize: 13,
    paddingHorizontal: 30,
    fontFamily: fonts.PRIMARY_FONT_400,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 12,
  },
  cardLine3: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingleft: 50,
    marginLeft: 25,
  },
  actionBtn: {
    fontSize: 12,
    letterSpacing: 2.8,
    fontFamily: fonts.PRIMARY_FONT_400,
    textAlign: "center",
  },
  addOffer: {
    color: "#93908F",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 13,
    // lineHeight: 18,
  },
  addBtn: {
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#93908F",
    marginHorizontal: 4,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EBFFEB",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    width: "33.33%",
    // height: 34,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#EEE",
  },
});
