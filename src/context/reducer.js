export const initialState = {
  cart: [],
  user: null,
  notifications: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case 'REMOVE_FROM_CART':
      const index = state.cart.findIndex((item) => item.id === action.id);
      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it is not in cart!`
        );
      }
      return {
        ...state,
        cart: newCart,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.item],
      };

    // case 'REMOVE_NOTIFICATION':
    //   const newNotificationList = const index = state.cart.findIndex((item) => item.id === action.);
    //   return {
    //     ...state,
    //     notifications: [...state.notifications, newNotificationList]
    //   }

    default:
      return state;
  }
};
