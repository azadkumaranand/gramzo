import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import QuantityBox from "./QuantityBox";
import { useSelector } from "react-redux";
import { get_todays_store_summary_api } from "@func/api_functions";

const OrderQuantity = () => {
  const { orders, totalOrders } = useSelector(
    (state) => state.order.received_orders
  );
  const store = useSelector((state) => state.vendor.store);
  const [todaysOrders, setTodaysOrders] = useState(0);
  const [todaysEarning, setTodaysEarning] = useState(0);

  useEffect(() => {
    if (!store) return;
    const getData = async () => {
      const [data, err] = await get_todays_store_summary_api(store._id);
      if (err) return console.log(err);
      setTodaysEarning(data.totalEarnings);
      setTodaysOrders(data.totalOrders);
    };
    getData();
  }, [store]);

  return (
    <View style={styles.MainBox}>
      <QuantityBox
        width={"25%"}
        Lable={"Today's Orders"}
        Qantity={todaysOrders}
      />
      <QuantityBox
        width={"28%"}
        Lable={"Pending Orders"}
        Qantity={totalOrders}
      />
      <QuantityBox
        width={"35%"}
        Lable={"Today's Earning (Rs)"}
        Qantity={todaysEarning}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainBox: {
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
export default OrderQuantity;
