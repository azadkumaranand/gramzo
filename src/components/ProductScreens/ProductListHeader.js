import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import fonts from "@const/fonts";
import { useNavigation } from "@react-navigation/native";
import HeaderStyle from "@const/HeaderStyle";


const ProductListHeader = ({ handleNavigation }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.mainconatiner}>
      <View style={styles.Textbox}>
        <Text style={styles.header}>All Products</Text>
        <TouchableOpacity style={styles.location} onPress={handleNavigation} >
          <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainconatiner: {
   
    height: HeaderStyle.height,
    backgroundColor: "#71C442",
    paddingHorizontal: 25,
    paddingTop: HeaderStyle.top,
   
  },
  Textbox: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    // marginTop: HeaderStyle.top,
    color: "#fff",
    // marginBottom: HeaderStyle.Bottom,
  },
  header: {
    fontSize: 19,
    fontFamily: "Mukta-500",
    color: "#fff",
  },
  location: {
    marginHorizontal: 15,
    padding: 8,
    backgroundColor: "#278B55",
    borderRadius: 9999
  },
  locationText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: fonts.PRIMARY_FONT_400,
    textDecorationLine: "underline",
    lineHeight: 17,
  },
});
export default ProductListHeader;
