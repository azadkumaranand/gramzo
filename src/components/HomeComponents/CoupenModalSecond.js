import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Paragraph from "../Paragraph";
import colors from "@const/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import Product from "./Product";

const CoupenModalSecond = ({
  handleSecondModal,
  VisibleModal,
  handleOfferCard,
  selectProduct,
  setselectProduct,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={VisibleModal}
      onRequestClose={handleSecondModal}
    >
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Pressable style={{ marginRight: 8 }} onPress={handleSecondModal}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Text style={styles.headerText}>Previous</Text>
          </View>

          <View>
            <Product
              handleOfferCard={handleOfferCard}
              selectProduct={selectProduct}
              setselectProduct={setselectProduct}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    // justifyContent: "center",
    backgroundColor: "#000000AA",
  },
  card: {
    // height: "100%",
    // height: 300,
    width: "90%",
    // padding: 20,
    backgroundColor: "white",
    // marginVertical: dimensionHeight / 10,
    borderRadius: 15,
  },

  cardHeader: {
    flexDirection: "row",
    // marginBottom: 10,
    alignItems: "center",
    gap: 5,
    padding: 20,
  },
});

export default CoupenModalSecond;
