import ProductPricing from 'app/modules/product/list/product';
import React, { useEffect } from 'react';
import { products } from './config';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './netflix.reducer';

const NetflixComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const netflixList = useAppSelector(state => state.netflix.entities);

  // initialize sate
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    handleGetAllProducts();
  }, [currentPage])

  const handleGetAllProducts = () => {
    dispatch(getEntities())
  }

  const handleViewDetail = (slug: string) => {
    navigate(`chi-tiet/${slug}`);
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
      products={netflixList}
      currentPage={currentPage}
      imgSrc="content/images/netflix.svg"
      title="Netflix giá rẻ"
    />
  );
};
export default NetflixComponent;
