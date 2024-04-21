import { View, Text } from 'react-native'
import React from 'react'

const DotLine = ({ last }) => {
    return (
        <View
            style={{
                position: 'absolute',
                left: -16,
                bottom: 0,
                top: 5,
                borderColor: last ? 'transparent' : '#FB7D13',
                borderLeftWidth: 1,
                borderStyle: 'dashed',
            }}
        >
            <View style={{
                width: 8,
                aspectRatio: 1,
                borderRadius: 1000,
                backgroundColor: "#FB7D13",
                left: -4
            }} />
        </View>
    )
}

export default DotLine