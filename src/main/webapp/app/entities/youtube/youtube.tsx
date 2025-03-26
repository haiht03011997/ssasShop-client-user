import ProductPricing from 'app/modules/product/list/product';
import React, { useEffect } from 'react';
import { products } from './config';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './youtube.reducer';

const YoutubeComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const youtubeList = useAppSelector(state => state.youtube.entities);
  const totalItems = useAppSelector(state => state.youtube.totalItems);

  // initialize sate
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    handleGetAllProducts();
  }, [currentPage])

  const handleGetAllProducts = () => {
    dispatch(getEntities("youtube"))
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
    youtubeList.length > 0 &&
    (<ProductPricing
      handleBuy={handleBuy}
      handleChangePage={handlePageChange}
      handleDetail={handleViewDetail}
      products={youtubeList}
      total={totalItems}
      currentPage={currentPage}
      imgSrc="content/images/youtube.svg"
      title="Youtube Premium"
    />)
  );
};
export default YoutubeComponent;
