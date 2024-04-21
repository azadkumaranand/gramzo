import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import fonts from "@const/fonts";
import EarningRating from "./EarningRating";
import { Feather } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
const ModalHeader = ({ item, handlemodalChange, Earning }) => {
  return (
    <>

      <View style={{
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        paddingBottom: 10,
      }}>
        <View style={styles.header}>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: !(item.status === "delivered") && 15,
            justifyContent: "space-between"
          }}>

            <View style={styles.leftPart}>

              {
                (item.status === "delivered") &&
                <TouchableOpacity style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5, alignItems: "center"
                }}
                  onPress={handlemodalChange}>
                  <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>

              }

              <View style={{
                gap: 5
              }}>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10
                }}>

                  <Text
                    style={{
                      fontFamily: fonts.PRIMARY_FONT_500,
                      fontSize: 18,
                      color: "#333333",

                    }}
                  >
                    Order ID: #{item?.track_id}
                  </Text>

                  {
                    !(item.status === "delivered") &&
                    <View style={styles.Payment}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: fonts.PRIMARY_FONT_600,
                          color: "#55A630",
                        }}
                      >
                        {/* {" "} */}
                        {item?.payment?.payment_mode}
                      </Text>
                    </View>
                  }
                </View>

                <View
                  style={{
                    // borderBottomWidth: 1,
                    // borderColor: "#E5E7EB",
                    // paddingBottom: 20,
                  }}
                >

                  {
                    (item.status === "delivered") &&
                    <View style={{
                      flexDirection: "row",
                    }}>
                      <View style={{ backgroundColor: "#D3FFBF", ...styles.Earning }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: fonts.PRIMARY_FONT_600,
                            color: item?.TotalEarning === "Rejected" ? "#ED1C24" : "#55A630",
                            alignSelf: "center",
                          }}
                        >
                          {item?.TotalEarning === "Rejected"
                            ? item?.TotalEarning
                            : `your earnings : ₹ ${(
                              item?.total_bill * 0.9
                            ).toFixed(2)} `}
                        </Text>
                      </View>
                      <View></View>

                    </View>
                  }

                  {/* <EarningRating /> */}

                </View>
              </View>
            </View>

            {
              item.status === "delivered" ? (
                <TouchableOpacity style={styles.download_button} >
                  <Feather name="download" size={24} color="black" />
                </TouchableOpacity>
              ) :
                <TouchableOpacity style={styles.RightPart} onPress={handlemodalChange}>
                  <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>
            }

          </View>

        </View>

        {
          !(item.status === "delivered") &&
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#E5E7EB",
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}
          >

            <View style={{
              flexDirection: "row",
            }}>
              <View style={{ backgroundColor: "#EEEEEE", ...styles.Earning }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fonts.PRIMARY_FONT_600,
                    color: item?.TotalEarning === "Rejected" ? "#ED1C24" : "#263238",
                    alignSelf: "center",
                  }}
                >
                  {item?.TotalEarning === "Rejected"
                    ? item?.TotalEarning
                    : `your earnings from this order: ₹ ${(
                      item?.total_bill * 0.9
                    ).toFixed(2)} `}
                </Text>
              </View>
              <View></View>

            </View>

            {/* <EarningRating /> */}

          </View>
        }

      </View>

    </>
  );
};

const styles = StyleSheet.create({

  download_button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    // top: 20,
    // right: 10
  },
  RightPart: {
    backgroundColor: "#F3F3F3",
    borderRadius: 9999,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  leftPart: {
    flexDirection: "row",
    gap: 10,
  },

  Earning: {

    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",

    // width: 'auto', // Set width to auto
  },

  leftPart: {
    flexDirection: "row",
    gap: 10,
  },
  RightPart: {
    backgroundColor: "#F3F3F3",
    borderRadius: 9999,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  Payment: {
    backgroundColor: "#D3FFBF",
    borderRadius: 9999,
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ModalHeader;
