import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import fonts, { textStyle } from "@const/fonts";
import NextButton from "../NextButton";
import PickUpSheduleModal from "./PickUpSheduleModal";
import { useNavigation } from "@react-navigation/native";

const DeliveryOptionsModal = ({ visible, handlemodalChange, item }) => {
  const delivery = [
    {
      Name: "Ecom Express",
      disc: "4.7 Est. delivery in 9 days",
      price: "₹ 100.3",
      Image: require("@assets/Icons/image200.png"),
    },
    {
      Name: "Delivery Express",
      disc: "4.7 Est. delivery in 9 days",
      price: "₹ 100.3",
      Image: require("@assets/Icons/image201.png"),
    },
    {
      Name: "Amazon",
      price: "₹ 100.3",
      disc: "4.7 Est. delivery in 9 days",
      Image: require("@assets/Icons/image203.png"),
    },
    {
      Name: "E-kart",
      price: "₹ 100.3",
      disc: "4.7 Est. delivery in 9 days",
      Image: require("@assets/Icons/image204.png"),
    },
  ];

  const [confirmation, setconfirmation] = useState(false);

  const navigation = useNavigation();
  const [wtType, setwtType] = useState("Dead");
  const [deliveryOption, setdeliveryOption] = useState("");

  const handledeliveryOption = (type) => {
    setdeliveryOption(type);
  };

  const handlewtType = (type) => {
    setwtType(type);
  };

  const handlescrenn = () => {
    setconfirmation(!confirmation);
    const confirmation = setTimeout(() => {
      setconfirmation(!confirmation);
      navigation.navigate("For pickup");
    }, 5000);
  };

  // const handlechangeScrenn = () => {

  // }

  const DeliveryOptionbox = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor:
            deliveryOption == item.Name
              ? "rgba(214, 255, 213, 1)"
              : "rgba(255, 255, 255, 1)",
          ...styles.optionBox,
        }}
        onPress={() => handledeliveryOption(item.Name)}
      >
        <View style={styles.optionBoxLeft}>
          <Image
            source={item.Image}
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
            }}
          />

          <View>
            <Text style={textStyle(15, fonts.PRIMARY_FONT_600, "rgba(27, 24, 22, 1)")}>
              {item.Name}
            </Text>
            <Text
              style={textStyle(13, fonts.PRIMARY_FONT_400, "rgba(147, 144, 143, 1)")}
            >
              {item.disc}
            </Text>
          </View>
        </View>

        <Text style={textStyle(13, fonts.PRIMARY_FONT_400, "rgba(147, 144, 143, 1)")}>
          {item.price}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <PickUpSheduleModal
        visible={confirmation}
        item={item}
        handlemodalChange={handlescrenn}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={handlemodalChange}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.5}
      >
        <View
          style={{
            paddingTop: 65,
            paddingHorizontal: 15,
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.63)",
          }}
        >
          <View style={styles.Modal_Conatiner}>
            <View style={styles.Header}>
              <View style={styles.leftPart}>
                <TouchableOpacity onPress={handlemodalChange}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <View>
                  <Text style={styles.headerText}>
                    Volumetric weight (l*b*h/5000)
                  </Text>
                  <Text style={styles.subHeaderText}>
                    Highest weight will be considered for delivery
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.RightPart}>
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.WeightBox}>
              <TouchableOpacity
                style={{
                  backgroundColor: wtType == "Dead" ? "#D6FFD5" : "#FFFFFF",
                  ...styles.deadWt,
                }}
                onPress={() => handlewtType("Dead")}
              >
                <Text
                  style={textStyle(
                    15,
                    fonts.PRIMARY_FONT_600,
                    wtType == "Dead"
                      ? "rgba(27, 24, 22, 1)"
                      : "rgba(85, 85, 85, 1)"
                  )}
                >
                  Dead Wt. - 0.4kgs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    wtType == "Volumetric" ? "#D6FFD5" : "#FFFFFF",
                  ...styles.volumeWt,
                }}
                onPress={() => handlewtType("Volumetric")}
              >
                <Text
                  style={textStyle(
                    15,
                    fonts.PRIMARY_FONT_600,
                    wtType == "Volumetric"
                      ? "rgba(27, 24, 22, 1)"
                      : "rgba(85, 85, 85, 1)"
                  )}
                >
                  Volumetric Wt. - 0.134kgs
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 20,
              }}
            >
              {delivery.map((item, index) => (
                <DeliveryOptionbox item={item} key={index} />
              ))}
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              <NextButton
                lable={"Next"}
                handlechangeScrenn={handlescrenn}
              />
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  optionBox: {
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    borderRadius: 8,
    paddingVertical: 15,
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  optionBoxLeft: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  headerText: {
    fontFamily: fonts.PRIMARY_FONT_600,
    fontSize: 16,
    color: "#555555",
  },
  subHeaderText: {
    fontFamily: fonts.PRIMARY_FONT_400,
    fontSize: 13,
    color: "#93908F",
  },
  WeightBox: {
    marginVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deadWt: {
    width: "40%",

    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },

  volumeWt: {
    width: "53%",

    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  leftPart: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  Header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  RightPart: {
    backgroundColor: "#F3F3F3",
    borderRadius: 999999,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",

  },
  Modal_Conatiner: {
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
});

export default DeliveryOptionsModal;
