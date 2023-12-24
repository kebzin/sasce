import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { constants, SIZES, FONTS, COLORS } from "../../constants";

const Categories = () => {
  // Initialize activeItem with the id of the first element
  const [activeItem, setActiveItem] = useState(constants.Category[0].id);

  const renderItem = ({ item }) => {
    const isActive = activeItem === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.itemContent,
          {
            backgroundColor: isActive ? COLORS.success : COLORS.support5_08,
            height: 50,
          },
        ]}
        key={item.id}
        onPress={() => handleItemClick(item.id)}
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

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Additional logic or actions when an item is clicked
  };

  return (
    <FlatList
      horizontal
      data={constants.Category}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      extraData={activeItem} // Ensure re-render when activeItem changes
      onEndReachedThreshold={0.1}
      contentContainerStyle={{ gap: 10 }}
      onEndReached={() => setActiveItem(null)} // Reset activeItem when reaching the end
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
