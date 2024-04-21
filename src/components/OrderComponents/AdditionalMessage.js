import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const AdditionalMessage = ({ item }) => {

    return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <View style={styles.Additional_message}>
                <View>
                    <Image
                        source={require("@assets/Icons/Info.png")}
                        style={{ width: 18, height: 18, tintColor: "black" }}
                    />
                </View>

                <View
                    style={{
                        gap: 7,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: fonts.PRIMARY_FONT_700,
                            color: "rgba(31, 41, 55, 1)",
                        }}
                    >
                        Additional Message
                    </Text>

                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: fonts.PRIMARY_FONT_400,
                            color: "rgba(55, 65, 81, 1)",
                        }}
                    >
                        {item?.message}
                    </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    Additional_message: {
        backgroundColor: "rgba(254, 242, 242, 1)",
        flexDirection: "row",
        borderRadius: 8, paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 7,
    },
})
export default AdditionalMessage