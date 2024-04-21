import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';

const SearchBox = ({ iconChange, onhandleTextChange, ...props }) => {
    return (
        <>
            <View style={styles.SearchBox}>

                <View>
                    <TextInput
                        placeholder='Search your Products'
                        style={styles.TextInput}
                        {...props} />
                </View>

                <View>

                    {iconChange ?
                        <TouchableOpacity onPress={onhandleTextChange}>
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>
                        :
                        <EvilIcons name="search" size={24} color="black" />}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    SearchBox: {
        width: "100%",
        height: 45,
        marginBottom:20,
        borderWidth: 1,
        borderColor: "#D0D5DD",
        borderRadius: 9999,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15
    },
    TextInput: {
        width: 250,
        height: 38,
        fontSize: 14,
        fontFamily: "Mukta-400",
        paddingHorizontal: 10
    }
})

export default SearchBox