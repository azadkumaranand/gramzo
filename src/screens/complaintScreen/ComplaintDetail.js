import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useMemo, useState } from 'react'
import colors from "@const/colors";
import { AntDesign } from '@expo/vector-icons';
import fonts from "@const/fonts";
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { update_complain_api } from '@func/api_functions';
import OtherOptionModal from '@/userComplaint/OtherOptionModal';
import SuccessModal from '@/userComplaint/SuccessModal';
import ImageSlider from '@/ImageSlider';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderDetailsModal from '@/OrderComponents/modal/OrderDetailsModal';
import DotLine from '@/userComplaint/DotLine';
import SelectedButton from '@/userComplaint/SelectedButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeComplainStatus, updateComplainData } from '@rdx/ComplainSlice';
import { capatilize } from '@func/utils';
import Loader from '@/Loader';

const ComplaintDetail = () => {

    const { params } = useRoute();
    const [complain, setComplain] = useState(params.complain);
    const { complain_id, category, createdAt, status, issue, order, conversations } = complain;
    const items = complain?.order?.items?.map((item) => item.item_name);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const [isOtherOptionModelOpen, setIsOtherOptionModelOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [refundSuccess, setRefundSuccess] = useState(false);
    const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);


    React.useEffect(() => {
        if (status !== "new") return;
        dispatch(changeComplainStatus({ status: 'unsolved', complain_id }))
    }, [complain])


    const handleSubmitOtherOption = async ({ optionSelected, vendor_refund_amount }) => {
        const [data, err] = await update_complain_api({ complain_id, optionSelected, vendor_refund_amount });
        setIsOtherOptionModelOpen(false);
        setIsSuccessModalOpen(true);
        setRefundSuccess(false);
        if (err) {
            console.log(err);
            return
        }
        setComplain(data.complain);
        dispatch(updateComplainData({ complain_id, complain: data.complain }));
    }

    const handleRefund = async () => {
        //api call
        setIsLoading(true);
        const [data, err] = await update_complain_api({ status: 'solved', complain_id, optionSelected: 'Accept & Refund', vendor_refund_amount: order.bill_details.total_price });
        setIsLoading(false);
        if (err) {
            console.log(err);
            return;
        }
        setIsSuccessModalOpen(true);
        setRefundSuccess(true);
        setComplain(data.complain);
        dispatch(updateComplainData({ complain_id, complain: data.complain }));
    }

    const images = [
        'https://source.unsplash.com/random?1',
        'https://source.unsplash.com/random?2',
        'https://source.unsplash.com/random?3',
        'https://source.unsplash.com/random?4',
    ]


    const SelectionButtons = () => (
        <View style={{
            marginTop: 15,
            gap: 10
        }}>
            <TouchableOpacity
                style={{
                    backgroundColor: "#FF6700",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 60,
                }}
                onPress={handleRefund}
            >
                {isLoading ? <Loader p={0} size={30} /> : (
                    <Text style={{
                        fontFamily: fonts.PRIMARY_FONT_700,
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 14
                    }}>Accept & Refund</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderColor: "#FF8C3D",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 60,
                    borderWidth: 1,
                }}
                onPress={() => setIsOtherOptionModelOpen(true)}
            >
                <Text style={{
                    fontFamily: fonts.PRIMARY_FONT_700,
                    color: '#FF8C3D',
                    textAlign: 'center',
                    fontSize: 14
                }}>View other option</Text>
            </TouchableOpacity>
        </View>
    )



    return (
        <SafeAreaView flex={1}>

            <OrderDetailsModal
                visible={isOrderModalVisible}
                handlemodalChange={() => setIsOrderModalVisible(false)}
                item={order}
                TopTabScreen={"Earning"}
            />

            <OtherOptionModal
                isVisible={isOtherOptionModelOpen}
                handleClose={() => { setIsOtherOptionModelOpen(false) }}
                handleSubmit={handleSubmitOtherOption}
                refundAmount={order.bill_details.total_price}
            />

            <SuccessModal
                isVisible={isSuccessModalOpen}
                handleClose={() => { setIsSuccessModalOpen(false) }}
                success={refundSuccess}
            />
            {/* Top header section */}
            <View
                style={{
                    backgroundColor: colors.HEADER_GREEN_COLOR,
                    padding: 5
                }}
            >
                <View flexDirection='row' style={{
                    padding: 10,
                    gap: 15,
                }}>
                    <Pressable onPress={navigation.goBack} >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </Pressable>
                    <View style={{
                        flex: 1,
                        gap: 4,
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <View flexDirection='row' gap={5} style={{
                                alignItems: 'center'

                            }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.PRIMARY_FONT_600,
                                        color: '#fff',
                                        fontSize: 18,
                                        fontWeight: 500,
                                        lineHeight: 26,
                                        letterSpacing: -0.6
                                    }}>#{complain_id} (₹{order.bill_details.total_price})</Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.PRIMARY_FONT_400,
                                        color: '#FF3A3A',
                                        backgroundColor: '#FFEEEE',
                                        paddingHorizontal: 10,
                                        paddingVertical: 2,
                                        borderRadius: 50,
                                        lineHeight: 16,
                                        fontSize: 10
                                    }}>
                                    {capatilize(status)}
                                </Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.PRIMARY_FONT_400,
                                    color: '#fff',
                                    // borderBottomColor: '#fff',
                                    // borderBottomWidth: 0.5,
                                    fontSize: 14,
                                    letterSpacing: -0.6
                                }}>{dayjs(createdAt).format('DD MMM, hh:mma')}</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: fonts.PRIMARY_FONT_400, color: '#fff', fontSize: 14, lineHeight: 18 }}>Ordered at {dayjs(order.timestamps.received_at).format('DD MMM, hh:mmA')}</Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: "#FFF8F2",
                        padding: 4
                    }}
                >
                    <Text style={{
                        textAlign: "center",
                        color: '#93908F',
                        fontFamily: fonts.PRIMARY_FONT_400,
                        fontSize: 12,
                        lineHeight: 18
                    }}>Try to resolve this complaint by {dayjs(createdAt).add(2, 'day').format('DD MMM, hh:mmA')}</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    backgroundColor: "#fcfff9",
                    flex: 1,
                }}>
                    <View paddingHorizontal={20}>
                        <View
                            style={{
                                paddingVertical: 10,
                                gap: 10
                            }}
                        >
                            <View flexDirection='row' justifyContent='space-between' >
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: fonts.PRIMARY_FONT_500
                                }}>{category}</Text>

                                <TouchableOpacity
                                    onPress={() => setIsOrderModalVisible(true)}
                                >
                                    <Text style={{
                                        color: '#26A823',
                                        paddingVertical: 3,
                                        paddingHorizontal: 10,
                                        fontFamily: fonts.PRIMARY_FONT_400,
                                        backgroundColor: "#D6FFD5",
                                        borderRadius: 4,
                                    }}>Detail</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 5 }}>
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
                                            fontFamily: fonts.PRIMARY_FONT_400,
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
                        <View>
                            <Text style={{
                                fontFamily: fonts.PRIMARY_FONT_400,
                                color: '#555555',
                                backgroundColor: '#FFECDC',
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                fontSize: 12,
                                lineHeight: 16,
                                textAlign: 'justify'
                            }}>{issue}</Text>
                        </View>

                        <View>
                            {/* cara */}
                            <ImageSlider images={complain.images} />
                        </View>

                        <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{
                                fontFamily: fonts.PRIMARY_FONT_700,
                                fontWeight: 'bold',
                                fontSize: 14,
                                lineHeight: 17,
                            }}>Customer Name: </Text>
                            <Text style={{
                                fontFamily: fonts.PRIMARY_FONT_400,
                                fontSize: 14,
                            }}>{order.user.name}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#FFF8F2",
                            flexDirection: "row",
                            paddingVertical: 15,
                            paddingHorizontal: 15
                        }}
                    >
                        <View
                            style={{
                                width: 30
                            }}
                        >
                        </View>
                        <View flex={1}>

                            <View style={{ flexDirection: "row", gap: 10, paddingBottom: 20, position: 'relative' }}>
                                <DotLine />
                                <View>
                                    <Text style={{
                                        fontFamily: fonts.PRIMARY_FONT_500,
                                        color: '#000',
                                        fontWeight: "bold",
                                        fontSize: 14
                                    }}>{category}</Text>
                                    <Text style={{
                                        fontFamily: fonts.PRIMARY_FONT_500,
                                        color: "#93908F",
                                        fontSize: 12
                                    }}>{dayjs(createdAt).format('DD MMM, hh:mmA')}</Text>
                                </View>
                            </View>

                            {conversations.map((conversation, index) => (
                                <View style={{ flexDirection: "row", gap: 10, paddingBottom: 20, position: 'relative' }} key={index}>
                                    <DotLine last={index == conversations.length - 1} />
                                    <View
                                        style={{
                                            backgroundColor: conversation.type == "Admin" ? "#FFECDC" : 'transparent',
                                            paddingHorizontal: conversation.type == "Admin" ? 20 : 0,
                                            paddingVertical: conversation.type == "Admin" ? 10 : 0,
                                            flex: 1
                                        }}>
                                        <View>
                                            <Text style={{
                                                fontFamily: fonts.PRIMARY_FONT_300,
                                                color: '#555555',
                                                fontSize: 14,
                                                lineHeight: 17
                                            }}>{conversation.message.split('\n')[0]}</Text>
                                            {conversation.message.split('\n')[1] && <Text style={{
                                                fontFamily: fonts.PRIMARY_FONT_700,
                                                fontSize: 14,
                                                lineHeight: 17
                                            }}>{conversation.message.split('\n')[1]}</Text>}
                                        </View>

                                        {conversation.type !== 'Admin' && <Text style={{ fontFamily: fonts.PRIMARY_FONT_300, color: '#93908F', lineHeight: 16, fontSize: 12 }}>{dayjs(conversation.createdAt).format('DD MMM, hh:mmA')}</Text>}

                                        {conversation.type === 'Admin' && (conversation.isSelected ? (<SelectedButton conversation={conversation} />) : (<SelectionButtons />))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ComplaintDetail