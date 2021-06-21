export const initialState = {
  cart: [],
  user: null,
  notifications: [],
  orders: [],
  toastNotify: true,
  history: null,
  burgerOpen: false,
  settingsOpen: false,
  headerInView: true,
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
          `Can't remove product (id: ${action.id}) because it is not in cart!`
        );
      }
      return {
        ...state,
        cart: newCart,
      };

    case 'EMPTY_CART':
      return {
        ...state,
        cart: [],
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        toastNotify: action.notify,
      };

    case 'SET_HISTORY':
      return {
        ...state,
        history: action.history,
      };

    case 'SET_BURGER_OPEN':
      return {
        ...state,
        burgerOpen: action.burgerOpen,
      };

    case 'SET_SETTINGS_OPEN':
      return {
        ...state,
        settingsOpen: action.settingsOpen,
      };

    case 'SET_HEADER_VIEW':
      return {
        ...state,
        headerInView: action.headerInView,
      };

    default:
      return state;
  }
};
