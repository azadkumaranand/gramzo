import { View, Text } from 'react-native'
import React from 'react'
import fonts from "@const/fonts";
import colors from '@const/colors';

const EarningDetailsSection = ({ item }) => {
  return (
    <View style={{ backgroundColor: colors.PRIMARY_BACKGROUND_COLOR, paddingHorizontal: 10, paddingVertical: 10 }}>

      <View style={{ borderBottomWidth: 0.5, borderColor: '#E5E7EB', paddingVertical: 10 }}>
        <View style={{ paddingBottom: 5 }}>
          <Text style={{
            fontSize: 14,
            color: '#333333',
            fontFamily: fonts.PRIMARY_FONT_400,
          }}>Your Earning</Text>
        </View>

        <View style={{ gap: 5, paddingHorizontal: 10 }}>

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>

            <Text style={{
              fontSize: 12,
              color: '#333333',
              fontFamily: fonts.PRIMARY_FONT_600,
            }}>Item total</Text>
            <Text style={{
              fontSize: 12,
              color: '#333333',
              fontFamily: fonts.PRIMARY_FONT_600,
            }}>
              ₹{item?.bill_details?.total_price}
            </Text>

          </View>

          {item?.offer_code && (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 12, fontFamily: fonts.PRIMARY_FONT_400, color: "#FF6700" }}>
                  Coupon -{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF6700",
                    fontFamily: fonts.PRIMARY_FONT600,
                  }}
                >
                  ({item?.offer_code})
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.PRIMARY_FONT_400,
                  color: "#FF6700",
                }}
              >
                -₹{item?.bill_details?.discount}
              </Text>
            </View>
          )}


          <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>

            <Text style={{
              fontSize: 12,
              fontFamily: fonts.PRIMARY_FONT_400,
              color: '#4B5563'
            }} >Delivery charge</Text>
            <Text style={{
              fontSize: 12,
              fontFamily: fonts.PRIMARY_FONT_400,
              color: '#4B5563'
            }}>-₹{item?.bill_details?.delivery_fee}</Text>
          </View>

        </View>
      </View>


      <View style={{
        paddingVertical: 10,
        gap: 5,
        borderBottomWidth: 0.5,
        borderColor: '#E5E7EB'
      }}>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10
        }} >
          <Text style={{
            fontSize: 12,
            color: '#333333',
            fontFamily: fonts.PRIMARY_FONT_600,
          }}>Total</Text>
          <Text style={{
            fontSize: 12,
            color: '#333333',
            fontFamily: fonts.PRIMARY_FONT_600,
          }}>₹{item?.total_bill}</Text>
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10
        }}>
          <Text style={{
            fontSize: 12,
            fontFamily: fonts.PRIMARY_FONT_400,
            color: '#4B5563'
          }}>KitchenSe Fee (10%)</Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.PRIMARY_FONT_400,
              color: '#4B5563'
            }}>-₹{(item?.total_bill * 0.1).toFixed(2)}</Text>
        </View>

      </View>




      <View style={{ paddingVertical: 10 }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10
        }}>
          <Text style={{
            fontSize: 12,
            fontFamily: fonts.PRIMARY_FONT_400,
            color: '#55A630'
          }}>Your Earning</Text>
          <Text style={{
            fontSize: 12,
            fontFamily: fonts.PRIMARY_FONT_400,
            color: '#55A630'
          }}>₹{(item?.total_bill * 0.9).toFixed(2)}</Text>
        </View>

      </View>
    </View>
  )
}

export default EarningDetailsSection