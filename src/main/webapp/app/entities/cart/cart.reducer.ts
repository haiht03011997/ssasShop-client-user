import {
  createEntitySlice
} from 'app/shared/reducers/reducer.utils';

const initialState: any = {
  cartItems: [],
  orderCode: null,
  loading: null,
  updateSuccess: false,
  error: null,
};

// slice

export const CartSlice = createEntitySlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state: any, action) {
      state.cartItems = action.payload;
      state.loading = false;
    },
    addToCart(state: any, action) {
      state.cartItems.push(action.payload);
      state.loading = false;
    },
    removeFromCart(state: any, action) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.loading = false;
    },
    setLoadingCart(state) {
      state.loading = true;
    },
    setError(state: any, action) {
      state.error = action.payload;
      state.loading = false;
    }
  },
  extraReducers(builder) { }
});

export const { setCart, addToCart, removeFromCart, setLoadingCart, setError, reset } = CartSlice.actions;

// Reducer
export default CartSlice.reducer;
