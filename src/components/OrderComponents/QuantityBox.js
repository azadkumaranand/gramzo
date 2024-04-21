import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import fonts from "@const/fonts";
import { Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import RatingModal from "./modal/RatingModal";
import { useState } from "react";

const QuantityBox = ({ width, Lable, Qantity, rating, item }) => {
  const [visible, setvisible] = useState(false)

  const handleclick = () => {
    setvisible(!visible)
  }
  return (
    <>
      <RatingModal item={item} visible={visible} handleClose={handleclick} />
      <TouchableOpacity
        style={{ width: width, ...styles.mainbox }}
        disabled={!rating}
        onPress={handleclick}>

        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          paddingTop: 5
        }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.PRIMARY_FONT_400,
              color: "#93908F",
              lineHeight: 16
            }}
          >
            {Lable}
          </Text>
          {
            rating &&
            <Image
              source={require("@assets/Icons/rightUp.png")}
              style={{ width: 14, height: 14 }}
            />
          }

        </View>


        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5
        }}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: fonts.PRIMARY_FONT_700,
              color: "#555555",
              lineHeight: 40
            }}
          >
            {Qantity}
          </Text>
          {
            rating &&
            <>
              <Ionicons name="star" size={16} color="#F3C623" />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.PRIMARY_FONT_400,
                  color: "#F3C623"
                }}>36 user</Text>
            </>

          }
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#93908F",
    borderRadius: 8,
  },
});
export default QuantityBox;
