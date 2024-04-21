import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import fonts from "@const/fonts";
import colors from '@const/colors';
import HeaderStyle from '@const/HeaderStyle';


const CancleHeaders = ({ lable, handlnavigation }) => {

    return (
        <View style={styles.Maincontainer}>
            <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>

                <TouchableOpacity style={styles.button} onPress={handlnavigation}>
                    <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={{
                    fontFamily: fonts.PRIMARY_FONT_600,
                    fontSize: 18,
                    color: "#FFFFFF"
                }}>{lable}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    Maincontainer: {
        width: "100%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: HeaderStyle.height,
        paddingHorizontal: 25,
        paddingTop: HeaderStyle.top,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor:colors.HEADER_GREEN_COLOR
    },
    Right: {
        paddingHorizontal: 25,
        height: 33,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 77
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,

    }
})
export default CancleHeaders