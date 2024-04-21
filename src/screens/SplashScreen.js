import React, { useEffect } from "react";
import { View, Image } from "react-native";
import KitchenseLogo from "@assets/KitchenSe.png";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import colors from "@const/colors";

const SplashScreen = () => {
  const user = useSelector((state) => state.vendor?.user);
  const navigation = useNavigation();
  // console.log(user);
  useEffect(() => {
    const timer = setTimeout(() => {
      let screen = "LoginScreen";

      if (user?.step == 1) screen = "WorkDetails";
      if (user?.step == 2) screen = "PrivateDetails";
      if (user?.step == 3) screen = "ParentScreen";

      navigation.replace(screen);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation, user]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.HEADER_GREEN_COLOR,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={KitchenseLogo}
        tintColor={"white"}
        style={{
          height: 50,
          objectFit: "contain",
        }}
      />
    </View>
  );
};

export default SplashScreen;
