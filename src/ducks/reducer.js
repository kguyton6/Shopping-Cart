const initialState = {
  products: {},
  cart: [],
  user: {}
};

const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_CART = "ADD_CART";
const GET_USER = 'GET_USER'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      Object.assign({}, state, { products: action.payload });
      return state;

    case ADD_CART:
      Object.assign({}, state, { cart: action.payload });
      return state;

    case GET_USER:
      Object.assign({}, state, { user: action.payload })
      return state

    default:
      return state;
  }
};

export const addCart = cart => ({
  type: ADD_CART,
  payload: cart
});
export const getUserInfo = user => ({
  type: GET_USER,
  payload: user
})
export const getProducts = products => ({
  type: GET_PRODUCTS,
  payload: products
});
export default reducer;
