import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, View } from "react-native";

import { icons, COLORS, FONTS, SIZES } from "../constants/index";
import { Profile, Shopping, Search, HomePage } from "../screens";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IconeBotten } from "../components/common";
import { useData } from "../hook/useData";
// import { useAuth } from "../hook/useAuth";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  // Custom Tab Icon component
  const { card } = useData();

  const determintInitialRout = () => {
    return "HomeScreen";
  };
  const TabIcon = ({ icon, focused, onPress }) => {
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        // style={{ padding: SIZES.base }}
      >
        <Image
          resizeMode="cover"
          source={icon}
          style={{
            width: 30,
            height: 30,
            tintColor: focused === true ? COLORS.success : COLORS.grey,
          }}
        />
      </TouchableWithoutFeedback>
    );
  };

  const CardICon = ({ focused, onPress }) => {
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        style={{ position: "relative" }}
      >
        <Image
          resizeMode="cover"
          source={icons.shoppingCart}
          style={{
            width: 30,
            height: 30,
            tintColor: focused === true ? COLORS.success : COLORS.grey,
          }}
        />

        <Text
          style={{
            top: 0,
            right: 0,
            position: "absolute",
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.error,
            ...FONTS.h3,
          }}
        >
          {card.length === 0 ? null : card.length}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Tab.Navigator initialRouteName={determintInitialRout}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            TabIcon({
              icon: icons.cube,
              focused: focused,
              // Onpress: () => Navigation.navigate("Home"),
            }),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "white",
          headerTitleAllowFontScaling: true,
          // headerLeft: () => HeaderLeft({ icon: icons.logo }),
          // headerRight: () => HeaderRight({ icon: icons.bell }),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            TabIcon({
              icon: icons.search,
              focused: focused,
              // Onpress: () => Navigation.navigate("Home"),
            }),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "white",
          headerTitleAllowFontScaling: true,
          // headerLeft: () => HeaderLeft({ icon: icons.logo }),
          // headerRight: () => HeaderRight({ icon: icons.bell }),
        }}
      />
      <Tab.Screen
        name="cart"
        component={Shopping}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            CardICon({
              focused: focused,
            }),

          headerShadowVisible: true,
          headerShown: true,
          headerTitle: "My Cart",

          headerTitleAlign: "center",

          headerBackButtonMenuEnabled: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            TabIcon({
              icon: icons.person,
              focused: focused,
              // Onpress: () => Navigation.navigate("Home"),
            }),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "white",
          headerTitleAllowFontScaling: true,
          // headerLeft: () => HeaderLeft({ icon: icons.logo }),
          // headerRight: () => HeaderRight({ icon: icons.bell }),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
