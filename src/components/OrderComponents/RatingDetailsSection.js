import { View, Text } from 'react-native'
import React from 'react'

const RatingDetailsSection = () => {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 15, gap: 5, backgroundColor: "#FFFFFF" }}>

    <View style={{ paddingVertical: 5 }}  >
        <Text style={{
            fontSize: 14,
            color: '#333333',
            fontWeight: 700
        }}>Rating</Text>
    </View>


    <View style={{
        flexDirection: "row",
        justifyContent: "space-between"
    }}>
        <Text style={{
            fontSize: 12,
            color: '#4B5563'
        }}>By user</Text>
        <Text
            style={{
                fontSize: 12,
                color: '#F3C623'
            }}
        >4.2 Star</Text>
    </View>

    <View style={{
        flexDirection: "row",
        justifyContent: "space-between"
    }}>
        <Text style={{
            fontSize: 12,
            color: '#4B5563'
        }}>By KitchenSe</Text>
        <Text style={{
            fontSize: 12,
            color: '#F3C623'
        }}>4.9 Star</Text>
    </View>

    <View style={{
        flexDirection: "row",
        justifyContent: "space-between"
    }}>
        <Text style={{
            fontSize: 12,
            color: '#4B5563',
            fontWeight: 700
        }}>Overall</Text>
        <Text style={{
            fontSize: 12,
            color: '#F3C623'
        }}>4.5 Star</Text>
    </View>



</View>
  )
}

export default RatingDetailsSection