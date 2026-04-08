import { AuthProvider } from "@/context/AuthContext";
import AppNavigator from "@/navigation/AppNavigator";
import { useFonts } from "expo-font";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [loaded] = useFonts({
    Karla: require("./assets/fonts/Karla-Regular.ttf"),
    KarlaMedium: require("./assets/fonts/Karla-Medium.ttf"),
    KarlaSemiBold: require("./assets/fonts/Karla-SemiBold.ttf"),
    KarlaBold: require("./assets/fonts/Karla-Bold.ttf"),
    MarkaziText: require("./assets/fonts/MarkaziText-Regular.ttf"),
    MarkaziMedium: require("./assets/fonts/MarkaziText-Medium.ttf"),
    MarkaziSemiBold: require("./assets/fonts/MarkaziText-SemiBold.ttf"),
    MarkaziBold: require("./assets/fonts/MarkaziText-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
