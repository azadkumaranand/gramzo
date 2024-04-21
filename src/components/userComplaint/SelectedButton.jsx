import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons/build/Icons';
import fonts from '@const/fonts';

const SelectedButton = ({ conversation }) => {
    // const optionSelected = "Accept & Refund";
    // const optionSelected = "Offer no refund";
    // const optionSelected = "30% Offer no refund";
    const { optionSelected } = conversation;
    const contd = (a, b, c) => optionSelected == "Accept & Refund" ? a : optionSelected == "Offer no refund" ? b : c
    return (
        <TouchableOpacity
            style={{
                marginTop: 15,
                backgroundColor: contd("#42AF10", "transparent", "transparent"),
                padding: 5,
                borderRadius: 60,
                position: 'relative',
                borderColor: contd('transparent', "#FB7D13", "#42AF10"),
                borderWidth: contd(0, 1, 1)
            }}
            disabled
        >
            <AntDesign name="checkcircle" size={18} color={contd("#fff", "#FB7D13", "#42AF10")} style={{
                position: 'absolute',
                top: -9,
                right: 10,
                zIndex: 100
            }} />
            <Text style={{
                fontFamily: fonts.PRIMARY_FONT_400,
                color: contd("#fff", "#FB7D13", '#42AF10'),
                textAlign: 'center',
                fontSize: 14,
            }}>{optionSelected}</Text>
        </TouchableOpacity>
    )
}
export default SelectedButton