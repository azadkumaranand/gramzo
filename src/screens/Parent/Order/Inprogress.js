import { View, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import OrderListTopLable from "@/OrderComponents/OrderListTopLable";
import { fetchOrders } from "@rdx/OrderSlice";
import OrderFlatList from "@/OrderComponents/OrderFlatList";
import OrderdItem from "@/OrderComponents/OrderdItem";
import colors from "@const/colors";


const Inprogress = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const status = params?.status;

  const { orders, totalOrders, hasMore } = useSelector((state) => state.order[`${status}_orders`]);
  const isLoading = useSelector(state => state.order.isLoading);
  const store = useSelector((state) => state.vendor.store);
  const [page, setPage] = React.useState(1);


  useEffect(() => {
    if (!store) return;
    dispatch(fetchOrders({ store_id: store._id, status, page }));
  }, [status, store, page]);


  React.useEffect(() => {
    navigation.setOptions({
      title: `${route.name} (${totalOrders})`,
    })
  }, [navigation, totalOrders]);

  return (
    <View style={styles.MainContainer}>
      <OrderListTopLable />

      <View style={styles.OrderdITem}>
        <OrderFlatList
          data={orders}
          isLoading={isLoading}
          hasMore={hasMore}
          renderItem={({ item }) => <OrderdItem item={item} Inprogress routeName={params?.type} />}
          total={totalOrders}
          fetchMoreData={() => {
            if (hasMore) setPage(page + 1);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  MainContainer: {
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
    paddingTop: 20,
  },

  OrderdITem: {
    marginHorizontal: 15,
    flex: 1,
  }

});

export default Inprogress;
