import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import ProductDetailPage from 'app/modules/product/detail/product-detail';
import CartPage from './cart';
import Order from './order';
import Payment from './payment';

/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="chi-tiet/:slug" element={<ProductDetailPage />} />
        <Route path="gio-hang" element={<CartPage />} />
        <Route path="dat-hang" element={<Order />} />
        <Route path="thanh-toan" element={<Payment />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
