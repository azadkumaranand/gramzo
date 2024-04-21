import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { Entypo } from "@expo/vector-icons";
import { textStyle } from "@const/fonts";

const CustomDropdown = ({
  item,
  handelDropdownData,
  setProductAmountUnit,
  productAmountUnit,
}) => {
  //   const [productAmountUnit, setProductAmountUnit] = useState("");
  const [currentstockDropdown, setcurrentstockDropdown] = useState(false);

  const handleDropArrow = () => {
    setcurrentstockDropdown(!currentstockDropdown);
  };

  const ChoosenItem = (item) => {
    handelDropdownData(item);
    setProductAmountUnit(item);
    handleDropArrow();
  };

  return (
    <>
      <View
        style={{
          width: 80,
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          onPress={() => handleDropArrow()}
        >
          {
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Text style={textStyle(14, fonts.PRIMARY_FONT_500, "#93908F")}>
                {productAmountUnit}
              </Text>
              {currentstockDropdown ? (
                <Entypo name="chevron-small-up" size={24} color="#AAAAAA" />
              ) : (
                <Entypo name="chevron-small-down" size={24} color="#AAAAAA" />
              )}
            </View>
          }
        </TouchableOpacity>

        {currentstockDropdown && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              gap: 15,
              position: "absolute",
              top: 45,
              borderWidth: 1,
              borderColor: "#eee",
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 1100,
              width: 70,
            }}
          >
            {item.map((items, index) => (
              <TouchableOpacity
                style={{
                  // paddingHorizontal: 15,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  console.log(item.label);
                  ChoosenItem(items.label);
                }}
                key={index}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.PRIMARY_FONT_400,
                  }}
                >
                  {" "}
                  {items.label}{" "}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </>
  );
};

export default CustomDropdown;
