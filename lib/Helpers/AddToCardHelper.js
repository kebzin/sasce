// // Function to add an item to the cart
// export const addToCart = (item, card, setCard, quantity = 0) => {
//   // check if the item exists in the cart before adding it
//   const itemExists = card.find((cartItem) => cartItem.id === item.id);

//   if (itemExists) {
//     // if it exists, increment the quantity of that item
//     itemExists.quantity += 1;
//     // update the cart state with the updated item
//     setCard([...card]);
//   } else {
//     // if it doesn't exist, add the item to the cart
//     setCard([...card, { ...item, quantity: quantity + 1 }]);
//   }
// };

// remove from cart
// Function to remove an item from the cart
export const removeFromCart = (item, card, setCard) => {
  // Filter out the item that needs to be removed
  const updatedCard = card.filter((cartItem) => cartItem.id !== item.id);
  // Update the cart state with the updated card
  setCard(updatedCard);
};

// Function to add an item to the cart
export const addToCart = (
  item,
  card,
  setCard,
  quantity = 0,
  reduceQuantity = true
) => {
  // Function to update quantity
  const updateQuantity = (newQuantity) => {
    setCard([
      ...card.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      ),
    ]);
  };

  if (!Number.isInteger(quantity) || quantity < 0) {
    console.error("Invalid quantity:", quantity);
    return;
  }

  const itemExists = card.find((cartItem) => cartItem.id === item.id);

  if (itemExists) {
    if (reduceQuantity == false) {
      return updateQuantity(itemExists.quantity - 1);
    }
    updateQuantity(itemExists.quantity + 1);
  } else {
    setCard([...card, { ...item, quantity: quantity + 1 }]);
  }
};
