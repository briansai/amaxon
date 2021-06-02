export const getCartTotal = (cart) => {
  return cart?.reduce((acc, cur) => cur.price + acc, 0);
};

export const getFirstName = (displayName) => {
  return displayName?.split(' ')[0];
};
