import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { preventAutoHideAsync } from "expo-splash-screen";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/app/components/Toast";
import { BOTTOM_TOAST_OFFSET } from "../utils";
import { Weather } from "@/app/screens";
import { Routes } from "./routes";

const RootStack = createNativeStackNavigator();

preventAutoHideAsync();

const Router = () => {
  const [loaded] = useFonts({
    "Lato-Light": require("../assets/fonts/LatoLight.ttf"),
    "Lato-Regular": require("../assets/fonts/LatoRegular.ttf"),
    "Lato-Bold": require("../assets/fonts/LatoBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={Routes.WEATHER} component={Weather} />
      </RootStack.Navigator>
      <Toast
        config={toastConfig}
        position="bottom"
        bottomOffset={BOTTOM_TOAST_OFFSET}
      />
    </>
  );
};

export { Router };
