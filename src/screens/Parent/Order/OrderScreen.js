import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native"; // Import SafeAreaView from 'react-native'
import colors from "@const/colors";
import OrderTopTabNavigator from "../../../components/OrderComponents/OrderTopTabNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import fonts from "@const/fonts";
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const navigation = useNavigation();
  const store = useSelector((state) => state.vendor.store);
  return (
    <>
      <SafeAreaView style={styles.Order_container}>

        <View
          style={{
            backgroundColor: colors.HEADER_GREEN_COLOR,
            paddingHorizontal: 20,
            paddingVertical: 20,
            paddingBottom: 40,
          }}
        >
          <View style={styles.Navabar}>
            <View style={styles.Left_part}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: fonts.PRIMARY_FONT_500,
                    color: "rgba(255, 255, 255, 1)",
                    lineHeight: 24
                  }}
                >
                  Order Management
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                  height: 16,
                }}
              >
                <Image
                  source={require("@assets/Icons/jagah.png")}
                  style={{ width: 10, height: 12, objectFit: "contain" }}
                />
                <Text
                  style={{
                    fontSize: 12.5,
                    fontFamily: fonts.PRIMARY_FONT_400,
                    color: "rgba(255, 255, 255, 1)",
                    lineHeight: 18,
                  }}
                  numberOfLines={1}
                >
                  {store?.address?.addressLine1}
                </Text>
              </View>
            </View>

            <View style={styles.Right_part}>

              <TouchableOpacity
                style={styles.TopIcons}
                onPress={() => navigation.navigate("coupan")}
              >
                <Feather name="eye" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TopIcons}>
                <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <View style={{
          flex: 1
        }}>
          <OrderTopTabNavigator />

          <TouchableOpacity style={styles.CancleButton} onPress={() => { navigation.navigate("CancleOrderScreen") }}>

            <Text
              style={{
                fontFamily: fonts.PRIMARY_FONT_600,
                fontSize: 14,
                color: "#93908F"
              }}>Canceled</Text>

            <Image
              source={require('@assets/Icons/rightUp.png')} />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

  TopIcons: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#278B55",
    alignItems: "center",
    justifyContent: "center"
  },

  CancleButton: {
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    top: 5,
    right: 0,
    zIndex: 999,
    width: 90,
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 8
  },
  Order_container: {
    backgroundColor: colors.HEADER_GREEN_COLOR,
    flex: 1,
  },
  Navabar: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  Left_part: {
    gap: 1,
    flex: 1,
  },

  Symbole: {
    borderRadius: 100000,
    height: 35,
    width: 35,
  },

  Right_part: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});

export default OrderScreen;
