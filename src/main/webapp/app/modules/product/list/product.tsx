import { Pagination, Row, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEntities } from '../product.reducer';
import ProductCard from './product-item';
import './style.scss';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
const { Title, Text } = Typography;

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productList = useAppSelector(state => state.product.entities);
  const totalItems = useAppSelector(state => state.product.totalItems);

  // initialize sate
  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="product-container">
      <div className="product-header">
        <Title level={3} className="product-title">
          Danh sách sản phẩm
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        {(productList ?? []).map(product => (
          <ProductCard key={product.id} handleDetail={handleViewDetail} product={product} />
        ))}
      </Row>
      <Pagination
        current={currentPage}
        showLessItems
        pageSize={ITEMS_PER_PAGE}
        showSizeChanger={false}
        total={totalItems}
        className="py-2 d-flex align-items-center justify-content-center"
        onChange={page => handlePageChange(page)}
      />
    </div>
  );
};

export default ProductList;
