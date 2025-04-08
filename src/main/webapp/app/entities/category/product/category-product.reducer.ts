import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { api } from 'app/config/axios-interceptor';
import { IProduct } from 'app/shared/model/product.model';
import {
  createEntitySlice,
  IQueryParams,
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
interface IGetOtherEntities extends IQueryParams {
  category?: string;
  name?: string;
  min?: number;
  max?: number;
}
export const getEntities = createAsyncThunk('categoryProduct/fetch_entity_list', async ({ category, name, min, max, sort, page }: IGetOtherEntities) => {
  return api.get<IProduct[]>(apiUrl, {
    params: {
      category,
      name,
      sort,
      min,
      max,
      page,
      cacheBuster: new Date().getTime(),
    },
  });
});

export const getEntity = createAsyncThunk(
  'categoryProduct/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return api.get<IProduct>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// slice

export const NetflixSlice = createEntitySlice({
  name: 'categoryProduct',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

export const { reset } = NetflixSlice.actions;

// Reducer
export default NetflixSlice.reducer;
