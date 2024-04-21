import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import RatingPage from "./RatingBox";
import HorizontalProgress from "./HorizontalProgress";
import fonts, { textStyle } from "@const/fonts";
import { Entypo } from '@expo/vector-icons';

const ReatroRating = ({ item, handleClose }) => {
  return (

    <>
      <View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 15,
          borderBottomWidth: 2,
          borderColor: "#E5E7EB"
        }}>
          <Text style={textStyle(18, fonts.PRIMARY_FONT_600, "#404040")}>4.8 Rating</Text>
          <TouchableOpacity style={styles.RightPart} onPress={handleClose}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>


        <View style={styles.MainContainer}>
          <View style={styles.User}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.PRIMARY_FONT_400,
                color: "rgba(64, 64, 64, 1)",
              }}
            >
              By 204 User
            </Text>
          </View>

          <View
            style={{
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.PRIMARY_FONT_400,
                color: "#404040",
              }}
            >
              Customer Review
            </Text>
          </View>

          <View style={styles.RatingBox}>
            <RatingPage
              ratings={4.5}
              size={17}
              gap={10}
              color={'#F3C623'} />
          </View>

          <View style={styles.PersentRating}>
            <HorizontalProgress Raing={"5"} Percent={"90%"} />
            <HorizontalProgress Raing={"4"} Percent={"6%"} />
            <HorizontalProgress Raing={"3"} Percent={"2%"} />
            <HorizontalProgress Raing={"2"} Percent={"0.1%"} />
            <HorizontalProgress Raing={"1"} Percent={"0.1%"} />
          </View>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: 20,
    height: 280,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
  },
  RightPart: {
    backgroundColor: "#F3F3F3",
    borderRadius: 9999,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },

  User: {
    height: 25,
    backgroundColor: "rgba(214, 255, 213, 1)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    flexWrap: "wrap",
    borderTopRightRadius: 10,
    position: "absolute",
    right: 0,
    top: 0,
  },

  RatingBox: {
    marginTop: 13,
    alignItems: "center",
  },
  PersentRating: {
    marginTop: 13,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
});
export default ReatroRating;
