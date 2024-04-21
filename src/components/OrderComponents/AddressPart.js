import React from "react";
import { View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux';
import dayjs from "dayjs";
import fonts from "@const/fonts";

const AddressPart = ({ item }) => {

    const store = useSelector((state) => state.vendor.store);
    const orderDate = dayjs(item?.timestamps?.received_at);
    const time = orderDate.format("hh:mma");
    const year = orderDate.format("YYYY");
    const month = orderDate.format("MMM");
    const day = orderDate.format("DD");

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderBottomWidth: 0.5,
                borderColor: "#E5E7EB",
            }}
        >

            <View>
                <View
                    style={{
                        flexDirection: "row",
                        // alignItems: "center",
                        gap: 10,
                        // justifyContent:"center",

                    }}
                >
                    <View style={{
                        marginTop: 5
                    }}>
                        <Image
                            source={require("@assets/Icons/Vector.png")}
                            style={{ width: 17, height: 18 }}
                        />
                    </View>


                    <View
                        style={{
                            // paddingTop: 12,
                            width: "70%"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "rgba(64, 64, 64, 1)",
                            }}
                        >
                            {item?.store_name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "rgba(156, 163, 175, 1)",
                            }}
                        >
                            {store?.address?.[0]?.addressLine1}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        paddingHorizontal: 5,
                    }}
                >
                    <Image
                        source={require("@assets/Icons/Vector43.png")}
                        style={{ width: 2, height: 40 }}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        // alignItems: "center",
                        gap: 10,
                    }}
                >
                    <View style={{
                        marginTop: 5
                    }}>
                        <Image
                            source={require("@assets/Icons/Location.png")}
                            style={{ width: 13, height: 19 }}
                        />
                    </View>

                    <View
                        style={{
                            width: "70%",
                            // paddingTop: 12,
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "rgba(64, 64, 64, 1)",
                            }}
                        >
                            {item?.address?.place}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: "rgba(156, 163, 175, 1)",
                            }}
                        >
                            {item?.address?.address}
                        </Text>
                    </View>
                </View>

            </View>

            <View style={{ flexDirection: "column", alignItems: 'flex-end' }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        paddingRight: 8,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontFamily: fonts.PRIMARY_FONT_600,

                            color: "#D1D5DB",
                            // textAlign: 'right' // Align the text to the right (end)
                        }}
                    >
                        {year}
                    </Text>
                </View>

                <View style={{ paddingRight: 0 }}>
                    <Text
                        style={{
                            fontSize: 50,
                            fontFamily: fonts.PRIMARY_FONT_800,
                            color: "#333333",
                            lineHeight: 51
                        }}
                    >
                        {day}
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: "#FF6700",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 1,
                        paddingHorizontal: 12,

                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontFamily: fonts.PRIMARY_FONT_600,
                            color: "#FFFFFF",
                        }}
                    >
                        {month}
                    </Text>
                </View>
                <View>
                    <Text
                        style={{
                            fontSize: 15,
                            fontFamily: fonts.PRIMARY_FONT_400,
                            color: "rgba(85, 166, 48, 1)",
                        }}
                    >
                        {time}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default AddressPart