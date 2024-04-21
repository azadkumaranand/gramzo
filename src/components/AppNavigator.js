import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalDetails from "../screens/OnboardingScreens/PersonalDetails";
import PrivateDetails from "../screens/OnboardingScreens/PrivateDetails";
import WorkDetails from "../screens/OnboardingScreens/WorkDetails";
import OfferScreen from "../screens/Parent/Home/OfferScreen";
import ParentScreen from "../screens/Parent/ParentScreen";
import OfferCard from "./HomeComponents/OfferCard";
import SplashScreen from "../screens/SplashScreen";
import CoupenModalSecond from "./HomeComponents/CoupenModalSecond";
import ProductSelection from "../screens/Parent/Product/ProductSelection";
import ConfirmationScreen from "./ConfirmationScreen";
import CamraPicker from "./OnboardingComponents/CamraPicker";
import Coupan from "../screens/Parent/Home/Coupan";
import PickupAndDellivery from "../screens/Parent/Store/PickupAndDellivery";
import DeliveryTime from "../screens/Parent/Store/DeliveryTime";
import PickupAddress from "../screens/Parent/Store/PickupAddress";
import DeliveryCharges from "../screens/Parent/Store/DeliveryCharges";
import KYC_varification from "../screens/Parent/Store/KYC_varification";
import EditePage from "../screens/Parent/Store/EditePage";
import CancleOrderScreen from "../screens/Parent/Order/CancleOrderScreen";
import ProductEditModal from "./ProductScreens/ProductEditModal";
import ProductInfoModal from "./ProductScreens/ProductInfoModal";
import LoginScreen from "../screens/LoginScreens/LoginScreen";
import UserComplaint from "../screens/complaintScreen/UserComplaint";
import ComplaintDetail from "../screens/complaintScreen/ComplaintDetail";
import Paymentsetting from "../screens/pages/Paymentsetting";
import Upidetails from "../screens/pages/Upidetails";
import Changeaccount from "../screens/pages/Changeaccount";
import Bankdetails from "../screens/pages/Bankdetails";
import Payout from "../screens/pages/Payout";
import Payoutdetails from "../screens/pages/Payoutdetails";
import Story from "../screens/pages/Story";
import Faq from "../screens/pages/Faq";
import LogoutModal from "../screens/pages/LogoutModal";
import Nortificaion from "src/screens/pages/Nortificaion";
import ChooseLanguage from "src/screens/Parent/Store/ChooseLanguage";
import MyStoreScreen from "src/screens/Parent/Store/MyStoreScreen";
import PhotoZoom from "./OrderComponents/modal/PhotoZoom";
import ProductHeader from "./ProductHeader";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="splashScreen"
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="WorkDetails" component={WorkDetails} />
        <Stack.Screen name="PrivateDetails" component={PrivateDetails} />

        <Stack.Screen name="ParentScreen" component={ParentScreen} />

        <Stack.Screen name="ProductEditModal" component={ProductEditModal} />
        <Stack.Screen name="ProductInfoModal" component={ProductInfoModal} />

        <Stack.Screen name="OfferScreen" component={OfferScreen} />

        <Stack.Screen name="OfferCard" component={OfferCard} />
        <Stack.Screen name="CoupenModalSecond" component={CoupenModalSecond} />

        <Stack.Screen name="ProductSelection" component={ProductSelection} />
        <Stack.Screen
          name="ConfirmationScreen"
          component={ConfirmationScreen}
        />
        <Stack.Screen name="CamraPicker" component={CamraPicker} />

        <Stack.Screen name="EditePage" component={EditePage} />
        <Stack.Screen name="ProductHeader" component={ProductHeader} />
        <Stack.Screen name="KYC_varification" component={KYC_varification} />
        <Stack.Screen
          name="PickupAndDellivery"
          component={PickupAndDellivery}
        />
        <Stack.Screen name="DeliveryTime" component={DeliveryTime} />
        <Stack.Screen name="PickupAddress" component={PickupAddress} />
        <Stack.Screen name="CancleOrderScreen" component={CancleOrderScreen} />
        <Stack.Screen name="DeliveryCharges" component={DeliveryCharges} />

        <Stack.Screen name="Complaints" component={UserComplaint} />
        <Stack.Screen name="ComplaintDetail" component={ComplaintDetail} />

        <Stack.Screen name="MyStoreScreen" component={MyStoreScreen} />

        <Stack.Screen name="Coupan" component={Coupan} />
        <Stack.Screen name="Paymentsetting" component={Paymentsetting} />
        <Stack.Screen name="Upidetails" component={Upidetails} />
        <Stack.Screen name="Changeaccount" component={Changeaccount} />
        <Stack.Screen name="Bankdetails" component={Bankdetails} />
        <Stack.Screen name="Payout" component={Payout} />
        <Stack.Screen name="Payoutdetails" component={Payoutdetails} />
        <Stack.Screen name="Story" component={Story} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="LogoutModal" component={LogoutModal} />
        <Stack.Screen name="Nortificaion" component={Nortificaion} />
        <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
        <Stack.Screen name="PhotoZoom" component={PhotoZoom} />
      </Stack.Navigator>
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
  );
};

export default AppNavigator;
