import { View, Text, Modal, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Alert, } from 'react-native'
import EarningDetailsSection from '../OrderComponents/EarningDetailsSection'
import RatingDetailsSection from '../OrderComponents/RatingDetailsSection'
import DeliveryDetailsSection from '../OrderComponents/DeliveryDetailsSection'


const Modles = (
    { modalVisible, modalChange, item }
) => {
    const [formattedDate, setformattedDate] = useState([])

    useEffect(() => {
        const date = new Date(item.Date);
        const formattedDate = date.toDateString().split(' ');
        setformattedDate(formattedDate)
    }, [])


    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={modalChange}
                hasBackdrop={true}
                backdropColor="black"
                backdropOpacity={0.5}
            >

                <View style={{
                    paddingTop: 65,
                    paddingHorizontal: 15,
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.63)"
                }}>

                    <View style={styles.Modal_Conatiner}>



                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E5E7EB',
                            paddingVertical: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 5
                            }}>
                                <View>
                                    <TouchableOpacity onPress={modalChange} style={{
                                        // backgroundColor:'red',
                                        padding: 10
                                    }}>
                                        <Image source={require('@assets/Icons/Arrow1.png')}
                                            style={{ height: 15, width: 15 }}
                                        />
                                    </TouchableOpacity>

                                </View>

                                <View
                                    style={{
                                        gap: 5
                                    }}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                color: '#333333',
                                                fontWeight: 500
                                            }}>Order ID:{item.order_Id}</Text>
                                    </View>


                                    <View style={{
                                        borderRadius: 999,
                                        backgroundColor: item.TotalEarning === "Rejected" ? '#FEE2E2' : '#D3FFBF',
                                        paddingHorizontal: 2,
                                        paddingVertical: 2,
                                        width: 140,
                                        // flexWrap:'wrap',

                                    }}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: item.TotalEarning === "Rejected" ? '#ED1C24' : '#55A630',
                                            alignSelf: 'center'
                                        }}>
                                            {item.TotalEarning === "Rejected" ? item.TotalEarning : `Total Earning ${item.TotalEarning}`}
                                        </Text>

                                    </View>
                                </View>

                            </View>

                            <View style={styles.Header_left}>
                                <Image
                                    source={require('@assets/Icons/download.png')}

                                    style={{ width: 21, height: 21 }}
                                />
                            </View>
                        </View>


                        {/* second container */}
                        <ScrollView>

                            <View style={{ marginBottom: 120 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 15, borderBottomWidth: 0.5, borderColor: '#E5E7EB' }}>

                                    <View style={{
                                        // gap: 35
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 10
                                        }}>
                                            <View>
                                                <Image
                                                    source={require('@assets/Icons/Vector.png')}
                                                    style={{ width: 17, height: 18 }}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: 'rgba(64, 64, 64, 1)',
                                                }}>{item.Shop_Name}</Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                    color: 'rgba(156, 163, 175, 1)',
                                                }}>{item.Shop_Address}</Text>
                                            </View>

                                        </View>

                                        <View
                                            style={{
                                                paddingHorizontal: 5
                                            }}>
                                            <Image
                                                source={require('@assets/Icons/Vector43.png')}
                                                style={{ width: 2, height: 40 }}
                                            />
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 10
                                        }}>

                                            <Image
                                                source={require('@assets/Icons/Location.png')}

                                                style={{ width: 13, height: 19 }}
                                            />

                                            <View>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: 'rgba(64, 64, 64, 1)',
                                                }}>{item?.Receiver_Name}</Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                    color: 'rgba(156, 163, 175, 1)',
                                                }}>{item?.Receiver_Address}</Text>
                                            </View>

                                        </View>


                                    </View>



                                    <View style={{ flexDirection: 'column', }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: '600',

                                                    color: '#D1D5DB',
                                                    // textAlign: 'right' // Align the text to the right (end)
                                                }}
                                            >
                                                {formattedDate[3]}
                                            </Text>
                                        </View>

                                        <View style={{ marginTop: -15 }}>
                                            <Text
                                                style={{
                                                    fontSize: 50,
                                                    fontWeight: 800,
                                                    color: '#333333',
                                                }}>{formattedDate[2]}</Text>
                                        </View>

                                        <View style={{
                                            backgroundColor: "#FF6700",
                                            alignItems: "center",
                                            justifyContent: 'center',
                                            paddingVertical: 3
                                        }}><Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: 600,
                                                color: '#FFFFFF',
                                            }}>{formattedDate[1]}</Text>
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: 400,
                                                color: 'rgba(85, 166, 48, 1)',
                                            }}>05:10pm</Text>
                                        </View>

                                    </View>


                                </View>


                                {/* Third BOx */}


                                <DeliveryDetailsSection />

                                {/* Five BOx */}
                                <View style={{ backgroundColor: '#F2FFEC', paddingVertical: 3 }} >

                                    <View style={{ paddingVertical: 10, paddingBottom: 30, borderBottomWidth: 0.5, borderColor: '#E5E7EB', borderStyle: 'dotted', gap: 5 }}>
                                        <View style={{ paddingHorizontal: 10, paddingVertical: 2 }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: 400,
                                                color: 'rgba(64, 64, 64, 1)'
                                            }}>Bill Details</Text>
                                        </View>


                                        <View style={{ gap: 7 }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: "space-between",
                                                paddingHorizontal: 15
                                            }}>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    gap: 5,
                                                    alignItems: 'center'
                                                }}>
                                                    <Image
                                                        source={require('@assets/Icons/Veg.png')}

                                                        style={{ width: 10, height: 10 }}
                                                    />

                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: 400,
                                                            color: 'rgba(107, 114, 128, 1)',
                                                            width: 120
                                                        }}>{item.Item_Name}</Text>

                                                </View>

                                                <View>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: 400,
                                                            width: 80,


                                                            color: 'rgba(107, 114, 128, 1)'
                                                        }}>₹420*2</Text>
                                                </View>
                                                <View>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: 400,

                                                            color: 'rgba(107, 114, 128, 1)'
                                                        }}>₹30*2</Text>
                                                </View>



                                            </View>



                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: "space-between",
                                                paddingHorizontal: 15
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    gap: 5,
                                                    alignItems: 'center',

                                                }}>
                                                    <Image
                                                        source={require('@assets/Icons/Veg.png')}

                                                        style={{ width: 10, height: 10 }}
                                                    />

                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: 400,
                                                            color: 'rgba(107, 114, 128, 1)',
                                                            width: 120
                                                        }}>Guud (500g)</Text>


                                                </View>

                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        fontWeight: 400,
                                                        width: 80,
                                                        color: 'rgba(107, 114, 128, 1)'
                                                    }}>₹30*2</Text>

                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        fontWeight: 400,
                                                        color: 'rgba(107, 114, 128, 1)'
                                                    }}>₹60</Text>

                                            </View>

                                        </View>

                                    </View>





                                    <View style={{ paddingHorizontal: 12, paddingVertical: 10, gap: 5 }}>

                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",

                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                                color: 'rgba(64, 64, 64, 1)'
                                            }}>Item total</Text>

                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: 'rgba(64, 64, 64, 1)'
                                            }}>₹910</Text>

                                        </View>


                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',

                                                }}
                                            >
                                                <Text style={{ fontSize: 12, color: '#FF6700' }}>Coupon - </Text>
                                                <Text style={{ fontSize: 12, color: '#FF6700', fontWeight: 600 }}>(NANU50)</Text>
                                            </View>

                                            <Text style={{
                                                fontSize: 12,
                                                color: '#FF6700'
                                            }}>-₹150</Text>
                                        </View>


                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",

                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#4B5563'
                                            }}>Packing</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#4B5563'
                                            }}>₹35</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",

                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#4B5563'
                                            }}>Taxes</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#4B5563'
                                            }}>₹15</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",

                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#4B5563'
                                            }}>Delivery Charge (order more than ₹700)</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#333333'
                                            }}>Free</Text>
                                        </View>



                                    </View>



                                    <View
                                        style={{
                                            paddingVertical: 15,
                                            paddingHorizontal: 15,
                                            borderTopWidth: 1,
                                            borderTopColor: "rgba(229, 231, 235, 1)"
                                        }}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",

                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                                color: 'rgba(64, 64, 64, 1)'
                                            }}>Bill Total</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#333333'
                                            }}>₹810</Text>
                                        </View>
                                    </View>

                                </View>


                                {/* Six BOx */}


                                {item.TotalEarning === "Rejected" ? (<>

                                    <View></View>
                                </>) :
                                    (<View>

                                        <View style={{
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: 'rgba(85, 166, 48, 1)'
                                            }}>Payment is done via </Text>

                                            <Text style={{
                                                fontSize: 12,
                                                color: 'rgba(85, 166, 48, 1)',
                                                fontWeight: 700
                                            }}>Cash On Delivery</Text>
                                        </View>

                                        {/* seventh bOx */}

                                        <EarningDetailsSection />

                                    </View>)

                                }



                                {/* Nine BOX */}

                                <RatingDetailsSection />

                            </View>
                        </ScrollView>

                    </View>
                </View>

            </Modal>
        </>
    )
}

const styles = StyleSheet.create({

    Modal_Conatiner: {
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
        height: 800,

    }
})

export default Modles