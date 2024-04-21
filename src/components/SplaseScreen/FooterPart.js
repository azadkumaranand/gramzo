import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { generate_otp_api } from "@func/api_functions";
import Loader from '@/Loader';


const FooterPart = ({ setUserId, isLoading, setIsLoading, phoneNumber, setPhoneNumber, otpHandler }) => {

    const btnDisabled = isLoading || phoneNumber.length !== 10;

    const handlePhoneNumberChange = (inputValue) => {
        const digitsOnly = inputValue.replace(/\D/g, "");
        setPhoneNumber(digitsOnly.slice(0, 10));
    };

    const submitHandler = async () => {
        if (phoneNumber.length !== 10) {
            alert("Please enter a valid phone number")
            return
        }
        setIsLoading(true);
        const [data, err] = await generate_otp_api(phoneNumber);
        setIsLoading(false)
        console.log(err)
        if (err) return alert("Error sending OTP");

        const { error, status, userId } = data;
        setUserId(userId);

        if (error) return alert("Error sending OTP");

        if (status === "pending") {
            otpHandler();
        }
    }


    const textStyle = (s, ff, c, Lh) => {
        return {
            fontSize: s,
            fontFamily: `Mukta-${ff}`,
            color: c,
            lineHeight: Lh
        };
    }

    return (
        <View style={styles.mainContainer}>


            <Text style={[textStyle(30, 700, "rgba(85, 85, 85, 1)", 38)]}>Welcome to</Text>
            <Text style={[textStyle(30, 700, "rgba(85, 85, 85, 1)", 38),]}>GramZo</Text>

            <View style={styles.mobileNumber}>
                <Text style={textStyle(14, 400, "rgba(85, 166, 48, 1)", 20)}>Enter A Mobile Number</Text>
                <View style={styles.MobileBox}>

                    <View style={styles.LeftPart}>

                        <View style={styles.CountryCode}>
                            <Text style={textStyle(19, 500, "rgba(29, 29, 29, 1)")}>+91</Text>
                        </View>

                        <TextInput
                            value={phoneNumber}
                            onChangeText={handlePhoneNumberChange}
                            keyboardType="numeric"
                            style={styles.inputstyle}
                        />
                    </View>

                    <View style={styles.RigtPart}>
                        <TouchableOpacity
                            style={[styles.Button, btnDisabled && { backgroundColor: 'rgba(85, 166, 48, 0.6)' }]}
                            onPress={submitHandler}
                            disabled={btnDisabled}
                        >
                            {isLoading ? <Loader size={20} /> : <AntDesign name="arrowright" size={20} color="white" />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    LeftPart: {
        flexDirection: 'row'
    },
    mobileNumber: {
        gap: 12,
        marginTop: 25
    },
    CountryCode: {
        flexDirection: 'row',
        gap: 5,
        alignItems: "center",
        paddingHorizontal: 5,
        marginVertical: 5,
        borderRightWidth: 1,
        borderColor: "rgba(208, 208, 208, 1)"
    },
    MobileBox: {
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderStyle: 'dashed',
        paddingHorizontal: 5,
        borderColor: "rgba(85, 166, 48, 1)",
    },
    inputstyle: {
        width: 140,
        // height: 40,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontFamily: "Mukta-500",
        fontSize: 19,
        color: "rgba(85, 85, 85, 1)",
        verticalAlign: 'middle',
    },
    Button: {
        width: 60,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(85, 166, 48, 1)'
    }
})

export default FooterPart