import { View, Text, SafeAreaView, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import StoreHeaders from "@/storecomponent/StoreHeaders";
import PayoutBox from "@/storecomponent/PayoutBox";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import fonts, { textStyle } from "@const/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "@const/colors";

const PickupAndDellivery = () => {
  const { params } = useRoute();
  const { store } = useSelector((state) => state.vendor);
  const deliveryCharges = store?.pickup_details?.delivery_charges;

  const withincity = deliveryCharges?.["within_city"];
  const acrossIndia = deliveryCharges?.["across_india"];

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.Maincontainer}>
      {/* <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#71C442"
        translucent={true}
      /> */}

      <StoreHeaders lable={"Pickup and Delivery"} navigation={true} />
      <View style={styles.AfterHeader}>
        <PayoutBox
          lable={"Delivery Time"}
          date={params?.deliveryType || "Automatically"}
          button={"Change"}
          onhandlechange={() =>
            navigation.navigate("DeliveryTime", {
              deliveryType: params?.deliveryType,
            })
          }
        />
        <PayoutBox
          lable={"Pickup Address"}
          date={
            [store.address, ...store.pickup_details.pickup_address].find(
              (a) => a.isDefault
            )?.address_type
          }
          button={"Change"}
          onhandlechange={() =>
            navigation.navigate("PickupAddress", { Location: params?.Location })
          }
        />

        <View style={styles.DeliveryCharges}>
          <View style={styles.toppart}>
            <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#555555")}>
              Delivery Charges
            </Text>
          </View>

          <View style={styles.bottompart}>
            <TouchableOpacity
              style={styles.deliveryPalace}
              onPress={() =>
                navigation.navigate("DeliveryCharges", {
                  location: "within_city",
                })
              }
            >
              <View style={styles.leftpart}>
                <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#1B1816")}>
                  Within City
                </Text>
                <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#6B7280")}>
                  {withincity?.type === "free"
                    ? "Free delivery on all orders"
                    : withincity?.type === "fixed"
                    ? `Free delivery charges ₹${withincity?.delivery_charge} for all orders`
                    : withincity?.type === "limit"
                    ? `Free delivery above ₹${withincity?.min_order_amount} and ₹${withincity?.delivery_charge} charged below ₹${withincity?.min_order_amount}`
                    : "Select Delivery Charges"}
                </Text>
              </View>
              <View style={styles.rightpart}>
                <AntDesign name="right" size={18} color="#93908F" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deliveryPalace}
              onPress={() =>
                navigation.navigate("DeliveryCharges", {
                  location: "across_india",
                })
              }
            >
              <View style={styles.leftpart}>
                <Text style={textStyle(16, fonts.PRIMARY_FONT_500, "#1B1816")}>
                  Across India{" "}
                </Text>
                <Text
                  style={{
                    // width: "80%",
                    ...textStyle(14, fonts.PRIMARY_FONT_400, "#6B7280"),
                  }}
                >
                  {acrossIndia?.type === "free"
                    ? "Free delivery on all orders"
                    : acrossIndia?.type === "fixed"
                    ? `Free delivery charges ₹${acrossIndia?.delivery_charge} for all orders`
                    : acrossIndia?.type === "limit"
                    ? `Free delivery above ₹${acrossIndia?.min_order_amount} and ₹${acrossIndia?.delivery_charge} charged below ₹${acrossIndia?.min_order_amount}`
                    : "Select Delivery Charges"}
                </Text>
              </View>
              <View style={styles.rightpart}>
                <AntDesign name="right" size={18} color="#93908F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  leftpart: {
    gap: 5,
    width: "90%",
  },
  toppart: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#E3E3E3",
    // borderStyle: "dashed",
  },

  bottompart: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    gap: 20,
  },

  DeliveryCharges: {
    marginTop: 15,
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "#FFFFFF",
  },
  deliveryPalace: {
    flexDirection: "row",
    // padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Maincontainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },

  AfterHeader: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
});

export default PickupAndDellivery;
