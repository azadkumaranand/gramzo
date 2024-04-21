import React, { useState } from "react";
import { View } from "react-native";
import colors from "@const/colors";
import { FloatingLabelInput } from "react-native-floating-label-input";

const FloatInput = () => {
  const [phone, setPhone] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 50 }}>
      <FloatingLabelInput
        label="Phone"
        value={phone}
        staticLabel
        hintTextColor={"#aaa"}
        // mask="99 (99) 99999-9999"
        // hint="55 (22) 98765-4321"
        containerStyles={{
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderColor: colors.INPUT_BORDER_COLOR,
          borderRadius: 50,
        }}
        customLabelStyles={{
          colorFocused: colors.INPUT_BORDER_COLOR,
          fontSizeFocused: 12,
        }}
        labelStyles={{
          backgroundColor: "#fff",
          paddingHorizontal: 5,
        }}
        inputStyles={{
          color: "#555",
          paddingVertical: 3,
          paddingHorizontal: 10,
        }}
        onChangeText={(value) => {
          setPhone(value);
        }}
      />
    </View>
  );
};
export default FloatInput;
