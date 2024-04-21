import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "@/Header";

const Payoutdetails = () => {
  const orders = [
    { orderId: "#5004563", date: "28 Jan, 05:10pm", earning: 567 },
    { orderId: "#5004563", date: "28 Jan, 05:10pm", earning: 567 },
    { orderId: "#5004563", date: "28 Jan, 05:10pm", earning: 567 },
    { orderId: "#5004563", date: "27 Jan, 05:10pm", earning: 567 },
    { orderId: "#5004563", date: "27 Jan, 05:10pm", earning: 567 },
    { orderId: "#5004563", date: "27 Jan, 05:10pm", earning: 567 },
    { orderId: "#5004563", date: "26 Jan, 05:10pm", earning: 567 },
    { orderId: "#5004563", date: "26 Jan, 05:10pm", earning: 567 },
    // Add more orders with different dates
  ];

  const [deliveredAccordian, setDeliveredAccordian] = useState(false);
  const [cancledAccordian, setCancledAccordian] = useState(false);

  const groupOrdersByDate = (orders) => {
    const groupedOrders = {};
    orders.forEach((order) => {
      const date = order.date;
      if (!groupedOrders[date]) {
        groupedOrders[date] = [];
      }
      groupedOrders[date].push(order);
    });
    return Object.entries(groupedOrders).map(([date, orders]) => ({
      title: date,
      data: orders,
    }));
  };

  const groupedOrders = groupOrdersByDate(orders);

  //   console.log(groupedOrders);
  return (
    <>
      <View>
        <Header title="Your Payouts" subtitles="#5004563" notice={true} />
      </View>
      <View style={{ backgroundColor: '#FBFFF9' }}>
        <View style={styles.transctionBox}>
          <View style={[styles.boxLine1, { marginBottom: 20 }]}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#93908F",
                }}
              >
                CURRENT PAYOUT CYCLE
              </Text>
              <Text
                style={{
                  color: "#555",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                26th Feb - 2nd March
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#93908F",
                }}
              >
                PAYOUT CYCLE
              </Text>
              <Text
                style={{
                  color: "#555",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                4th March
              </Text>
            </View>
          </View>
          <View style={styles.boxLine2}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#93908F",
                }}
              >
                TOTAL YOU RECEIVED
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#42AF10",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  ₹23421
                </Text>
                <Text
                  style={{
                    color: "#555",
                    fontSize: 14,
                    fontWeight: "500",
                    marginHorizontal: 4,
                  }}
                >
                  496 orders
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          paddingHorizontal: 0,
          backgroundColor: '#FBFFF9',
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ marginBottom: 30 }}>
            <View
              style={{
                borderWidth: 3,
                borderColor: "#ebebeb",
                height: 0,
                marginBottom: 20,
                marginTop: 10,
              }}
            ></View>
            <View style={styles.aboutBox}>
              <View style={styles.mainHeadingBox}>
                <Text style={styles.mainHead1}>Delivered - 456 Orders</Text>
                <Text style={styles.mainHead2}>₹24,421</Text>
              </View>
              <View style={styles.contentbox}>
                <Text>Total Delivery Fee</Text>
                <Text>- ₹1000</Text>
              </View>
              <TouchableOpacity
                style={styles.contentbox}
                onPress={() => {
                  setDeliveredAccordian(!deliveredAccordian);
                }}
              >
                <Text>View All Delivered Orders</Text>
                <Text>
                  <AntDesign
                    name={deliveredAccordian ? "down" : "right"}
                    color="black"
                    size={15}
                  />
                </Text>
              </TouchableOpacity>
              {deliveredAccordian && (
                <View style={styles.table}>
                  {/* Header row */}
                  <View style={styles.row}>
                    <Text style={styles.headerCell}>Date</Text>
                    <Text style={styles.headerCell}>Order ID</Text>
                    <Text style={styles.headerCell}>Earning</Text>
                    <Text style={styles.headerCell}>Action</Text>
                  </View>

                  {/* Data rows */}
                  {groupedOrders.map((item, index) => {
                    return (
                      <View key={index}>
                        <View style={styles.row}>
                          <Text
                            style={[
                              styles.cell,
                              { backgroundColor: "#EDEDED", color: "#555" },
                            ]}
                          >
                            {item.title}
                          </Text>
                        </View>
                        {item.data.map((dateItem, i) => {
                          // Fix: Use parentheses here
                          return (
                            <View style={styles.row} key={i}>
                              <Text style={[styles.cell]}>{item.title}</Text>
                              <Text style={[styles.cell]}>
                                {dateItem.orderId}
                              </Text>
                              <Text style={[styles.cell]}>
                                {dateItem.earning}
                              </Text>
                              <Text style={[styles.cell]}>View</Text>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
              )}
              <View style={styles.contentbox}>
                <Text>Final Earning</Text>
                <Text
                  style={{ color: "#FB7D13", fontSize: 16, fontWeight: "600" }}
                >
                  ₹23,421
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 3,
                borderColor: "#ebebeb",
                height: 0,
                marginBottom: 20,
                marginTop: 10,
              }}
            ></View>
            <View style={styles.aboutBox}>
              <View style={styles.mainHeadingBox}>
                <Text style={styles.mainHead1}>Canceled - 40 Orders</Text>
                <Text style={styles.mainHead2}>₹24,421</Text>
              </View>
              <View style={styles.contentbox}>
                <Text>Total Delivery Fee</Text>
                <Text>- ₹1000</Text>
              </View>
              <TouchableOpacity
                style={styles.contentbox}
                onPress={() => {
                  setCancledAccordian(!cancledAccordian);
                }}
              >
                <Text>View All Delivered Orders</Text>
                <Text>
                  <AntDesign
                    name={cancledAccordian ? "down" : "right"}
                    color="black"
                    size={15}
                  />
                </Text>
              </TouchableOpacity>
              {/* Accordian */}
              {cancledAccordian && (
                <View style={styles.table}>
                  {/* Header row */}
                  <View style={styles.row}>
                    <Text style={styles.headerCell}>Date</Text>
                    <Text style={styles.headerCell}>Order ID</Text>
                    <Text style={styles.headerCell}>Earning</Text>
                    <Text style={styles.headerCell}>Action</Text>
                  </View>

                  {/* Data rows */}
                  {groupedOrders.map((item, index) => {
                    return (
                      <View key={index}>
                        <View style={styles.row}>
                          <Text
                            style={[
                              styles.cell,
                              { backgroundColor: "#EDEDED", color: "#555" },
                            ]}
                          >
                            {item.title}
                          </Text>
                        </View>
                        {item.data.map((dateItem, i) => {
                          // Fix: Use parentheses here
                          return (
                            <View style={styles.row} key={i}>
                              <Text style={[styles.cell]}>{item.title}</Text>
                              <Text style={[styles.cell]}>
                                {dateItem.orderId}
                              </Text>
                              <Text style={[styles.cell]}>
                                {dateItem.earning}
                              </Text>
                              <Text style={[styles.cell]}>View</Text>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
              )}

              {/* end Accordian */}
              <View style={styles.contentbox}>
                <Text>Final Missed Earning </Text>
                <Text
                  style={{ color: "#FB7D13", fontSize: 16, fontWeight: "600" }}
                >
                  ₹9,000
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Payoutdetails;

const styles = StyleSheet.create({
  boldheadeing: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    color: "#555",
  },
  SearchBar: {
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: "#5555",
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  boxLine1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  boxLine2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viaUpi: {
    color: "#E9B200",
    backgroundColor: "#FCF8EB",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
  },
  transctionBox: {
    // borderWidth: 1,
    borderColor: "#E3E3E3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  mainHeadingBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  aboutBox: {
    paddingHorizontal: 20,
  },
  mainHead1: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  mainHead2: {
    color: "#42AF10",
    fontSize: 20,
    fontWeight: "700",
  },
  contentbox: {
    backgroundColor: "#FEF9F4",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  table: {
    borderWidth: 0,
    borderColor: "#000",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.2,
    borderBottomColor: "#555",
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
    color: "#93908F",
  },
});
