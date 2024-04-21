import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "@const/colors";
import fonts from "@const/fonts";
import { Dimensions } from "react-native";
import Accept_order from "src/screens/Parent/Order/Accept_order";
import Inprogress from "src/screens/Parent/Order/Inprogress";

const OrderTopTabNavigator = () => {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          marginHorizontal: 0,
          fontSize: 14,
          color: "#FFF",
          textTransform: "uppercase",
          lineHeight: 20,
          fontFamily: fonts.PRIMARY_FONT_600,
        },
        tabBarGap: 20,
        tabBarItemStyle: {
          width: "auto",
          paddingHorizontal: 10

        },
        tabBarIndicatorContainerStyle: {
          marginLeft: 16,
        },

        tabBarStyle: {
          paddingLeft: 16,
          backgroundColor: colors.HEADER_GREEN_COLOR,
          width: Dimensions.get("window").width - 90,
          borderColor: 'transparent',
         borderWidth:0
        },
        tabBarIndicatorStyle: { backgroundColor: "#FFF", height: 5 }, // Customize indicator color
        activeTintColor: colors.HEADER_GREEN_COLOR, // Color for active tab
        tabBarScrollEnabled: true,
        
      })}
    >
      <Tab.Screen
        name="Accept" //received
        component={Accept_order}
        initialParams={{ type: 'accept', status: "received" }}
      />
      <Tab.Screen
        name="Inprogress" //accepted
        component={Inprogress}
        initialParams={{ type: 'inprogress', status: "accepted" }}
      />
      <Tab.Screen
        name="For pickup" //processed
        component={Inprogress}
        initialParams={{ type: 'forpickup', status: "processed" }}
      />
      <Tab.Screen
        name="To Deliver" //pickup_done
        component={Inprogress}
        initialParams={{ type: 'todeliver', status: "pickup_done" }}
      />
      <Tab.Screen
        name="Out for Delivery" //out_for_delivery
        component={Inprogress}
        initialParams={{ type: 'outfordelivery', status: "out_for_delivery" }}
      />
    </Tab.Navigator>
  );
};

export default OrderTopTabNavigator;
