import { Badge, Button, Card, Col, Image, Pagination, Row, Typography } from 'antd';
import { IProduct } from 'app/shared/model/product.model';
import React from 'react';
import './style.scss';
import ProductCard from './product-item';
const { Title, Text } = Typography;

interface PricingProps {
  title: string;
  currentPage: number;
  total: number;
  imgSrc?: string;
  products: IProduct[];
  handleDetail: (record: any) => void;
  handleBuy: () => void;
  handleChangePage: (page: number) => void;
}

const ProductPricing = ({ handleBuy, handleChangePage, handleDetail, products, title, currentPage, imgSrc, total }: PricingProps) => {
  return (
    <div className="product-container">
      <div className="product-header">
        <img src={imgSrc} loading="lazy" />
        <Title level={3} className="product-title">
          Danh sách sản phẩm
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <ProductCard key={product.id} handleDetail={handleDetail} product={product} />
        ))}
      </Row>
      <Pagination
        current={currentPage}
        showLessItems
        pageSize={10}
        showSizeChanger={false}
        total={total}
        className="py-2 d-flex align-items-center justify-content-center"
        onChange={page => handleChangePage(page)}
      />
    </div>
  );
};

export default ProductPricing;
