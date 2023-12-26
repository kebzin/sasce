import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Welcome from "../screens/Walkthrough/Welcome";
// import Walkthrough from "../screens/Walkthrough/Walkthrough";
// import AuthMain from "../screens/Authentication/AuthMain";
import { CheckOut, Login, Product, Register, Terms } from "../screens";
import TabNavigation from "./TabNavigation";
import { COLORS, FONTS } from "../constants";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const screenOptions = {
    headerShadowVisible: false,
    headerShown: false,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={TabNavigation}
        options={screenOptions}
      />

      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Screen
        name="terms"
        component={Terms}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Screen
        name="product"
        component={Product}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Screen
        name="checkout"
        component={CheckOut}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
