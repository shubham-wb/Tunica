export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_TEES_TO_STATE = "ADD_TEES_TO_STATE";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_FILTERED_STATE = "SET_FILTERED_STATE";
export const SET_SEARCH_STATUS = "SET_SEARCH_STATUS";
export const SET_SEARCH_STATE = "SET_SEARCH_STATE";
export function addTeesToState(products) {
  return {
    type: ADD_TEES_TO_STATE,
    products,
  };
}

export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    id,
  };
}

export function increaseQty(id) {
  return {
    type: INCREASE_QUANTITY,
    id,
  };
}

export function decreaseQty(id) {
  return {
    type: DECREASE_QUANTITY,
    id,
  };
}

export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
}

export function setfilteredState(filteredState, value) {
  return {
    type: SET_FILTERED_STATE,
    filteredState,
    value,
  };
}

export function searchState(products) {
  return {
    type: SET_SEARCH_STATE,
    products,
  };
}

export function setSearchStatus(value) {
  return {
    type: SET_SEARCH_STATUS,
    value,
  };
}
