import { createAsyncThunk, isFulfilled } from '@reduxjs/toolkit';
import { api } from 'app/config/axios-interceptor';
import {
  createEntitySlice,
  EntityState,
  IOption
} from 'app/shared/reducers/reducer.utils';

const initialState: EntityState<any> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  options: [],
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/publicCategory';

// Actions
export const getAllEntities = createAsyncThunk('categories/fetch_select_box_entity', async () => {
  return api.get<IOption[]>(`${apiUrl}/select-box`);
});

// slice

export const CategorySlice = createEntitySlice({
  name: 'categories',
  initialState,
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getAllEntities), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          options: data,
        };
      });
  },
});

export const { reset } = CategorySlice.actions;

// Reducer
export default CategorySlice.reducer;
