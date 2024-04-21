import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import fonts from "@const/fonts";
import { Dropdown } from "react-native-element-dropdown";

const DropdownDemo = ({
  item,
  dropdown_type,
  handleChange,
  catagory,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue ?? "");
  const [isFocus, setIsFocus] = useState(false);

  const handleSelect = (item) => {
    handleChange(item.value);
    setIsFocus(false);
    setValue(item?.value);
  };

  return (
    <View
      style={{
        width: catagory ? 130 : "100%",
      }}
    >
      {/* {
        catagory ? "" :
          <View
            style={{
              paddingHorizontal: 4,
              paddingBottom: 8,
            }}
          >
            <Text
              style={{
                color: "rgba(52, 64, 84, 1)",
                fontSize: 13,
                fontFamily: fonts.PRIMARY_FONT_400,
              }}
            >
              {dropdown_type}
            </Text>
          </View>
      } */}

      <Dropdown
        style={[
          catagory ? styles.categoryDropdown : styles.dropdown,

          isFocus && { borderColor: "rgba(208, 213, 221, 1)" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={[
          styles.iconStyle,
          { transform: [{ rotate: isFocus ? "180deg" : "0deg" }] },
        ]}
        data={item}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? ` Choose ${dropdown_type} ` : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  dropdown: {
    borderColor: "rgba(255, 103, 0, 1)",
    borderWidth: 1,
    borderRadius: 9999,
    borderColor: "rgba(208, 213, 221, 1)",
    paddingHorizontal: 10,
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 1)",
    fontFamily: fonts.PRIMARY_FONT_400,
  },

  placeholderStyle: {
    fontSize: 13,
    color: "rgba(102, 112, 133, 1)",
    fontFamily: fonts.PRIMARY_FONT_400,
  },

  selectedTextStyle: {
    fontSize: 15,
    fontWeight: 400,
    fontFamily: fonts.PRIMARY_FONT_400,
    color: "rgba(102, 112, 133, 1)",
    paddingHorizontal: 15,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 18,
    color: "rgba(52, 64, 84, 1)",
  },
  categoryDropdown: {
    borderBottomWidth: 1,
    borderColor: "rgba(147, 144, 143, 1)",
    borderRadius: 6,
    paddingHorizontal: 0,
  },
});

export default DropdownDemo;
