import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import fonts from "@const/fonts";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const AfterHeaderPart = () => {
  const store = useSelector((state) => state.vendor?.store) || {};
  const navigation = useNavigation();

  return (
    <View style={styles.maincontainer}>
      <View style={styles.Toppart}>
        <View style={styles.Topleft}>
          <Image
            source={{ uri: store?.image_url }}
            style={{
              width: 65,
              height: 65,
              opacity: 0.6,
              backgroundColor: store?.image_url ? "transparent" : "#E3E3E3",
              borderWidth: 0.5,
              borderColor: "#E3E3E3",
              borderRadius: 999,
            }}
            loadingIndicatorSource={require("@assets/flag.png")}
          />
        </View>

        <View style={styles.NameBOx}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: fonts.PRIMARY_FONT_600,
                fontSize: 20,
                color: "#555555",
                overflow: "hidden",
              }}
            >
              {store?.store_name || "GaonSe Store"}
            </Text>
            <TouchableOpacity
              style={styles.TopRight}
              onPress={() => navigation.navigate("EditePage")}
            >
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_400,
                  fontSize: 13,
                  color: "#555555",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.middlebox}>
            <Entypo name="location-pin" size={15} color="#93908F" />

            <View style={styles.location}>
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_400,
                  fontSize: 12,
                  color: "#93908F",
                  width: "80%",
                  overflow: "scroll",
                }}
                numberOfLines={1}
              >
                {store?.address?.addressLine1 ?? "Malviya Nagar"}
              </Text>
            </View>
          </View>

          <View style={styles.bottomBox}>
            <View style={styles.BottomLeft}>
              <FontAwesome name="star" size={15} color="#F3C623" />
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_600,
                  fontSize: 12,
                  color: "#93908F",
                }}
              >
                {store?.rating}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_400,
                  fontSize: 12,
                  color: "#93908F",
                }}
              >
                Ratings
              </Text>
            </View>
            <View style={styles.BottomRight}>
              <AntDesign name="heart" size={15} color="#FF3A3A" />
              <Text
                style={{
                  fontFamily: fonts.PRIMARY_FONT_400,
                  fontSize: 12,
                  color: "#93908F",
                }}
              >
                {store?.reviews ?? 0} Loves
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.Bottompart}>
        <TouchableOpacity
          style={styles.Bottompart_box}
          onPress={() => navigation.navigate("Story")}
        >
          <Text
            style={{
              fontFamily: fonts.PRIMARY_FONT_400,
              fontSize: 15,
              color: "#555555",
            }}
          >
            Your Story
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BottompartMiddle_box}>
          <Text
            style={{
              fontFamily: fonts.PRIMARY_FONT_400,
              fontSize: 15,
              color: "#555555",
            }}
          >
            Preview Store
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Bottompart_box}>
          <Text
            style={{
              fontFamily: fonts.PRIMARY_FONT_400,
              fontSize: 15,
              color: "#555555",
            }}
          >
            Share Store
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BottompartMiddle_box: {
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    borderColor: "#E3E3E3",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 25,
  },
  Bottompart_box: {
    alignItems: "center",
    paddingVertical: 8,
    justifyContent: "center",
  },
  Bottompart: {
    borderStyle: "dashed",
    borderColor: "#E3E3E3",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  TopRight: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: "#E3E3E3",
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  NameBOx: {
    gap: 5,
    flex: 1,
    // alignItems: "flex-start",
  },
  bottomBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  location: {
    borderBottomWidth: 0.5,
    borderColor: "#93908F",
  },
  BottomLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  BottomRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  middlebox: {
    flexDirection: "row",
    alignItems: "center",
  },
  Toppart: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "space-between",
  },

  Topleft: {
    borderRadius: 999,
    overflow: "hidden",
    marginRight: 10,
  },

  maincontainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
});
export default AfterHeaderPart;
