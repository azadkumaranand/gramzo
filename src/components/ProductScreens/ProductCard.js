import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import fonts from "@const/fonts";
import { useNavigation } from "@react-navigation/native";

export default ProductCard = ({ product }) => {
  const navigation = useNavigation();
  // console.log("gffgg", product);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ProductEditModal", {
          Edit: true,
          product: product,
        })
      }
    >
      <View style={styles.top}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={styles.heading}>{product?.product_name}</Text>
          {product?.product_status === "draft" ? (
            <Text>
              | <Text style={styles.draftHeading}>In draft</Text>
            </Text>
          ) : null}
        </View>

        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <Text style={styles.rating}>
            {product?.rating}{" "}
            <FontAwesome name="star" size={14} color="green" />
          </Text>
          <Text style={styles.reviewCount}>{"(0)"}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.prices}>
          <Text style={styles.price}>
            ₹{product?.product_price}/{product?.product_quantity}kg
          </Text>
          <Text
            style={[styles.actualPrice, { textDecorationLine: "line-through" }]}
          >
            ₹{product?.product_price}/{product?.product_quantity}kg
          </Text>
          <Text style={styles.actualPrice}>
            {"("}0% off{")"}
          </Text>
        </View>
        <Text style={styles.orderCount}>Ordered 0 times</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  indraft: {
    color: "#FB7D13",
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 13,
  },
  DraftBOx: {
    borderLeftWidth: 1,
    borderColor: "#000000",
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: "#fff",
    marginVertical: 7,
    marginHorizontal: 16,
    paddingTop: 8,
    gap: 10,
    paddingBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 16,
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
    // shadowColor: "#000",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  heading: {
    // marginTop: 8,
    color: "#000",
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 16,
  },
  draftHeading: {
    color: "#FB7D13",
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 13,
  },
  rating: {
    color: "#42AF10",
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 13,
  },
  reviewCount: {
    color: "#888",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 11,
  },
  prices: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  price: {
    fontFamily: fonts.PRIMARY_FONT_600,
    fontSize: 14,
  },
  actualPrice: {
    fontSize: 10,
    fontFamily: fonts.PRIMARY_FONT_400,
    letterSpacing: -0.1,
    color: "#777",
  },
  orderCount: {
    color: "#93908F",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 14,
    // lineHeight: 16,
  },
});
