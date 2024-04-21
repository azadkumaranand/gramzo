import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import fonts from "@const/fonts";
import dayjs from 'dayjs'
import { capatilize } from '@func/utils';

const backgroundColors = {
    'new': '#FF3A3A',
    'unsolved': '#FF3A3A',
    'solved': '#42AF10',
    'expired': '#FB7D13',
}



const ComplaintItem = ({ complain }) => {
    const navigation = useNavigation();
    const { complain_id, category, createdAt, status } = complain;

    const total_bill = complain?.order?.bill_details?.total_price

    const items = complain?.order?.items?.map((item) => item?.item_name) || [];

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('ComplaintDetail', {
                    complain
                })
            }}
        >
            <View style={{
                borderRadius: 16,
                borderColor: '#EEEEEE',
                borderWidth: 1,
                overflow: 'hidden',
                marginTop: 10
            }}>
                <View
                    style={{
                        backgroundColor: "#f3f3f3",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 8,
                        paddingHorizontal: 15,
                    }}>
                    <View style={{ gap: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            style={{
                                color: '#93908F',
                                fontFamily: fonts.PRIMARY_FONT_500,
                                fontSize: 16,
                                letterSpacing: -0.6
                            }}>#{complain_id} (₹{total_bill})</Text>
                        <Text
                            style={{
                                color: '#FFF8F2',
                                fontFamily: fonts.PRIMARY_FONT_500,
                                backgroundColor: backgroundColors[status],
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                borderRadius: 50,
                                fontSize: 10,
                                verticalAlign: 'middle'
                            }}
                        >{capatilize(status)}</Text>
                    </View>
                    <View>
                        <Text style={{
                            color: '#93908F', fontFamily: fonts.PRIMARY_FONT_400, fontSize: 14,
                            letterSpacing: -0.6
                        }}>{dayjs(createdAt).format('DD MMM, hh:mmA')}</Text>
                    </View>
                </View>

                <View
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        gap: 10
                    }}
                >
                    <Text style={{
                        fontFamily: fonts.PRIMARY_FONT_500,
                        fontSize: 18,
                        lineHeight: 24,
                        letterSpacing: -0.6
                    }}>{category}</Text>

                    <View style={{ flexDirection: 'row', gap: 5, marginVertical: 6 }}>
                        {items.map((item, index) => (
                            <Text
                                key={index}
                                style={{
                                    borderRadius: 4,
                                    borderColor: '#EBEBEB',
                                    borderWidth: 1,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    color: '#93908F',
                                    fontFamily: fonts.PRIMARY_FONT_500,
                                    fontSize: 12,
                                    lineHeight: 18,
                                    textAlign: 'center',
                                    verticalAlign: 'middle'
                                }}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View>
                {['unsolved', 'new'].includes(status) && (
                    <View
                        style={{
                            backgroundColor: "#FFF8F2",
                            padding: 8
                        }}
                    >
                        <Text style={{ textAlign: "center", color: '#93908F', fontFamily: fonts.PRIMARY_FONT_500, fontSize: 12, lineHeight: 18 }}>Try to resolve this complaint by {dayjs(createdAt).add(2, 'day').format('DD MMM, hh:mmA')}</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ComplaintItem