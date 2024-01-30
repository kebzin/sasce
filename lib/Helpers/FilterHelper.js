// filterUtils.js

export const filterItemsByCategory = (items, category, ItemList) => {
  if (!items || items.length === 0) {
    return ItemList; // Set filter to entire ItemList data if data is undefined or empty
  }

  const lowerCaseCategory = category.toLowerCase();

  if (lowerCaseCategory === "all category") {
    return items; // Show all items if category is "All Category"
  } else {
    return items.filter(
      (item) => item.category?.toLowerCase() === lowerCaseCategory
    );
  }
};

