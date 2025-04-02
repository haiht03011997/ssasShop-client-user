import { Badge, Button, Card, Col, Image, Typography } from "antd";
import React from "react";
import './style.scss';
import Link from "antd/es/typography/Link";

interface IProductCardProps {
  product: any;
  handleDetail: (product: any) => void;
}

const { Title, Text } = Typography;

const ProductCard = ({ product, handleDetail }: IProductCardProps) => {

  return (
    <Col md={6}>
      {product.discount ?
        <Badge.Ribbon text={`Giảm -${product.discount}% `} color="red" placement="start" className="discount-ribbon">
          <Card hoverable className="product-card" cover={<Image alt={product.name} src={`${SERVER_API}${product.imageUrl}`} className="product-image" />}>
            <div className="d-flex flex-column gap-3">
              <Title level={5} className="mx-2 product-product-title">
                <Link onClick={() => {
                  handleDetail(product);
                }}>
                  {product.name}
                </Link>
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
                  size="large"
                  type="default"
                  onClick={() => {
                    handleDetail(product);
                  }}
                  className="detail-button w-100"
                >
                  Chi tiết
                </Button>
                <Button size="large" className="buy-button primary w-100">
                  Mua ngay
                </Button>
              </div>
            </div>
          </Card>
        </Badge.Ribbon> :
        <Card hoverable className="product-card" cover={<Image alt={product.name} src={`${SERVER_API}${product.imageUrl}`} className="product-image" />}>
          <div className="d-flex flex-column gap-3">
            <Title level={5} className="mx-2 product-product-title">
              <Link onClick={() => {
                handleDetail(product);
              }}>
                {product.name}
              </Link>
            </Title>
            <div className="price-container">
              <Text strong className="product-new-price">
                {product?.newPrice.toLocaleString()}đ
              </Text>
            </div>
            <div className="product-buttons">
              <Button
                size="large"
                type="default"
                onClick={() => {
                  handleDetail(product);
                }}
                className="detail-button w-100"
              >
                Chi tiết
              </Button>
              <Button size="large" className="buy-button primary w-100">
                Mua ngay
              </Button>
            </div>
          </div>
        </Card>}
    </Col>
  )
}
export default ProductCard
