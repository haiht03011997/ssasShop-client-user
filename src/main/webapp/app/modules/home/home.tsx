import './home.scss';

import CustomCarousel from 'app/entities/carousel';
import NetflixComponent from 'app/entities/netflix/netflix';
import YoutubeComponent from 'app/entities/youtube';
import FlashSale from 'app/shared/component/flash-sale/flash-sale';
import VerticalMenu from 'app/shared/layout/sidebar/customer/vertical/vertical-menu';
import React from 'react';
import FeatureRight from './feature-right';

export const Home = () => {
  return (
    <>
      <div className="d-flex gap-1 py-2 home">
        <div className="col-md-2">
          <VerticalMenu />
        </div>
        <div className="col-md-7">
          <CustomCarousel />
        </div>
        <div className="col-md-3">
          <FeatureRight />
        </div>
      </div>
      <div className="p-2 d-flex gap-4 flex-column">
        <FlashSale />
        <NetflixComponent />
        <YoutubeComponent />
      </div>
    </>
  );
};

export default Home;
