import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { textStyle } from "@const/fonts";
import RatingPage from '../RatingBox'
import fonts from "@const/fonts";


const EarningRating = () => {

    return (
        <View style={styles.container}>

            <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#404040")}>Customer Review</Text>

            <RatingPage

                ratings={4}
                size={30}
                gap={10}
                color={'red'} />

            <Text style={textStyle(12, fonts.PRIMARY_FONT_400, "#404040")}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam pe Adipisci tempora distinctio ipsam velit.
            </Text>

            <View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 14,
        marginTop: 16
    }
})

export default EarningRating