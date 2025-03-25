import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { api } from 'app/config/axios-interceptor';
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

const apiUrl = 'api/publicReview';

// Actions
export const getEntities = createAsyncThunk(
  'productReview/fetch_other_entities',
  async (productId: string | number) => {
    const requestUrl = `${apiUrl}`;
    return api.get<any[]>(requestUrl, {
      params: {
        productId
      }
    });
  },
  { serializeError: serializeAxiosError },
);

export const createReview = createAsyncThunk(
  'productReview/create_review',
  async (entity: any, thunkAPI) => {
    const result = await api.post<any>(`${apiUrl}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError },
);


// slice

export const ProductReviewSlice = createEntitySlice({
  name: 'productReview',
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
      })
      .addMatcher(isFulfilled(createReview), (state: any, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.orderCode = action.payload.data;
      })
      .addMatcher(isPending(createReview), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = ProductReviewSlice.actions;

// Reducer
export default ProductReviewSlice.reducer;
