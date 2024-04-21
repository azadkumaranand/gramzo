import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import React, { useEffect, useMemo, useState } from "react";
import fonts from "@const/fonts";
import dayjs from "dayjs";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { textStyle } from "@const/fonts";
import { fetchOrders } from "@rdx/OrderSlice";
import OrderListTopLable from "@/OrderComponents/OrderListTopLable";
import OrderdItem from "@/OrderComponents/OrderdItem";

const Earning_Details = ({ searchValue, startDate, endDate, complain }) => {
  const dispatch = useDispatch();

  const { orders, totalOrders, hasMore } = useSelector(
    (state) => state.order.delivered_orders
  );

  const isLoading = useSelector((state) => state.order.isLoading);
  const store = useSelector((state) => state.vendor.store);
  const [page, setPage] = React.useState(1);

  const formatedOrder = useMemo(() => {
    const obj = {};
    orders.map((item) => {
      const date = dayjs(item.timestamps.received_at).format("DD MMM");
      if (!obj[date]) obj[date] = [];
      obj[date].push(item);
    });
    return obj;
  }, [orders]);

  const searchObject = useMemo(() => {
    if (!searchValue) return [];
    return orders?.filter((item) =>
      item.track_id.toUpperCase().includes(searchValue.toUpperCase())
    );
  }, [searchValue, orders]);

  const calculateTotalEarning = (o) =>
    o.reduce((acc, order) => acc + order.total_bill, 0);

  useEffect(() => {
    if (!store) return;
    dispatch(
      fetchOrders({
        store_id: store._id,
        status: "delivered",
        page,
        startDate,
        endDate,
      })
    );
  }, [store, page, startDate, endDate]);

  return (
    <View style={styles.table}>
      <OrderListTopLable />

      {searchValue ? (
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {searchObject.map((item, index) => (
            <OrderdItem item={item} key={index} routeName={"Earning"} />
          ))}
        </View>
      ) : (
        <View>
          {Object.keys(formatedOrder).map((key) => (
            <View key={key}>
              <View
                style={{
                  paddingHorizontal: 13,
                }}
              >
                {formatedOrder[key].map((order, index) => (
                  <OrderdItem item={order} routeName={"Earning"} key={index} />
                ))}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#EDEDED",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginHorizontal: 13,
                  paddingHorizontal: 15,
                }}
              >
                <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#93908F")}>
                  {key} , Total Earning{" "}
                  {calculateTotalEarning(formatedOrder[key])}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {isLoading && <Loader />}
      {totalOrders === 0 && !isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 30,
          }}
        >
          <Text>No Orders</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  table: {
    borderWidth: 0,
    borderColor: "#000",
    marginVertical: 10,
    marginBottom: 120,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#EDEDED",
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    fontSize: 13,
  },
  status: {
    textAlign: "center",
    paddingVertical: 3,
    borderRadius: 5,
  },
});

export default Earning_Details;
