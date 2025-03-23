import ProductPricing from 'app/modules/product/list/product';
import React from 'react';
import { products } from './config';

const YoutubeComponent = () => {
  // initialize sate
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleViewDetail = () => {
    console.error('View detail');
  };

  const handleBuy = () => {
    console.error('a', 'View detail');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ProductPricing
      handleBuy={handleBuy}
      handleChangePage={handlePageChange}
      handleDetail={handleViewDetail}
      products={products}
      currentPage={currentPage}
      imgSrc="content/images/youtube.svg"
      title="Youtube Premium"
    />
  );
};
export default YoutubeComponent;
