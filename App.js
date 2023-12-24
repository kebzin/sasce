import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useCustomFonts } from "./constants/theme";
import { DataProvider } from "./providers/DataProvider";
import StackNavigation from "./Navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  // loading the static font to
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" /> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DataProvider>
          <StatusBar style="auto" />
          <StackNavigation />
        </DataProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
