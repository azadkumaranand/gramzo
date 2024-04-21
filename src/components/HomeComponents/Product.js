import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Paragraph from "../Paragraph";
import colors from "@const/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import fonts from "@const/fonts";

const Product = ({ handleOfferCard, selectProduct, setselectProduct }) => {
  const storeItems = [
    {
      _id: "654e0dc44b235ffef1aefb1c",
      item_name: "Paneer",
      item_description: "Tgod fidpd dldjoen",
      item_photo_url:
        "https://firebasestorage.googleapis.com/v0/b/auntypanel.appspot.com/o/images%2Fitem-1699614134763.jpeg?alt=media&token=764dc04d-eacd-4fb9-a766-68faf00fb498",
      add_customization: [
        {
          description: "Extra cheese",
          extra_fee: 20,
          _id: "654e0dc44b235ffef1aefb1d",
        },
      ],
      is_draft: false,
      price: 50,
      store_id: "65493e19f38d17900f63d220",
      sell_count: 0,
      user_ratings: [],
      createdAt: "2023-11-10T11:02:28.645Z",
      updatedAt: "2024-01-15T15:29:37.635Z",
      __v: 0,
    },
    {
      _id: "654e335e4b235ffef1af0128",
      item_name: "Paratha",
      item_description: "Gdl fkdlf dkslvcfvdnd dopdnd s dld",
      item_photo_url:
        "https://firebasestorage.googleapis.com/v0/b/auntypanel.appspot.com/o/images%2Fitem-1699623761327.jpeg?alt=media&token=5a27e913-9d67-4e9e-8eed-e1b1ae99b5eb",
      add_customization: [
        {
          description: "Dahi",
          extra_fee: 10,
          _id: "654e335e4b235ffef1af0129",
        },
      ],
      is_draft: false,
      price: 40,
      store_id: "65493e19f38d17900f63d220",
      sell_count: 0,
      user_ratings: [],
      createdAt: "2023-11-10T13:42:54.096Z",
      updatedAt: "2023-12-16T16:40:42.268Z",
      __v: 0,
    },
    {
      _id: "659440696fe887f569c5d194",
      item_name: "Panner444",
      item_description: "Ggej3j0dj4 rioene roepkr riep",
      item_photo_url:
        "https://firebasestorage.googleapis.com/v0/b/auntypanel.appspot.com/o/images%2Fitem-1704214629019.jpeg?alt=media&token=391ef94b-b36a-4a28-9740-bf11822658e5",
      add_customization: [],
      is_draft: false,
      price: 34,
      store_id: "65493e19f38d17900f63d220",
      sell_count: 0,
      user_ratings: [],
      createdAt: "2024-01-02T16:57:14.000Z",
      updatedAt: "2024-01-02T16:57:33.087Z",
      __v: 0,
    },
    {
      _id: "6596b7cbb618cfbbdec004bd",
      item_name: "Palak paneer ",
      item_description: "This is very delicious item",
      item_photo_url:
        "https://firebasestorage.googleapis.com/v0/b/auntypanel.appspot.com/o/images%2Fitem-1704376257178.jpeg?alt=media&token=010a3ae4-d36d-4a54-b5a1-cc1a10d571b6",
      add_customization: [],
      is_draft: false,
      price: 300,
      store_id: "65493e19f38d17900f63d220",
      sell_count: 0,
      user_ratings: [],
      createdAt: "2024-01-04T13:51:07.716Z",
      updatedAt: "2024-01-04T13:51:07.716Z",
      __v: 0,
    },
    {
      _id: "6596b818b618cfbbdec00598",
      item_name: "Jalebi",
      item_description: "Tudngnckhdkgdhk",
      item_photo_url:
        "https://firebasestorage.googleapis.com/v0/b/auntypanel.appspot.com/o/images%2Fitem-1704376337520.jpeg?alt=media&token=4c6262f1-2bb5-49f6-b4d3-5df0aa51d61c",
      add_customization: [],
      is_draft: true,
      price: 200,
      store_id: "65493e19f38d17900f63d220",
      sell_count: 0,
      user_ratings: [],
      createdAt: "2024-01-04T13:52:24.687Z",
      updatedAt: "2024-01-04T13:52:47.310Z",
      __v: 0,
    },
  ];
  // const [selectAllChecked, setSelectAllChecked] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([])

  const selectAllChecked = selectProduct.length === storeItems.length;

  const hideCard = () => {
    console.log("jfslgs");
  };

  const handleSelectAll = (isChecked) => {
    // Set the state of "Select all" checkbox
    setselectProduct(storeItems.map((item) => item._id));
  };

  const handleCheckboxPress = (id) => {
    const isChecked = selectProduct.indexOf(id);
    if (isChecked > -1) {
      setselectProduct((prev) => {
        prev.splice(isChecked, 1);
        return prev;
      });
    } else {
      selectProduct.push(id);
      setselectProduct(selectProduct);
    }
  };

  // console.log( "data is ",data);

  const Checkbox = ({ label, isChecked, onToggle }) => {
    // console.log(isChecked)
    return (
      <TouchableOpacity
        onPress={onToggle}
        style={{
          flexDirection: "row",
          backgroundColor: isChecked ? "green" : "white",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            backgroundColor: isChecked ? "green" : "white",
            borderColor: "black",
            marginRight: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.otherOptionContainer}>
        <View style={styles.Selectall}>
          <Checkbox
            isChecked={selectAllChecked}
            label={"Select all products"}
            onToggle={handleSelectAll}
          />
        </View>

        <View style={styles.checkboxContainer}>
          {storeItems.map((item) => {
            const isChecked = selectProduct.includes(item._id);
            // console.log(item._id, isChecked)
            return (
              <Checkbox
                isChecked={isChecked}
                label={item.item_name}
                key={item._id}
                onToggle={() => handleCheckboxPress(item._id)}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.Button}>
        <TouchableOpacity style={styles.saveDraft}>
          <Text style={{ color: "rgba(255, 103, 0, 1)", ...styles.buttonText }}>
            Save Draft
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Publish} onPress={handleOfferCard}>
          <Text
            style={{ color: "rgba(255, 255, 255, 1)", ...styles.buttonText }}
          >
            Publish
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
  checkBoxText: {
    color: "rgba(64, 64, 64, 1)",
    textDecorationLine: "none",
    fontSize: 15,
    fontFamily: fonts.PRIMARY_FONT_400,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderColor: colors.INPUT_BORDER_COLOR,
  },
  Selectall: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: "rgba(229, 231, 235, 1)",
  },
  saveDraft: {
    width: "45%",
    // width: 100,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 77,
    borderWidth: 1,
    borderColor: "rgba(255, 103, 0, 1)",
    // backgroundColor: "rgba(85, 166, 48, 1)"
  },
  Publish: {
    width: "45%",
    // width: 100,

    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 77,
    backgroundColor: "rgba(255, 103, 0, 1)",
  },
  Button: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.PRIMARY_FONT_500,
    color: "rgba(64, 64, 64, 1)",
  },

  buttonText: {
    fontSize: 15,
    fontFamily: fonts.PRIMARY_FONT_700,
  },

  checkboxContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
export default Product;
