// Save or update an item in storage
export const saveOrUpdateStorage = (
  keyWord: string,
  item: { id: string; name: string; price: number; count: number }
) => {
  const localeDATA = localStorage.getItem(keyWord);
  const oldData = localeDATA ? JSON.parse(localeDATA) : [];

  // Check if the item already exists in the cart
  const existingItemIndex = oldData.findIndex(
    (i: { id: string }) => i.id === item.id
  );

  if (existingItemIndex > -1) {
    // If the item exists, update its count
    oldData[existingItemIndex].count += item.count;
  } else {
    // If the item doesn't exist, add it to the cart
    oldData.push(item);
  }

  localStorage.setItem(keyWord, JSON.stringify(oldData));
};

// Retrieve items from storage
export const getStorage = (keyWord: string) => {
  const data = localStorage.getItem(keyWord);
  return data ? JSON.parse(data) : null;
};

// Clear all items from storage
export const clearStorage = (keyWord: string) => {
  localStorage.removeItem(keyWord);
};

// Remove a specific item from storage
export const removeItem = (keyWord: string, itemId: string) => {
  const localeDATA = localStorage.getItem(keyWord);
  const oldData = localeDATA ? JSON.parse(localeDATA) : [];

  // Filter out the item to be removed
  const newData = oldData.filter((item: { id: string }) => item.id !== itemId);

  localStorage.setItem(keyWord, JSON.stringify(newData));
};

// Update the quantity of a specific item in storage
export const updateItemQuantity = (
  keyWord: string,
  itemId: string,
  newCount: number
) => {
  const localeDATA = localStorage.getItem(keyWord);
  const oldData = localeDATA ? JSON.parse(localeDATA) : [];

  const itemIndex = oldData.findIndex(
    (item: { id: string }) => item.id === itemId
  );

  if (itemIndex > -1) {
    if (newCount <= 0) {
      // Remove the item if the new count is 0 or less
      oldData.splice(itemIndex, 1);
    } else {
      // Update the item count
      oldData[itemIndex].count = newCount;
    }
  }

  localStorage.setItem(keyWord, JSON.stringify(oldData));
};
// Calculate the total price of items in storage
export const getTotalPrice = (keyWord: string) => {
  const localeDATA = localStorage.getItem(keyWord);
  const items = localeDATA ? JSON.parse(localeDATA) : [];

  // Calculate the total price
  const totalPrice = items.reduce((total: any, item: any) => {
    return total + item.price * item.count;
  }, 0);

  return totalPrice;
};
