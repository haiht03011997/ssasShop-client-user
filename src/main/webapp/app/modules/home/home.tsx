import './home.scss';

import CustomCarousel from 'app/entities/carousel';
import FlashSale from 'app/shared/component/flash-sale/flash-sale';
import VerticalMenu from 'app/shared/layout/sidebar/customer/vertical/vertical-menu';
import React from 'react';
import ProductList from '../product/list/product';
import FeatureRight from './feature-right';

export const Home = () => {
  return (
    <>
      <div className="d-flex gap-1 py-2 home">
        <div className="col-md-3">
          <VerticalMenu />
        </div>
        <div className="col-md-6">
          <CustomCarousel />
        </div>
        <div className="col-md-3">
          <FeatureRight />
        </div>
      </div>
      <div className="p-2 d-flex gap-4 flex-column">
        <FlashSale />
        <ProductList />
      </div>
    </>
  );
};

export default Home;
