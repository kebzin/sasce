// Function to add an item to the cart
export const addToCart = (item, card, setCard) => {
  // check if the item exists in the cart before adding it
  const itemExists = card.find((cartItem) => cartItem.id === item.id);

  if (itemExists) {
    // if it exists, increment the quantity of that item
    itemExists.quantity += 1;
    // update the cart state with the updated item
    setCard([...card]);
  } else {
    // if it doesn't exist, add the item to the cart
    setCard([...card, { ...item, quantity: 1 }]);
  }
};
