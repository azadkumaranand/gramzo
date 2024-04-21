import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";

import BillDetailsPart from "../BillDetailsSection";
import AddressPart from "../AddressPart";
import ButtonDetails from "../ButtonDetailsSection";
import DeliveryDetailsSection from "../DeliveryDetailsSection";
import EarningDetailsSection from "../EarningDetailsSection";

import ModalHeader from "../ModalHeader";
import AdditionalMessage from "../AdditionalMessage";
import fonts from "@const/fonts";
import { textStyle } from "@const/fonts";
import RatingBox from "@/RatingBox";

const RatingImage = ({ i }) => {
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <View style={styles.RatingNumber}>
        <Text
          style={{
            ...textStyle(10, fonts.PRIMARY_FONT_700, "#000"),
            backgroundColor: "#FFF",
            width: 20,
            aspectRatio: 1,
            borderRadius: 100,
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          {i + 1}
        </Text>
      </View>
      <Image
        source={require("@assets/Icons/RatingImage.png")}
        style={styles.RatingImage}
      />
    </View>
  );
};

const OrderDetailsModal = ({
  visible,
  handlemodalChange,
  item,
  TopTabScreen,
  handleAccept,
  handleReject,
  earning,
}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={handlemodalChange}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.5}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.63)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.Modal_Conatiner}>
            <ModalHeader item={item} handlemodalChange={handlemodalChange} />

            {/* second container */}

            <ScrollView>
              <View style={{ marginBottom: earning ? 120 : 0 }}>
                {TopTabScreen == "Earning" && (
                  <View style={styles.ratingContainer}>
                    <View>
                      <Text
                        style={textStyle(14, fonts.PRIMARY_FONT_400, "#404040")}
                      >
                        Customer Review
                      </Text>
                    </View>

                    <View>
                      <RatingBox
                        ratings={4.5}
                        size={17}
                        gap={10}
                        color={"#F3C623"}
                      />
                    </View>

                    <View
                      style={{
                        width: "80%",
                      }}
                    >
                      <Text
                        style={{
                          // textAlign: 'center',
                          ...textStyle(14, fonts.PRIMARY_FONT_400, "#404040"),
                        }}
                      >
                        Excellent substitute for sugar. I have stopped using
                        sugar in tea. Addition of this jaggery powder doesn't
                        make the taste tea different in comparison to sugar.
                        Planning to slowly replace sugar with jaggery in all
                        foods..
                      </Text>
                    </View>

                    <View style={styles.ImagePart}>
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <RatingImage i={i} key={i} />
                        ))}
                    </View>
                  </View>
                )}

                <AddressPart item={item} />

                {TopTabScreen == "Earning" && <DeliveryDetailsSection />}

                <BillDetailsPart item={item} TopTabScreen={TopTabScreen} />

                {TopTabScreen !== "Earning" && item?.message && (
                  <AdditionalMessage item={item} />
                )}

                {TopTabScreen == "Earning" && (
                  <EarningDetailsSection item={item} />
                )}
                {/* {TopTabScreen == "Earning" && <RatingDetailsSection item={item} />} */}
              </View>
            </ScrollView>
            {TopTabScreen !== "Earning" && (
              <ButtonDetails
                handleReject={handleReject}
                handleAccept={handleAccept}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  RatingNumber: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    height: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    left: 0,
  },
  ImagePart: {
    flexDirection: "row",
    gap: 20,
  },

  RatingImage: {
    width: 65,
    height: 75,
    borderRadius: 5,
    objectFit: "cover",
  },
  Modal_Conatiner: {
    borderRadius: 13,
    height: Dimensions.get("screen").height - 150,
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("screen").width - 25,
    overflow: "hidden",
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(229, 231, 235, 1)",
  },
});

export default OrderDetailsModal;
