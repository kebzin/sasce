import React from "react";
import { Text, View } from "react-native";
import HeaderComponent from "../../components/Headers/HeaderComponent";
import { COLORS } from "../../constants";
import SearchComponent from "../../components/Headers/SearchComponent";
import Categories from "../../components/Headers/Categories";
// import SearchComponent from "../../components/Header/SearchComponent";

const HomePage = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.grey08,
        paddingHorizontal: 10,
      }}
    >
      <HeaderComponent />
      <SearchComponent />
      <Categories />
    </View>
  );
};

export default HomePage;
