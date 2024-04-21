import { View, Text, Image } from 'react-native'
import React from 'react'
import fonts from "@const/fonts";
import colors from '@const/colors';

const BillDetailsPart = ({ item, TopTabScreen }) => {

    return (
        <>
            <View
                style={{
                    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
                    paddingVertical: 3,
                    // marginTop: 30,
                }}
            >
                <View
                    style={{
                        paddingVertical: 10,
                        paddingBottom: 30,
                        borderBottomWidth: 1,
                        borderColor: "#E5E7EB",
                        borderStyle: "dashed",
                        gap: 5,
                    }}
                >
                    <View style={{ paddingHorizontal: 10, paddingVertical: 2 }}>
                        <Text
                            style={{
                                fontSize: 14,

                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "rgba(64, 64, 64, 1)",
                            }}
                        >
                            Bill Details
                        </Text>
                    </View>

                    <View style={{ gap: 7 }}>
                        {item?.items?.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 20,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 5,
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        source={require("@assets/Icons/Veg.png")}
                                        style={{ width: 10, height: 10 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: fonts.PRIMARY_FONT_400,
                                            color: "rgba(107, 114, 128, 1)",
                                            width: 120,
                                        }}
                                    >
                                        {item?.item_name}
                                    </Text>
                                </View>

                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: fonts.PRIMARY_FONT_400,
                                        width: 80,
                                        color: "rgba(107, 114, 128, 1)",
                                    }}
                                >
                                    ₹{item.actual_price}*{item.quantity}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: fonts.PRIMARY_FONT_400,
                                        color: "rgba(107, 114, 128, 1)",
                                    }}
                                >
                                    ₹{item.actual_price * item.quantity}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        gap: 5,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_600,
                                color: "rgba(64, 64, 64, 1)",
                            }}
                        >
                            Item total
                        </Text>

                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "rgba(64, 64, 64, 1)",
                            }}
                        >
                            ₹{item?.bill_details?.total_price}
                        </Text>
                    </View>

                    {item?.offer_code && (
                        <View
                            style={{
                                flexDirection: "row",
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
                                        fontFamily: fonts.PRIMARY_FONT_600,
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

                    {/* <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#4B5563",
                            }}
                        >
                            Packing
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#4B5563",
                            }}
                        >
                            ₹35
                        </Text>
                    </View> */}

                    {
                        TopTabScreen == "Earning" &&
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: fonts.PRIMARY_FONT_400,
                                    color: "#4B5563",
                                }}
                            >
                                Packing
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: fonts.PRIMARY_FONT_400,
                                    color: "#4B5563",
                                }}
                            >
                                ₹38
                            </Text>
                        </View>
                    }

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "#4B5563",
                            }}
                        >
                            Taxes
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "#4B5563",
                            }}
                        >
                            ₹{item?.bill_details?.gst}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "#4B5563",
                            }}
                        >
                            Delivery Charge (order more than ₹700)
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "#333333",
                            }}
                        >
                            ₹{item?.bill_details?.delivery_fee}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderTopWidth: 1,
                        borderTopColor: "rgba(229, 231, 235, 1)",
                        borderStyle: 'dashed'
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_600,
                                color: "rgba(64, 64, 64, 1)",
                            }}
                        >
                            Bill Total
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "#333333",
                            }}
                        >
                            ₹{item?.total_bill}
                        </Text>
                    </View>
                </View>
            </View>

            {
                TopTabScreen == "Earning" &&

                <View
                    style={{
                        marginVertical: 10,
                        paddingHorizontal: 20,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: fonts.PRIMARY_FONT_400,
                            color: "rgba(85, 166, 48, 1)",
                        }}
                    >
                        Payment is done via{" "}
                    </Text>

                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: fonts.PRIMARY_FONT_700,
                            color: "rgba(85, 166, 48, 1)",

                        }}
                    >
                        {item?.payment?.payment_mode}
                    </Text>
                </View>
            }
        </>
    )
}

export default BillDetailsPart