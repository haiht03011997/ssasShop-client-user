import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ProductDetailPage from './detail/product-detail';

const ProductRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="chi-tiet/:slug" element={<ProductDetailPage />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default ProductRoutes;
