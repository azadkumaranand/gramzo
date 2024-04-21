import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import QuantityBox from '@/OrderComponents/QuantityBox'
import OrderListTopLable from '@/OrderComponents/OrderListTopLable'
import { useState } from 'react'
import fonts from "@const/fonts";
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from '@/DateTimePicker'
import dayjs from 'dayjs'
import { fetchOrders } from '@rdx/OrderSlice'
import OrderFlatList from '@/OrderComponents/OrderFlatList'
import OrderdItem from '@/OrderComponents/OrderdItem'
import CancleHeaders from '@/OrderComponents/CancleHeaders'
import colors from '@const/colors'



const CancleOrderScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const store = useSelector((state) => state.vendor.store);
    const { orders, totalOrders, hasMore } = useSelector((state) => state.order.cancelled_orders);
    const isLoading = useSelector(state => state.order.isLoading);

    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [open, setopen] = useState(false);
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [DataType, setDataType] = useState("");
    const [page, setPage] = useState(1);


    const handleDataType = (type) => {
        setopen(!open);
        setDataType(type);
    };

    const handleDate = (pickedDate) => {
        if (DataType == "Start") {
            setStartDate(pickedDate);
        } else if (DataType == "End") {
            StartDate < pickedDate ?
                setEndDate(pickedDate) : alert("End date should be greater than start date")
        }
    };


    useEffect(() => {
        if (!store) return;
        dispatch(fetchOrders({ store_id: store._id, status: "cancelled", page }));
    }, [store, page]);


    return (
        <SafeAreaView style={styles.Maincontainer}>

            <DateTimePicker
                open={open}
                setOpen={setopen}
                handleSelectDate={handleDate}
                mode="date"
            />
            {/* <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#55A630" translucent={true} /> */}
            <CancleHeaders lable={"Canceled Orders"} handlnavigation={navigation.goBack} />

            <View style={styles.AfterHeader}>
                <View style={styles.QuantityBox}>
                    <QuantityBox width={150} Lable={"Total Canceled Order"} Qantity={totalOrders} />
                    <QuantityBox width={160} Lable={"Today’s Canceled Order"} Qantity={0} />
                </View>

                <View style={styles.sortcontainer}>
                    <Text
                        style={{
                            fontFamily: fonts.PRIMARY_FONT_700,
                            fontSize: 15,
                            color: "#FF6700"
                        }}>Select Range</Text>

                    {/* <TouchableOpacity style={styles.sortBox}>
                        <Fontisto name="date" size={13} color="#55A630" />
                        <Text
                            style={{
                                fontFamily: fonts.PRIMARY_FONT_400,
                                fontSize: 13,
                                color: "#55A630"
                            }}>From</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.sortBox}
                        onPress={() => handleDataType("Start")}
                    >
                        {!!StartDate ? (
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#93908F",
                                }}
                            >
                                {dayjs(StartDate).format("DD/MM/YY")}
                            </Text>
                        ) : (
                            <>
                                <Image
                                    source={require("@assets/Icons/Date.png")}
                                    style={{ width: 14, height: 14 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: fonts.PRIMARY_FONT_400,
                                        color: "#555555",
                                    }}
                                >
                                    From
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.sortBox}
                        onPress={() => handleDataType("End")}
                    >
                        {!!EndDate ? (
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#93908F",
                                }}
                            >
                                {dayjs(EndDate).format("DD/MM/YY")}
                            </Text>
                        ) : (
                            <>
                                <Image
                                    source={require("@assets/Icons/Date.png")}
                                    style={{ width: 14, height: 14 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: fonts.PRIMARY_FONT_400,
                                        color: "#555555",
                                    }}
                                >
                                    To
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                </View>
            </View>

            <OrderListTopLable />

            <View style={styles.OrderdITem}>
                <OrderFlatList
                    data={orders.concat(orders)}
                    isLoading={isLoading}
                    hasMore={hasMore}
                    renderItem={({ item }) => <OrderdItem item={item} routeName={"cancel"} />}
                    total={totalOrders}
                    fetchMoreData={() => {
                        if (hasMore) setPage(page + 1);
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    OrderdITem: {
        paddingHorizontal: 20,
        flex: 1
    },
    sortcontainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: "center",
        marginTop: 30
    },
    sortBox: {
        backgroundColor: "#F0FDF4",
        height: 25,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        // paddingHorizontal: 10,
        // paddingVertical: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#55A630',
        flexDirection: "row",
        gap: 4,
        alignItems: 'center'
    },

    AfterHeader: {
        paddingHorizontal: 20,
        marginVertical: 28,
    },
    QuantityBox: {
        flexDirection: "row",
        gap: 15

    },
    Maincontainer: {
        flex: 1,
        backgroundColor: colors.PRIMARY_BACKGROUND_COLOR
    }
})

export default CancleOrderScreen