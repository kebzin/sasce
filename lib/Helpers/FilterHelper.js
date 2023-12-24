// filterUtils.js

export const filterItemsByCategory = (items, category, ItemList) => {
  if (!items || items.length === 0) {
    return ItemList; // Set filter to entire ItemList data if data is undefined or empty
  }

  if (category.toLowerCase() === "all category") {
    return ItemList; // Set filter to entire ItemList data if category is "All Category"
  } else {
    return items.filter((item) => item.category === category);
  }
};
