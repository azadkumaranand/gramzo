import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderQuantity from "@/OrderComponents/OrderQuantity";
import OrderListTopLable from "@/OrderComponents/OrderListTopLable";
import { fetchOrders } from "@rdx/OrderSlice";
import OrderFlatList from "@/OrderComponents/OrderFlatList";
import OrderdItem from "@/OrderComponents/OrderdItem";
import colors from "@const/colors";

const Accept_order = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { orders, totalOrders, hasMore } = useSelector(
    (state) => state.order.received_orders
  );

  const isLoading = useSelector((state) => state.order.isLoading);
  const store = useSelector((state) => state.vendor.store);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    if (!store) return;
    dispatch(fetchOrders({ store_id: store._id, status: "received", page }));
  }, [store, page]);

  React.useEffect(() => {
    navigation.setOptions({
      title: `${route.name} (${totalOrders})`,
    });
  }, [navigation, totalOrders]);

  return (
    <>
      <View style={styles.Accept_Container}>
        <View style={styles.After_Header}>
          <OrderQuantity />
        </View>

        <OrderListTopLable />

        <View style={styles.OrderdITem}>
          <OrderFlatList
            data={orders}
            isLoading={isLoading}
            hasMore={hasMore}
            renderItem={({ item }) => <OrderdItem item={item} />}
            total={totalOrders}
            fetchMoreData={() => {
              if (hasMore) setPage(page + 1);
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  After_Header: {
    paddingVertical: 20,
  },

  ItemlistLable: {
    flexDirection: "row",
    backgroundColor: "#EDEDED",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 13,
    paddingHorizontal: 10,
  },

  Box2: {
    flexDirection: "row",
    gap: 60,
  },

  Accept_Container: {
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
  },

  OrderdITem: {
    marginHorizontal: 20,
    flex: 1,
  },
});

export default Accept_order;
