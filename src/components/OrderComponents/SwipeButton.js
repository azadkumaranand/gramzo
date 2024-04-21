import { View, Text } from 'react-native'
import React from 'react'

import SwipeButton from "rn-swipe-button";

const Swipe_Button = ({ onSwipeSuccess, active }) => {

    return (

        <View
            style={{
                position: "relative",
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    position: "absolute",
                    zIndex: 99,
                    left: 120,
                    // alignItems: "center",
                    // justifyContent: "center",
                    right: 1,
                }}
            >


                <Text
                    style={{
                        fontSize: 14,
                        color: active ?"rgba(64, 64, 64, 1)": "rgba(68, 133, 38, 1)",
                    }}
                >
                    Swipe when packed
                </Text>
            </View>


            <SwipeButton
                disabled={active}
                disabledRailBackgroundColor='rgba(0, 0, 0, 0.15)'
                disabledThumbIconBackgroundColor='rgba(0, 0, 0, 0.3)'
                disabledThumbIconBorderColor="transparent"
                swipeSuccessThreshold={10}
                containerStyles={{
                    backgroundColor: "red",
                    borderRadius: 4,
                }}
                // thumbIconStyles={{
                //     width: 40,  // Adjust the width of the thumb icon as needed
                //     height: 40, // Adjust the height of the thumb icon as needed
                //     // Add more styles as needed
                // }}
                height={40}
                title=""
                onSwipeSuccess={onSwipeSuccess}
                width={"100%"}
                railStyles={{ borderRadius: 5 }}
                thumbIconStyles={{
                    borderRadius: 5,
                    width: 20,
                    height: 20,
                    transform: [{ rotate: "180deg" }], // Rotate by 180 degrees
                }}

                thumbIconWidth={33}
                railFillBackgroundColor="rgba(85,166,48,0.5)"
                railFillBorderColor="rgba(85,166,48,0.5"
                thumbIconImageSource={require("@assets/Icons/ArrowLeft.png")}
                thumbIconBackgroundColor="#55A630"
                thumbIconBorderColor="#55A630"
                railBackgroundColor="rgba(255, 255, 255, 1)"
                railBorderColor="rgba(68, 133, 38, 1)"
                shouldResetAfterSuccess={true}
                titleStyles={{
                    color: "rgba(255, 255, 255, 1)",
                    fontSize: 12,
                    fontWeight: 400,
                }}
                style={{
                    borderRadius: 5, // Adjust the border radius as needed
                }}
            />
        </View>
    )
}

export default Swipe_Button