import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { api } from 'app/config/axios-interceptor';
import {
  createEntitySlice,
  serializeAxiosError
} from 'app/shared/reducers/reducer.utils';
import { cleanEntity } from 'app/shared/util/entity-utils';

const initialState: any = {
  orderCode: null,
  loading: null,
  updateSuccess: false,
  error: null,
};

const apiUrl = 'api/publicOrder';

// Actions

export const createOrder = createAsyncThunk(
  'order/create_order',
  async (entity: any, thunkAPI) => {
    const result = await api.post<any>(`${apiUrl}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError },
);

// slice

export const OrderSlice = createEntitySlice({
  name: 'order',
  initialState,

  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(createOrder), (state: any, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.orderCode = action.payload.data;
      })
      .addMatcher(isPending(createOrder), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = OrderSlice.actions;

// Reducer
export default OrderSlice.reducer;
