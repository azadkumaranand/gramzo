import { View, Text, FlatList } from "react-native";
import React from "react";
import Loader from "@/Loader";
import fonts, { textStyle } from "@const/fonts";

const OrderFlatList = ({
  isLoading,
  data,
  renderItem,
  total,
  hasMore,
  fetchMoreData,
}) => {
  const renderFooter = () => (
    <View marginBottom={120}>
      {isLoading ? (
        <Loader size={30} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Text style={textStyle(14, fonts.PRIMARY_FONT_300, "gray")}>
            {total === 0 ? "No Orders Found" : !hasMore && "No More Orders"}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        horizontal={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?._id + index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMoreData}
        ListFooterComponent={renderFooter}
      />
    </>
  );
};

export default OrderFlatList;
