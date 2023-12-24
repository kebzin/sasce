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
  const [activeItem, setActiveItem] = useState(null);

  const renderItem = ({ item }) => {
    const isActive = activeItem === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.itemContainer}
        onPress={() => handleItemClick(item.id)}
      >
        <View
          style={[
            styles.itemContent,
            {
              backgroundColor: isActive ? COLORS.success : COLORS.grey20,
            },
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              ...FONTS.body4,
              color: isActive ? COLORS.light : COLORS.dark,
            }}
          >
            {item.label}
          </Text>
        </View>
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
      onEndReached={() => setActiveItem(null)} // Reset activeItem when reaching the end
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: SIZES.base,
  },
  itemContent: {
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    width: SIZES.width / 3, // Set the desired width (adjust as needed)
  },
});
