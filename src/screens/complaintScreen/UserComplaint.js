import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "@const/colors";
import fonts from "@const/fonts";
import Unsolved from "./Unsolved";
import { AntDesign } from '@expo/vector-icons';


const UserComplaint = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => <AntDesign name="arrowleft" size={24} color="white" onPress={navigation.goBack} />,
      title: `  User Complaint`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: colors.HEADER_GREEN_COLOR,
      },
      headerShadowVisible: false,
      headerTitleStyle: {
        fontFamily: fonts.PRIMARY_FONT_600,
        fontSize: 18,
      }
    })
  }, [navigation]);

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          color: "#FFF",
          textTransform: "none",
          lineHeight: 20,
          fontFamily: fonts.PRIMARY_FONT_600,
        },

        tabBarStyle: {
          backgroundColor: colors.HEADER_GREEN_COLOR,
        },

        tabBarIndicatorStyle: { backgroundColor: "#FFF", height: 5 },
        activeTintColor: colors.HEADER_GREEN_COLOR,
      }}
    >
      <Tab.Screen name="Unsolved" component={Unsolved} initialParams={{ status: 'unsolved' }} />
      <Tab.Screen name="Solved" component={Unsolved} initialParams={{ status: 'solved' }} />
      <Tab.Screen name="Expired" component={Unsolved} initialParams={{ status: 'expired' }} />
    </Tab.Navigator>
  );
};

export default UserComplaint;
