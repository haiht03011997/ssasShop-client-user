import {
  createEntitySlice
} from 'app/shared/reducers/reducer.utils';

const initialState: any = {
  info: {},
};

// slice

export const AccountSlice = createEntitySlice({
  name: 'account',
  initialState,
  reducers: {
    storeAccount(state: any, action) {
      state.info = action.payload;
      state.loading = false;
    },
  },
  extraReducers(builder) {
  },
});

export const { storeAccount } = AccountSlice.actions;

// Reducer
export default AccountSlice.reducer;
