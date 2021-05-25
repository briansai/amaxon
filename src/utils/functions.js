export const getCartTotal = (cart) => {
  return cart?.reduce((acc, cur) => cur.price + acc, 0);
};
