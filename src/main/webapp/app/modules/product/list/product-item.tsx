import { Col, Badge, Card, Button, Typography, Image } from "antd";
import React from "react";
import './style.scss';

interface IProductCardProps {
  product: any;
  handleDetail: (product: any) => void;
}

const { Title, Text } = Typography;

const ProductCard = ({ product, handleDetail }: IProductCardProps) => {
  return (
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
  )
}
export default ProductCard
