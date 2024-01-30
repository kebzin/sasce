import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { constants, SIZES, FONTS, COLORS } from "../../constants";
import { useData } from "../../hook/useData";
import { filterItemsByCategory } from "../../lib/Helpers/FilterHelper";


const Categories = ({ data, setData }) => {
  const { Category } = constants;
  const [selectedCategory, setSelectedCategory] = useState(Category[0].id);
  const [isLoading, setLoading] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(true); // Flag to control data fetching

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Check if the selected category is "All" and the flag is set
      if (Category[selectedCategory]?.label.toLowerCase() === 'all category' && shouldFetchData) {
        setData(data); // Set data to the original list if "All" category is selected
        setLoading(false); // Stop loading immediately
      } else {
        // Filter items based on the selected category
        const filteredItems = data.filter(
          (item) => item.category?.toLowerCase() === Category[selectedCategory].label.toLowerCase()
        );
        setData(filteredItems);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, shouldFetchData]);

  // handle the click of the category item and filter based on that category
  const handleItemClick = (item) => {
    setShouldFetchData(selectedCategory !== item.id); // Set the flag based on whether the category changed
    setSelectedCategory(item.id);
  };

  // render item list of the category
  const renderItem = ({ item }) => {
    const isActive = selectedCategory === item.id;

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
            textAlign: 'center',
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
      data={Category}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      contentContainerStyle={{ columnGap: 15 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContent: {
    borderRadius: SIZES.radius,
    flex: 1,
    width: SIZES.width / 3,
    // Set the desired width (adjust as needed)
  },
});

export default Categories;