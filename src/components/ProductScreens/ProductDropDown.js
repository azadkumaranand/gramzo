import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import fonts from "@const/fonts";
import { Dropdown } from "react-native-element-dropdown";

const ProductDropDown = ({ item, handleChange, dropdown_type, width }) => {
  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);



  const handleSelect = (item) => {
    handleChange(item.label);
    setIsFocus(false);
    setValue(item?.label);
  };

  return (
    <View
      style={{
        width: 70,
     

      }}
    >
      <Dropdown
        style={[
          styles.dropdown,
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
        placeholder={!isFocus ? `${dropdown_type} ` : ".."}
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
    // paddingHorizontal: 15,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  categoryDropdown: {
    borderBottomWidth: 1,
    borderColor: "rgba(147, 144, 143, 1)",
    borderRadius: 6,
    paddingHorizontal: 0,
  },
});
export default ProductDropDown;
