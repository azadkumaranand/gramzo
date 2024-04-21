import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@const/colors";
import Earning_Details from "@/EarningComponents/Earning_Details";
import fonts from "@const/fonts";
import QuantityBox from "@/OrderComponents/QuantityBox";
import { AntDesign, Feather } from "@expo/vector-icons";
import DateTimePicker from "@/DateTimePicker";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/core";
import { get_store_summary_api } from "@func/api_functions";
import { useSelector } from "react-redux";
import DateRangeSelector from "@/EarningComponents/DateRangeSelector";
import HeaderStyle from "@const/HeaderStyle";

const Earning = () => {
  const [searchValue, setsearchValue] = useState("");
  const [open, setopen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [DataType, setDataType] = useState("");
  const [complain, setComplain] = useState(false);

  const navigation = useNavigation();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const store = useSelector((state) => state.vendor.store);
  const [selectedDateRage, setSelectedDateRage] = useState({
    startDate: "",
    endDate: "",
  });

  const [hasDateSorting, setHasDateSorting] = useState(false);

  React.useEffect(() => {
    if (!store) return;
    get_store_summary_api(store._id).then(([data, err]) => {
      if (err) return;
      setTotalEarnings(data?.totalEarnings);
      setTotalOrders(data?.totalOrders);
    });
  }, [store]);

  const handleDataType = (type) => {
    setopen(!open);
    setDataType(type);
  };

  const handleDate = (pickedDate) => {
    if (DataType == "Start") {
      setStartDate(pickedDate);
    } else if (DataType == "End") {
      startDate < pickedDate
        ? setEndDate(pickedDate)
        : alert("End date should be greater than start date");
    }
  };

  const handleSubmit = ({ type, date, deselect }) => {
    setSelectedDateRage((prev) => ({ ...prev, [type]: date }));
  };

  return (
    <SafeAreaView style={styles.Earning_Container}>
      <DateTimePicker
        open={open}
        setOpen={setopen}
        handleSelectDate={handleDate}
        mode="date"
      />
      <View style={styles.Header}>
        <View style={styles.header_box}>
          <View
            style={{
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 19,
                color: "#FFF",
                fontFamily: fonts.PRIMARY_FONT_500,
              }}
            >
              Earning/All Orders
            </Text>
          </View>

          <TouchableOpacity
            style={styles.complaints}
            onPress={() => navigation.navigate("Complaints")}
          >
            <Text
              style={{
                fontFamily: fonts.PRIMARY_FONT_600,
                fontSize: 14,
                color: "#93908F",
              }}
            >
              Complaints
            </Text>

            <Image
              source={require("@assets/Icons/rightUp.png")}
              style={{ width: 14, height: 14 }}
            />
          </TouchableOpacity>

        </View>

      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View style={[styles.SearchBar]}>
          <Image
            source={require("@assets/Icons/Search.png")}
            style={{
              width: 13,
              height: 13,
            }}
          />
          <TextInput
            placeholder="Order ID"
            placeholderTextColor="#777"
            onChangeText={setsearchValue}
            value={searchValue}
            style={{
              width: "100%",
            }}
          />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.btnsContainer}>
            <QuantityBox width={125} Lable={"Pending Amount"} Qantity={`₹20`} />
            <QuantityBox
              width={100}
              Lable={"Total Orders"}
              Qantity={totalOrders}
            />
            <QuantityBox
              width={120}
              Lable={"Total Earning"}
              Qantity={`₹${Math.floor(totalEarnings)}`}
            />
            <QuantityBox
              item={store}
              width={140}
              Lable={"Total Raiting"}
              Qantity={store?.rating || 0}
              rating
            />
          </View>
        </ScrollView>

        <View style={[styles.Sort_Container]}>
          <View style={styles.Sort_Container_box}>
            <Text
              style={{
                fontSize: 14,
                color: "#1B1816",
                fontFamily: fonts.PRIMARY_FONT_700,
              }}
            >
              Short:
            </Text>

            <DateRangeSelector
              dateRange={selectedDateRage}
              handleSubmit={handleSubmit}
            />
            {/* 
            <TouchableOpacity
              style={styles.sort_Date}
              onPress={() => handleDataType("Start")}
            >
              {!!startDate ? (
                <Text
                  style={{
                    fontSize: 14,
                    color: "#93908F",
                  }}
                >
                  {dayjs(startDate).format("DD/MM/YY")}
                </Text>
              ) : (
                <>
                  <AntDesign name="calendar" size={14} color="black" />
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
              style={styles.sort_Date}
              onPress={() => handleDataType("End")}
              disabled={!startDate}
            >
              {!!endDate ? (
                <Text
                  style={{
                    fontSize: 14,
                    color: "#93908F",
                  }}
                >
                  {dayjs(endDate).format("DD/MM/YY")}
                </Text>
              ) : (
                <>
                  <AntDesign name="calendar" size={14} color="black" />
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
            </TouchableOpacity> */}

            <TouchableOpacity
              style={[styles.sort_Date, complain && { borderColor: "#42AF10" }]}
              onPress={() => setComplain(!complain)}
            >
              <Feather
                name="alert-circle"
                size={15}
                color={complain ? "#42AF10" : "#555555"}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.PRIMARY_FONT_400,
                  color: complain ? "#42AF10" : "#555555",
                }}
              >
                Complain
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={{}}>
        <View>
          <Earning_Details
            searchValue={searchValue}
            startDate={startDate}
            endDate={endDate}
            complain={complain}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  complaints: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  Earning_Container: {
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
  },

  header_box: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: HeaderStyle.top,
    marginBottom: 20
  },

  Header: {
    height: HeaderStyle.height,
    backgroundColor: colors.HEADER_GREEN_COLOR,
    justifyContent: "center",
  },

  SearchBar: {
    // width: 115,
    alignItems: "center",
    paddingVertical: 12,
    // paddingHorizontal: 10,
    paddingHorizontal: 25,
    gap: 10,
    // paddingVertical: 13,
    // marginVertical: 20,
    borderWidth: 1,
    borderColor: "#5555",
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 36,
    backgroundColor: "#ffffff",
  },

  // Short COntainer

  Sort_Container_box: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 10,
  },
  sort_Discont: {
    borderColor: "#E5E7EB",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  sort_Date: {
    borderColor: "#E5E7EB",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 3,
    alignItems: "center",
  },
  sort_text: {
    color: "#FF6700",
    fontSize: 14,
  },

  // order short Details
  short_details: {
    borderRadius: 5,
    borderColor: colors.ORANGE_SECONDARY_LIGHT_COLOR,
    borderWidth: 2,
    paddingHorizontal: 5,
    backgroundColor: "#FEFCE8",
    alignItems: "flex-start",
  },

  //modal  pop up
  // Modal_Conatiner: {
  //   borderRadius: 13,
  //   backgroundColor: "#FFFFFF",
  //   height: 800,
  // },
  btnsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  addOffer: {
    fontWeight: "900",
  },
  addBtn: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  amount: {
    fontSize: 28,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  datePicker: {
    width: 200,
    marginBottom: 20,
  },
  button: {
    fontSize: 16,
    color: "blue",
    marginTop: 10,
  },
});

export default Earning;
