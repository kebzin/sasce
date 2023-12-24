import React, { useState } from "react";
import { View } from "react-native";
import HeaderComponent from "../../components/Headers/HeaderComponent";
import { COLORS } from "../../constants";
import SearchComponent from "../../components/Headers/SearchComponent";
import Categories from "../../components/Headers/Categories";
import RenderItems from "./RenderItems";
import { FlatList } from "react-native";
import { useData } from "../../hook/useData";

const HomePage = () => {
  const { ItemList, SetITemList, card, setCard } = useData();
  const [data, setData] = useState(ItemList);

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
      <Categories data={data} setData={setData} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <RenderItems item={item} card={card} setCard={setCard} />;
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
