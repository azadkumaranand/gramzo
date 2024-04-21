import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ListedProducScreen from "@/ProductScreens/ListedProducScreen";
import colors from "../../../constants/colors";

const ProductTopTab = ({ selected }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          marginHorizontal: 0,
          fontSize: 14,
          // color: "#93908F",
          textTransform: "capitalize",
          // lineHeight: 20,
          fontFamily: fonts.PRIMARY_FONT_600,
        },
        tabBarGap: 20,
        tabBarItemStyle: {
          width: "auto",
          paddingHorizontal: 10,
        },
        tabBarStyle: {
          padding: 0,
        },
        tabBarIndicatorStyle: { backgroundColor: "#FB7D13", height: 2 }, // Customize indicator color
        tabBarActiveTintColor: "#FB7D13",
        tabBarInactiveTintColor: "#93908F",
      })}
    >
      <Tab.Screen
        name="All"
        component={ListedProducScreen}
        initialParams={{ type: "All", selected: selected }}
      />
      <Tab.Screen
        name="Sweets"
        component={ListedProducScreen}
        initialParams={{ type: "Sweets", selected: selected }}
      />
      <Tab.Screen
        name="Spice"
        component={ListedProducScreen}
        initialParams={{ type: "Pickle", selected: selected }}
      />
      <Tab.Screen
        name="Draft"
        component={ListedProducScreen}
        initialParams={{ type: "Draft", selected: selected }}
      />
    </Tab.Navigator>
  );
};

export default ProductTopTab;
