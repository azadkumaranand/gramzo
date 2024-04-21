import { View, Text, Modal, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import fonts from "@const/fonts";
import Loader from '@/Loader';


const CheckBox = ({ label: Label, isChecked, onClick }) => {

    return (
        <View style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            marginTop: 8
        }}>
            <TouchableOpacity
                onPress={onClick}
                style={{
                    width: 15,
                    height: 15,
                    backgroundColor: isChecked ? "#555555" : "white",
                    borderWidth: 1,
                    borderColor: "#555555",
                    borderRadius: 1000,
                }}
            >
            </TouchableOpacity>
            <Text style={{
                color: "#555555", fontSize: 16,
                lineHeight: 24,
            }}>{Label}</Text>
        </View>
    )
}


export default function OtherOptionModal({ isVisible, handleClose, handleSubmit, refundAmount }) {


    const [refundAmountPercent, setRefundAmountPercent] = useState(-1)
    const [customAmount, setCustomAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const submitForm = async () => {
        const amt = + refundAmount * (refundAmountPercent / 100).toFixed(2);
        setIsLoading(true);
        await handleSubmit({
            vendor_refund_amount: refundAmountPercent === 1 ? customAmount : amt,
            optionSelected: refundAmountPercent === 1 ? `₹${customAmount} Custom Amount` : refundAmountPercent === 0 ? 'Offer no refund' : `₹${amt} ${refundAmountPercent}% of complaint amount`
        })
        setIsLoading(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleClose}>

            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: 'center',
                paddingHorizontal: 10,
                backgroundColor: 'rgba(51, 51, 51, 0.6)'
            }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        width: Dimensions.get('screen').width - 20,
                        height: Dimensions.get('screen').width * 1.1,
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 30,
                        paddingVertical: 18,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E5E7EB',
                        alignItems: 'center'
                    }}>

                        <Text style={{
                            fontSize: 18,
                            color: "#404040",
                            fontFamily: fonts.PRIMARY_FONT_700
                        }}>Other Options</Text>
                        <TouchableOpacity style={{
                            backgroundColor: "#E3E3E3",
                            borderRadius: 100,
                            padding: 3
                        }}
                            onPress={handleClose}
                        >
                            <Entypo name="cross" size={26} color="#555555" />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 30,
                            paddingVertical: 20,
                            flex: 1
                        }}
                    >
                        <View flex={1}>
                            <Text style={{
                                color: "#93908F",
                                fontFamily: fonts.PRIMARY_FONT_400,
                                marginBottom: 15,
                                fontSize: 14
                            }}>Total complaint amount - ₹{refundAmount}</Text>

                            {/* <CheckBox
                                label={<Text style={{
                                    color: "#555555",
                                    fontFamily: fonts.PRIMARY_FONT_400
                                }}><Text style={{ fontWeight: 'bold' }}>₹{refundAmount}</Text>  100% of complaint amount</Text>}
                                isChecked={refundAmountPercent === 100}
                                onClick={() => setRefundAmountPercent(100)}
                            /> */}

                            <CheckBox
                                label={<Text style={{
                                    color: "#555555",
                                    fontFamily: fonts.PRIMARY_FONT_400,
                                    fontSize: 16,
                                    lineHeight: 24,
                                }}><Text style={{ fontWeight: 'bold' }}>₹{refundAmount * 0.5}</Text>  50% of complaint amount</Text>}
                                isChecked={refundAmountPercent === 50}
                                onClick={() => setRefundAmountPercent(50)}
                            />

                            <CheckBox
                                label={<Text style={{
                                    color: "#555555",
                                    fontFamily: fonts.PRIMARY_FONT_400,
                                    fontSize: 16,
                                    lineHeight: 24,
                                }}><Text style={{ fontWeight: 'bold' }}>₹{refundAmount * 0.3}</Text>  30% of complaint amount</Text>}
                                isChecked={refundAmountPercent === 25}
                                onClick={() => setRefundAmountPercent(25)}
                            />

                            <CheckBox
                                label={"Custom amount"}
                                isChecked={refundAmountPercent === 1}
                                onClick={() => setRefundAmountPercent(1)}
                            />

                            {refundAmountPercent === 1 && (
                                <TextInput
                                    placeholder="Enter custom amount"
                                    onChangeText={setCustomAmount}
                                    keyboardType="numeric"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#D0D5DD',
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        borderRadius: 50,
                                        marginTop: 12,
                                        marginBottom: 2,
                                        marginLeft: 20
                                    }}
                                    maxLength={5}
                                />
                            )}

                            <CheckBox
                                label={"Offer no refund"}
                                isChecked={refundAmountPercent === 0}
                                onClick={() => setRefundAmountPercent(0)}
                            />

                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#42AF10",
                                marginBottom: 10,
                                paddingVertical: 8,
                                borderRadius: 100
                            }}
                            onPress={submitForm}
                        >
                            {
                                isLoading ? <Loader p={0} size={30} /> : (
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.PRIMARY_FONT_700,
                                        color: '#fff',
                                        fontSize: 14,
                                        lineHeight: 20
                                    }}>Submit</Text>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}