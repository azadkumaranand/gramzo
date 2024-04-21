import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@rdx/Store";
import { PersistGate } from "redux-persist/integration/react";
import { RootSiblingParent } from "react-native-root-siblings";
import AppNavigator from "./src/components/AppNavigator";
import { ToastProvider } from "react-native-toast-notifications";
import * as Font from "expo-font";

const fetchFonts = async () =>
  Font.loadAsync({
    "Mukta-300": require("@assets/fonts/Mukta-Light.ttf"),
    "Mukta-400": require("@assets/fonts/Mukta-Regular.ttf"),
    "Mukta-500": require("@assets/fonts/Mukta-Medium.ttf"),
    "Mukta-600": require("@assets/fonts/Mukta-SemiBold.ttf"),
    "Mukta-700": require("@assets/fonts/Mukta-Bold.ttf"),
    "Metropolis-400": require("@assets/fonts/metropolis.light.otf"),
    "Metropolis-500": require("@assets/fonts/metropolis.medium.otf"),
    "Metropolis-600": require("@assets/fonts/metropolis.bold.otf"),
    "Metropolis-700": require("@assets/fonts/metropolis.semi-bold.otf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetchFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <ToastProvider>
            <AppNavigator />
          </ToastProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
