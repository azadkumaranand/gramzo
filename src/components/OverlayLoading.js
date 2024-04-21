import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const OverlayLoading = ({ size = 70, color = "#FFAC74", br=0 }) => {
    const { width, height } = Dimensions.get('screen')
    return (
        <View
            style={{
                // flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius:br

                // height,
                // width
            }}
        >
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}

export default OverlayLoading