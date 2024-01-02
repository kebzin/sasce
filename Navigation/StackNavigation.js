import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CheckOut,
  Login,
  Product,
  Register,
  Terms,
  OrderList,
  Term,
  Account,
} from "../screens";
import TabNavigation from "./TabNavigation";
import { COLORS, FONTS } from "../constants";

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShadowVisible: false,
  headerShown: true,
  headerTitle: "",
  headerBackButtonMenuEnabled: true,
};

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={TabNavigation}
        options={{ ...screenOptions, headerShown: false }}
      />
      <Stack.Screen name="login" component={Login} options={screenOptions} />
      <Stack.Screen name="terms" component={Terms} options={screenOptions} />
      <Stack.Screen
        name="register"
        component={Register}
        options={screenOptions}
      />
      <Stack.Screen
        name="product"
        component={Product}
        options={screenOptions}
      />
      <Stack.Screen
        name="checkout"
        component={CheckOut}
        options={screenOptions}
      />
      <Stack.Screen
        name="orders"
        component={OrderList}
        options={screenOptions}
      />

      <Stack.Screen
        name="account"
        component={Account}
        options={screenOptions}
      />

      <Stack.Screen name="term" component={Term} options={screenOptions} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
