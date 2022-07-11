import {
  ADD_TEES_TO_STATE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  SET_FILTERED_STATE,
  SET_SEARCH_STATUS,
  SET_SEARCH_STATE,
} from "../actions";
let initialState = {
  products: [],
  cartItems: [],
  filteredState: [],
  filter: false,
  search: false,
  searchItems: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEES_TO_STATE: {
      return {
        ...state,
        products: [...action.products.sort((a, b) => a.id - b.id)],
      };
    }
    case ADD_TO_CART: {
      const product = state.products[action.id - 1];
      product.qtyInCart = 1;
      product.quantity--;
      product._id = Date.now();
      return {
        ...state,
        cartItems: [...state.cartItems, product],
      };
    }

    case REMOVE_FROM_CART: {
      const filtered_products = state.cartItems.filter(
        (elem) => action.id !== elem.id
      );

      return {
        ...state,
        cartItems: [...filtered_products],
      };
    }

    case INCREASE_QUANTITY: {
      let filtered_products = [];
      let product;

      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].id === action.id) {
          product = state.cartItems[i];
        } else {
          filtered_products.push(state.cartItems[i]);
        }
      }
      product.qtyInCart++;
      product.quantity--;
      return {
        ...state,
        cartItems: [...filtered_products, product],
      };
    }
    case DECREASE_QUANTITY: {
      let filtered_products = [];
      let product;

      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].id === action.id) {
          product = state.cartItems[i];
        } else {
          filtered_products.push(state.cartItems[i]);
        }
      }
      product.qtyInCart--;
      product.quantity++;
      return {
        ...state,
        cartItems: [...filtered_products, product],
      };
    }

    case SET_FILTERED_STATE: {
      return {
        ...state,
        filteredState: action.filteredState,
        filter: action.value,
      };
    }

    case SET_SEARCH_STATUS: {
      return {
        ...state,
        search: action.value,
      };
    }

    case SET_SEARCH_STATE: {
      return {
        ...state,
        searchItems: action.products,
      };
    }

    default: {
      return state;
    }
  }
};
