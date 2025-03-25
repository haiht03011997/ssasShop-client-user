import { AppThunk } from 'app/config/store';
import {
  createEntitySlice
} from 'app/shared/reducers/reducer.utils';
import { getSignalRConnection, startSignalRConnection } from 'app/shared/signalR/signalR-service';

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
    updateQuantityFromSignalR(state: any, action) {
      const { productId, stock } = action.payload;
      state.cartItems = state.cartItems.map(item =>
        item.id === productId ? { ...item, quantity: stock } : item
      );
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

export const { setCart, addToCart, removeFromCart, setLoadingCart, setError, reset, updateQuantityFromSignalR } = CartSlice.actions;

// Reducer
export default CartSlice.reducer;

// Listen to SignalR updates
export const listenToStockUpdates = (): AppThunk => async dispatch => {
  await startSignalRConnection();
  const connection = getSignalRConnection();

  if (!connection) {
    console.error("⚠️ SignalR chưa kết nối!");
    return;
  }

  connection.on("UpdateStock", data => {
    console.log("🔄 UpdateStock SignalR received:", data);
    dispatch(updateQuantityFromSignalR({ productId: data.ProductId, stock: data.Stock }));
  });
};
