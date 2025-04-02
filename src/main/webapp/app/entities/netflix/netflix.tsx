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
  const totalItems = useAppSelector(state => state.netflix.totalItems);

  // initialize sate
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    handleGetAllProducts();
  }, [currentPage])

  const handleGetAllProducts = () => {
    dispatch(getEntities())
  }

  const handleViewDetail = (record: any) => {
    navigate(`chi-tiet/${record.slug}`, { state: { id: record.id } });
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
      total={totalItems}
      currentPage={currentPage}
      imgSrc="content/images/netflix.svg"
      title="Netflix giá rẻ"
    />
  );
};
export default NetflixComponent;
