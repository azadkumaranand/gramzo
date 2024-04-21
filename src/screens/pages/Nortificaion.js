import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import CancleHeaders from '@/OrderComponents/CancleHeaders'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import fonts, { textStyle } from '@const/fonts';



const notification = {
    "New": [
        {
            Message: "New orders received",
            Alert: false
        },
        {
            Message: "Verify your KYC",
            Alert: false
        },
        {
            Message: "Complaint expiring in 2h",
            Alert: true
        }
    ],
    "27 feb, 2024": [
        {
            Message: "Complaint expiring in 2h",
            Alert: true
        },
        {
            Message: "New orders received",
            Alert: false
        },
    ]
}

// Example usage:




const NortificationBox = ({ item }) => {

    const Productnumber = item.Message === "New orders received"
    return (
        <View style={styles.NortificaionBox}>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                {
                    item.Alert &&
                    <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#FF3A3A")}>Alert</Text>
                }
                <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#555555")}>
                    {item.Message}
                </Text>
            </View>

            <View style={styles.Button}>
                {
                    Productnumber ?
                        <Text style={textStyle(15, fonts.PRIMARY_FONT_500, "#FFFFFF")}>
                            9
                        </Text> :

                        <AntDesign name="arrowright" size={20} color="#FFFFFF" />
                }
            </View>
        </View>
    )
}

console.log(Object.keys(notification))

const Nortificaion = () => {
    const navigation = useNavigation()


    return (
        <SafeAreaView style={styles.mainContainer}>
            <CancleHeaders lable={"Notification"} handlnavigation={navigation.goBack} />

            <View style={styles.AfterHeader}>

                {
                    Object.keys(notification).map((date, index) => (
                        <>
                            <View style={{
                                gap: 10,
                                marginTop: 20
                            }}>
                                <Text key={index} style={textStyle(12, fonts.PRIMARY_FONT_300, "#93908F")}>
                                    {date}
                                </Text>
                                <View style={styles.NortificaionContaioner}>
                                    {
                                        notification[date].map((item, index) => (
                                            <NortificationBox item={item} key={index} />
                                        ))
                                    }
                                </View>
                            </View>
                        </>
                    ))
                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    AfterHeader: {
        paddingHorizontal: 20,
        marginVertical: 20
    },
    NortificaionBox: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#93908F",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15
    },
    Button: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#42AF10",
        borderRadius: 999
    },
    NortificaionContaioner: {
        gap: 10
    }
})

export default Nortificaion
