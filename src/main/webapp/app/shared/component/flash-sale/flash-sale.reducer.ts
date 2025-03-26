import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { api } from 'app/config/axios-interceptor';
import { IProduct } from 'app/shared/model/product.model';
import {
  createEntitySlice,
  serializeAxiosError
} from 'app/shared/reducers/reducer.utils';

const initialState: any = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/publicProduct';

// Actions
export const getEntities = createAsyncThunk(
  'productFlashSale/fetch_other_entities',
  async () => {
    const requestUrl = `${apiUrl}/today`;
    return api.get<IProduct[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// slice

export const ProductFlashSaleSlice = createEntitySlice({
  name: 'productFlashSale',
  initialState,
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isPending(getEntities), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

export const { reset } = ProductFlashSaleSlice.actions;

// Reducer
export default ProductFlashSaleSlice.reducer;
