import {
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import RatingPage from "../RatingBox";

export default function ProductInfoModal({
  onhandlemodal,
  showModal,
  product,
}) {
  const [ProducutInformation, setProducutInformation] = useState(
    product ? true : false
  );
  const [Benifites, setBenifites] = useState(false);
  const [userRecipy, setuserRecipy] = useState(false);

  const handleProduct = () => {
    setProducutInformation(!ProducutInformation);
  };
  const handleBenifites = () => {
    setBenifites(!Benifites);
  };
  const handleRecipy = () => {
    setuserRecipy(!userRecipy);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.modalContainer}>
        <View style={styles.content}>
          <View style={styles.contentBlock}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={handleProduct}
            >
              <View
                style={{
                  gap: 5,
                }}
              >
                <Text style={styles.product_heading}>Product Information</Text>
                <Text style={styles.general_heading}>General Information</Text>
              </View>
              <View>
                {ProducutInformation ? (
                  <AntDesign name="down" size={24} color="#93908F" />
                ) : (
                  <AntDesign name="right" size={24} color="#93908F" />
                )}
              </View>
            </TouchableOpacity>

            {ProducutInformation && (
              <View style={styles.info}>
                <View style={{ gap: 12 }}>
                  <Text style={styles.infoHeading}>Product Name</Text>
                  <Text style={styles.infoHeading}>Category</Text>
                  <Text style={styles.infoHeading}>Brand</Text>
                  <Text style={styles.infoHeading}>Speciality</Text>
                  {/* <Text style={styles.infoHeading}>Net Quantity</Text> */}
                </View>
                <View style={{ gap: 12 }}>
                  <Text style={styles.infoValue}>{product?.product_name}</Text>
                  <Text style={styles.infoValue}>
                    {product?.product_category}
                  </Text>
                  <Text style={styles.infoValue}>{product?.manufacturer}</Text>
                  <Text style={styles.infoValue}>{product?.speciality}</Text>
                  {/* <Text style={styles.infoValue}>Jaggery Sugarcane</Text> */}
                </View>
              </View>
            )}
          </View>

          <View style={styles.contentBlock}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={handleBenifites}
            >
              <View
                style={{
                  gap: 5,
                }}
              >
                <Text style={styles.product_heading}>Benefits</Text>
                <Text style={styles.general_heading}>
                  Why is {product?.product_name} a useful product in daily life?
                </Text>
              </View>
              <View>
                {Benifites ? (
                  <AntDesign name="down" size={24} color="#93908F" />
                ) : (
                  <AntDesign name="right" size={24} color="#93908F" />
                )}
              </View>
            </TouchableOpacity>

            {Benifites && (
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: "#93908F",
                    fontFamily: fonts.PRIMARY_FONT_400,
                    fontSize: 13,
                  }}
                >
                  {product?.description}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.contentBlock}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={handleRecipy}
            >
              <View
                style={{
                  gap: 5,
                }}
              >
                <Text style={styles.product_heading}>Uses/Recipes</Text>
                <Text style={styles.general_heading}>
                  What else is possible to make with {product?.product_name}?
                </Text>
              </View>
              <View>
                {userRecipy ? (
                  <AntDesign name="down" size={24} color="#93908F" />
                ) : (
                  <AntDesign name="right" size={24} color="#93908F" />
                )}
              </View>
            </TouchableOpacity>

            {userRecipy && (
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: "#93908F",
                    fontFamily: fonts.PRIMARY_FONT_400,
                    fontSize: 13,
                  }}
                >
                  {product?.usecase}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.contentBlock}>
            <Text style={styles.product_heading}>What are people saying</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.rating}>
                <FontAwesome name="star" size={14} color="green" />
                <FontAwesome name="star" size={14} color="green" />
                <FontAwesome name="star" size={14} color="green" />
                <FontAwesome name="star" size={14} color="green" />
                <FontAwesome name="star" size={14} color="green" />
                <Text style={{ marginLeft: 10 }}>4.5 out of 5</Text>
              </View>

              {/* <RatingPage ratings={4} size={40} gap={10} color={"#42AF10"} /> */}

              <Text style={styles.ratingCount}>21 Ratings</Text>
            </View>
            <View style={styles.ratingBars}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text style={styles.ratingStarCnt}>5 Star</Text>
                <Progress.Bar progress={0.8} width={150} color="#42AF10" />
                <Text style={styles.ratingStarCnt}>17</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text style={styles.ratingStarCnt}>4 Star</Text>
                <Progress.Bar progress={0.1} width={150} color="#42AF10" />
                <Text style={styles.ratingStarCnt}>17</Text>
              </View>
            </View>
          </View>
          <View style={styles.contentBlock}>
            <Text style={styles.product_heading}>Videos</Text>
            <View style={{ marginTop: 18, flexDirection: "row", gap: 12 }}>
              <View>
                <Image
                  source={require("@assets/dummy/jaggery.png")}
                  style={styles.productImg}
                />
                <View style={styles.productImgOverlay} />
                <Text style={styles.customerRating}>
                  4.5 <FontAwesome name="star" size={14} color="#61E225" />
                </Text>
              </View>

              <View>
                <Image
                  source={require("@assets/dummy/jaggery.png")}
                  style={styles.productImg}
                />
                <View style={styles.productImgOverlay} />
                <Text style={styles.customerRating}>
                  4.5 <FontAwesome name="star" size={14} color="#61E225" />
                </Text>
              </View>
              <View>
                <Image
                  source={require("@assets/dummy/jaggery.png")}
                  style={styles.productImg}
                />
                <View style={styles.productImgOverlay} />
                <Text style={styles.customerRating}>
                  4.5 <FontAwesome name="star" size={14} color="#61E225" />
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.contentBlock}>
            <Text style={styles.product_heading}>Reviews</Text>
            <View style={styles.review}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <View style={styles.reviewerImg}></View>
                <Text style={styles.custName}>Abhijeet Sharma</Text>
              </View>
              <View style={styles.rating}>
                <FontAwesome name="star" size={14} color="green" />
                <FontAwesome name="star" size={14} color="green" />
                <FontAwesome name="star" size={14} color="green" />
                <FontAwesome name="star" size={14} color="green" />
                <FontAwesome name="star" size={14} color="green" />
                <Text style={{ marginLeft: 10 }}>4.5 out of 5</Text>
              </View>
              <Text style={styles.reviewTxt}>
                The quality is amazing, also got in very nice packaging. Thank
                you Pureroot and Gramzo.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "center",
  },
  modalContainer: {
    // width: "100%",
    // height: "90%",
  },
  Header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 30,
    gap: 40,
    backgroundColor: "#55A630",
  },
  headingText: {
    fontFamily: fonts.PRIMARY_FONT_600,
    fontSize: 20,
    color: "#fff",
  },
  subHeadingText: {
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 12,
    color: "#fff",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  headerIcon: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  headerIconImg: {
    height: 17,
    width: 17,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  productImages: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  prodImg: {
    width: 100,
    height: 117,
  },
  prodImgOverlay: {
    width: 100,
    height: 35,
    position: "absolute",
    top: 82,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
  },
  imgNum: {
    width: 22,
    height: 22,
    textAlign: "center",
    backgroundColor: "#fff",
    // color:""
    borderRadius: 90,
    position: "absolute",
    top: 90,
    left: 40,
  },
  contentBlock: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  info: {
    marginTop: 15,
    flexDirection: "row",
    gap: 16,
  },
  infoPair: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  product_heading: {
    fontFamily: fonts.PRIMARY_FONT_600,
    fontSize: 18,
  },
  general_heading: {
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 12,
    color: "#93908F",
  },
  infoHeading: {
    fontFamily: fonts.PRIMARY_FONT_500,
    fontSize: 13,
    color: "#555",
  },
  infoValue: {
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 13,
    color: "#93908F",
  },
  rating: {
    marginTop: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  ratingCount: {
    fontFamily: fonts.PRIMARY_FONT_600,
    fontSize: 12,
    color: "#555555",
  },
  ratingBars: {
    marginTop: 22,
    gap: 5,
  },
  ratingStarCnt: {
    color: "#404040",
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 12,
    lineHeight: 16,
  },
  productImg: {
    height: 96,
    width: 96,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
  },
  productImgOverlay: {
    height: 96,
    width: 96,
    position: "absolute",
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
  },
  customerRating: {
    position: "absolute",
    color: "#61E225",
    fontFamily: fonts.PRIMARY_FONT_600,
    fontSize: 12,
    lineHeight: 16,
    top: 5,
    left: 10,
  },
  reviewerImg: {
    width: 24,
    height: 24,
    color: "#DDD",
    backgroundColor: "#ddd",
    borderRadius: 40,
  },
  custName: {
    color: "#555555",
    fontSize: 13,
    fontFamily: fonts.PRIMARY_FONT_500,
  },
  reviewTxt: {
    marginTop: 10,
    color: "#1B1816",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.PRIMARY_FONT_400,
  },
});
