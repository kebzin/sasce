import React from "react";
import { Text, View } from "react-native";
import HeaderComponent from "../../components/Headers/HeaderComponent";
import { COLORS } from "../../constants";
import SearchComponent from "../../components/Headers/SearchComponent";
import Categories from "../../components/Headers/Categories";
import RenderItems from "./RenderItems";
import { FlatList } from "react-native";
import { useData } from "../../hook/useData";
// import SearchComponent from "../../components/Header/SearchComponent";

const HomePage = () => {
  const { ItemList, SetITemList } = useData();
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

      <FlatList
        data={ItemList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <RenderItems item={item} addToCart={SetITemList} />;
        }}
        initialNumToRender={10}
        numColumns={2}
        columnWrapperStyle={{
          gap: 10,
        }}
        contentContainerStyle={{
          rowGap: 20,
          marginTop: 15,
        }}
      />
    </View>
  );
};

export default HomePage;
