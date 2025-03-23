import { Badge, Button, Card, Col, Image, Pagination, Row, Typography } from 'antd';
import { IProduct } from 'app/shared/model/product.model';
import React from 'react';
import './style.scss';
import { api } from 'app/config/axios-interceptor';
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
          {title}
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col md={6} key={product.id}>
            <Badge.Ribbon text={`Giảm -${product.discount}%`} color="red" className="discount-ribbon">
              <Card hoverable className="product-card" cover={<Image alt={product.name} src={`${SERVER_API}${product.imageUrl}`} className="product-image" />}>
                <div className="d-flex flex-column gap-3">
                  <Title level={5} className="mx-2 product-product-title">
                    {product.name}
                  </Title>
                  <div className="price-container">
                    <Text delete className="product-old-price">
                      {product?.price.toLocaleString()}đ
                    </Text>
                    <Text strong className="product-new-price">
                      {product?.newPrice.toLocaleString()}đ
                    </Text>
                  </div>
                  <div className="product-buttons">
                    <Button
                      type="default"
                      onClick={() => {
                        handleDetail(product);
                      }}
                      className="detail-button"
                    >
                      Chi tiết
                    </Button>
                    <Button type="primary" className="buy-button">
                      Mua ngay
                    </Button>
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
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
