import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Switch,
  Modal,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "@const/colors";
import { useNavigation } from "@react-navigation/native";
import Paragraph from "@/Paragraph";
import OfferCard from "@/HomeComponents/OfferCard";
import { useDispatch, useSelector } from "react-redux";
import Offer_card from "./Offer_card";
import { get_coupons_api } from "../../../functions/api_functions";
import Loader from "@/Loader";

const OfferScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const offercard = useSelector((state) => state.offercard);
  const [filteredItems, setFilteredItems] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const store = useSelector((state) => state.vendor.store);

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const res = await get_coupons_api(store?._id);
      const { coupons, totalCoupons } = res;
      setFilteredItems(coupons);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [offercard]);

  const handleDeleteall = () => {
    // dispatch(removeOffercard());
  };

  const backHandler = () => {
    navigation.goBack();
  };
  const addHandler = () => {
    setIsVisble((prev) => !prev);
  };

  const hideCardHandler = () => {
    setIsVisble(false);
  };

  let offers = [{}];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Pressable onPress={backHandler}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
          <Text
            style={{
              fontSize: 20,
              fontFamily: fonts.PRIMARY_FONT_700,
              color: "rgba(255, 255, 255, 1)",
            }}
          >
            Home's Offer
          </Text>
        </View>
      </View>

      <View style={styles.btnsContainer}>
        <Pressable style={styles.addBtn} onPress={addHandler}>
          <Ionicons name="add" size={18} color={colors.RATING_GOLD_SHADE} />
          <Paragraph color={colors.RATING_GOLD_SHADE}>Add Offer</Paragraph>
        </Pressable>
        <Pressable style={styles.deleteBtn} onPress={handleDeleteall}>
          <Paragraph color="#ED1C24">Delete All</Paragraph>
        </Pressable>
      </View>

      <ScrollView>
        <View
          style={{
            // flexDirection: "row",
            gap: 10,

            paddingHorizontal: 25,
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            filteredItems.map((item, index) => (
              <Offer_card item={item} key={index} />
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={isVisible} transparent onRequestClose={hideCardHandler}>
        <OfferCard hideCard={hideCardHandler} />
      </Modal>
    </View>
  );
};

export default OfferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.SECONDARY_LIGHT_GREEN_COLOR,
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
    color: "white",
    marginLeft: 8,
  },
  btnsContainer: {
    gap: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 26,
    marginVertical: 16,
  },
  addBtn: {
    flexDirection: "row",
    backgroundColor: "#FFF4CB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 2,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFDBDB",
  },
});
