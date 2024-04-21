import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import ComplaintItem from "@/userComplaint/ComplaintItem";
import { useRoute } from "@react-navigation/native";
import Loader from "@/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplains } from "@rdx/ComplainSlice";
import OrderFlatList from "@/OrderComponents/OrderFlatList";
import fonts, { textStyle } from "@const/fonts";

const Unsolved = ({ navigation, route }) => {
  const { params } = useRoute();
  const status = params?.status;
  const dispatch = useDispatch();

  const { complains, totalComplains, hasMore } = useSelector(
    (state) => state.complain[`${status}_complains`]
  );
  const isLoading = useSelector((state) => state.complain.isLoading);
  const store = useSelector((state) => state.vendor.store);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(
      fetchComplains({ store_id: "65493e19f38d17900f63d220", status, page })
    );
  }, [status, store, page]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.name} (${totalComplains})`,
    });
  }, [navigation, totalComplains, route.name]);

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
            {totalComplains === 0
              ? "No Complains Found"
              : !hasMore && "No More Complains"}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, gap: 10, padding: 10, backgroundColor: "white" }}>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {complains.map((complain) => {
          return <ComplaintItem key={complain._id} complain={complain} />;
        })}
        {isLoading && <Loader />}
        {!(totalComplains || isLoading) && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'grey', fontFamily: fonts.PRIMARY_FONT_500 }}>No complains found</Text>
        </View>}
      </ScrollView> */}
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={complains}
        horizontal={false}
        renderItem={({ item }) => <ComplaintItem complain={item} />}
        keyExtractor={(item) => item?._id}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasMore) setPage(page + 1);
        }}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Unsolved;
