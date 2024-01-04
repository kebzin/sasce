import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { constants, SIZES, FONTS, COLORS } from "../../constants";
import { useData } from "../../hook/useData";
import { filterItemsByCategory } from "../../lib/Helpers/FilterHelper";

const Categories = ({ data, setData }) => {
  const { ItemList, setFilter } = useData();
  const [activeItem, setActiveItem] = useState(constants.Category[0].id);

  // hanle the click of the category item and filter base on that category
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    const filteredItems = filterItemsByCategory(data, item.label, ItemList);
    setData(filteredItems);
  };

  // render item list of the category
  const renderItem = ({ item }) => {
    const isActive = activeItem === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.itemContent,
          {
            backgroundColor: isActive ? COLORS.success : 'rgba(0, 0, 0, 0)',

            height: 50,
         
          },
        ]}
        onPress={() => handleItemClick(item)}
      >
        <Text
          style={{
            textAlign: "center",
            padding: SIZES.base,
            ...FONTS.body4,
            color: isActive ? COLORS.light : COLORS.dark,
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={constants.Category}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      extraData={activeItem}
      contentContainerStyle={{ columnGap: 15 }}
      onEndReachedThreshold={0.1}
      onEndReached={() => {}}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  itemContent: {
    borderRadius: SIZES.radius,
    flex: 1,
    width: SIZES.width / 3,
    // Set the desired width (adjust as needed)
  },
});
