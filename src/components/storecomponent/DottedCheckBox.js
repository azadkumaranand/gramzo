import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const DottedCheckBox = ({ ischecked }) => {

    return (
        <View
            style={{
                ...styles.chekbox,
                borderColor: ischecked ? "#42AF10" : "#D1D5DB"
            }}

        >
            {
                ischecked &&

                <View style={styles.UnderBox}>

                </View>
            }


        </View>
    )
}

const styles = StyleSheet.create({

    UnderBox: {
        width: 7,
        height: 7,
        borderRadius: 9999,
        backgroundColor: "#42AF10",
    },
    chekbox: {
        alignItems: "center",
        justifyContent: "center",
        width: 15,
        height: 15,
        borderWidth: 1,
        borderRadius: 9999,
    }
})

export default DottedCheckBox