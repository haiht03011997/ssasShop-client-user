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

export const getEntities = createAsyncThunk('youtube/fetch_entity_list', async (category: string) => {
  return api.get<IProduct[]>(apiUrl, {
    params: {
      category,
      cacheBuster: new Date().getTime(),
    },
  });
});

export const getEntity = createAsyncThunk(
  'youtube/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return api.get<IProduct>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'youtube/update_entity',
  async (entity: IProduct, thunkAPI) => {
    const result = await api.patch<IProduct>(`${apiUrl}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError },
);

// slice

export const YoutubeSlice = createEntitySlice({
  name: 'youtube',
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
      .addMatcher(isFulfilled(updateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(updateEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = YoutubeSlice.actions;

// Reducer
export default YoutubeSlice.reducer;
