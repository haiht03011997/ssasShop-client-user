import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { api } from 'app/config/axios-interceptor';
import { IProduct } from 'app/shared/model/product.model';
import {
  createEntitySlice,
  serializeAxiosError
} from 'app/shared/reducers/reducer.utils';
import { cleanEntity } from 'app/shared/util/entity-utils';

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
export const getOtherEntities = createAsyncThunk(
  'product/fetch_other_entities',
  async ({ categoryId, id }: any) => {
    const requestUrl = `${apiUrl}/${id}/${categoryId}/others`;
    return api.get<IProduct[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// slice

export const ProductSlice = createEntitySlice({
  name: 'product',
  initialState,
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getOtherEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isPending(getOtherEntities), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

export const { reset } = ProductSlice.actions;

// Reducer
export default ProductSlice.reducer;
