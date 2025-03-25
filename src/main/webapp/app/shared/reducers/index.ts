import { ReducersMapObject } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import password from 'app/modules/account/password/password.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
import entitiesReducers from 'app/entities/reducers';
import applicationProfile from './application-profile';
import authentication from './authentication';
import account from 'app/modules/account/account.reducer';
import product from 'app/modules/product/product.reducer';
import productReview from 'app/modules/product/detail/rate/product-review.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer: ReducersMapObject = {
  authentication,
  applicationProfile,
  passwordReset,
  password,
  loadingBar,
  account,
  product,
  productReview,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  ...entitiesReducers,
};

export default rootReducer;
