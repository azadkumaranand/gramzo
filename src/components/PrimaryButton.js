import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import fonts from "@const/fonts";
import Loader from "./Loader";

const PrimaryButton = ({
  children,
  onPress,
  width,
  disabled,
  background,
  isLoading,
  ...props
}) => {
  // console.log(background);
  const pressHandler = () => {
    onPress();
  };
  const [transparent, setTransparent] = useState(false);
  useEffect(() => {
    if (background) {
      setTransparent(true);
    } else {
      setTransparent(false);
    }
  }, [background]);
  // if(background){
  //   setTransparent(true);
  // }else{
  //   setTransparent(false);
  // }
  return (
    // <LinearGradient
    //     colors={['#55A630', '#71C442']}
    //     style={styles.button}
    // >
    <Pressable
      style={[
        styles.button,
        {
          width: width ? width : "90%",
          backgroundColor: transparent ? "#FFF" : "#55A630",
          borderWidth: transparent ? 1 : 0,
          borderColor: transparent ? "#42AF10" : "none",
        },
      ]}
      onPress={pressHandler}
      disabled={disabled}
    >
      {isLoading ? <Loader color="#fff" size={30} p={0} /> : <Text
        style={[styles.buttonText, { color: transparent ? "#42AF10" : "#fff" }]}
      >
        {children}
      </Text>}
    </Pressable>
    // </LinearGradient>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    padding: 11,
    // backgroundColor: "#55A630",
    width: "90%",
    borderRadius: 30,
    overflow: "hidden",
  },
  buttonText: {
    // color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.PRIMARY_FONT_500,
  },
});
