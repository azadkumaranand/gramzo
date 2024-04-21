import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, StatusBar } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "@const/colors";
import { useNavigation } from "@react-navigation/native";
import HeaderStyle from "@const/HeaderStyle";

const Header = ({ title, headerBtn, subtitles, notice, radious }) => {
  // console.log(headerBtn)
  const navigation = useNavigation();
  const backHandler = () => {
    navigation.goBack();
  };
  return (
    <>
      {/* <StatusBar
        backgroundColor={colors.HEADER_GREEN_COLOR}
        barStyle="light-content"
      /> */}
      <View
        style={[
          styles.header,
          {
            borderBottomRightRadius: radious ? 30 : 0,
            borderBottomLeftRadius: radious ? 30 : 0,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Pressable onPress={backHandler}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </Pressable>
              <View>
                <Text style={styles.headerText}>{title}</Text>
              </View>
            </View>
            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
                fontWeight: "400",
                marginHorizontal: 25,
              }}
            >
              {" "}
              {subtitles && subtitles}{" "}
            </Text>
          </View>
          {headerBtn && headerBtn()}
        </View>
      </View>
      {notice && (
        <View
          style={{
            backgroundColor: colors.HEADER_GREEN_COLOR,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: "#FFF8F2",
              width: "93%",
              color: "#93908F",
              paddingHorizontal: 6,
              textAlign: "center",
              paddingVertical: 6,
            }}
          >
            Ongoing Week<Text style={{ color: "red" }}>*</Text> : Last Update 27
            Feb, 10:24am
          </Text>
        </View>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: "100%",
    // backgroundColor: colors.SECONDARY_LIGHT_GREEN_COLOR,
  },
  header: {
    height: HeaderStyle.height,
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: HeaderStyle.top,
    backgroundColor: colors.HEADER_GREEN_COLOR,
  },
  headerText: {
    fontSize: 20,
    fontFamily: fonts.PRIMARY_FONT_700,
    color: "rgba(255, 255, 255, 1)",
  },
});
