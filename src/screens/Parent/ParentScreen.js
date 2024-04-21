import React from "react";
import { View, StyleSheet, Dimensions, Text, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderScreen from "./Order/OrderScreen";
import colors from "@const/colors";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Earning from "./Earning/Earning";
import ProductList from "./Product/ProductList";
import fonts from "@const/fonts";
import MyStoreScreen from "./Store/MyStoreScreen";

const Tab = createBottomTabNavigator();

const ParentScreen = () => {
  const dimensionHeight = Dimensions.get("screen").height;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.HEADER_GREEN_COLOR}
      />

      <Tab.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerStyle: {
            height: 125,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: colors.HEADER_GREEN_COLOR,
          },
          headerShown: false,
          tabBarActiveTintColor: colors.ORANGE_SHADE,
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            borderWidth: 1,

            borderTopWidth: 1,
            borderRadius: 9,
            height: 75,
            borderColor: colors.ORANGE_SHADE,
            position: "absolute",
            bottom: 0.035 * dimensionHeight,
            left: 20,
            right: 20,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Products"
          component={ProductList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="menu" color={color} size={size} />
                <Text
                  style={{
                    color: color,
                    marginTop: 2,
                    fontFamily: fonts.PRIMARY_FONT_400,
                  }}
                >
                  Products
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={OrderScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  top: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="profile" color={color} size={size} />
                <Text
                  style={{
                    color: color,
                    marginTop: 2,
                    fontFamily: fonts.PRIMARY_FONT_400,
                  }}
                >
                  Order
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Earning"
          component={Earning}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  top: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="rocket1" color={color} size={size} />
                <Text
                  style={{
                    color: color,
                    marginTop: 2,
                    fontFamily: fonts.PRIMARY_FONT_400,
                  }}
                >
                  Earning
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Store"
          component={MyStoreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  top: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="person-circle-sharp"
                  size={size}
                  color={color}
                />
                <Text
                  style={{
                    color: color,
                    marginTop: 2,
                    fontFamily: fonts.PRIMARY_FONT_400,
                  }}
                >
                  Store
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ParentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
