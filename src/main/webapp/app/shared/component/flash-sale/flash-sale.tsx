import { Badge, Button, Card, Carousel, Col, Image, Typography } from 'antd';
import Countdown from 'antd/es/statistic/Countdown';
import React from 'react';
import './style.scss';
const { Title, Text } = Typography;

const products = [
  {
    id: 1,
    title: 'Dịch vụ gỡ giới hạn 12 tháng tham gia nhóm Google',
    oldPrice: 50000,
    newPrice: 20000,
    discount: 60,
    img: '/content/images/chat-GPT-plus.webp',
  },
  {
    id: 2,
    title: 'Tăng Tim Tiktok Người Việt Thật',
    oldPrice: 22000,
    newPrice: 830000,
    discount: 65,
    img: '/content/images/chat-GPT-plus.webp',
    featured: true,
  },
  {
    id: 3,
    title: 'Kích hoạt License Michanger Plus 1 Tháng',
    oldPrice: 300000,
    newPrice: 250000,
    discount: 17,
    img: '/content/images/chat-GPT-plus.webp',
  },
  {
    id: 4,
    title: 'Gia Hạn Canva Pro Chính Chủ (1 Tháng)',
    oldPrice: 108333,
    newPrice: 16000,
    discount: 85,
    img: '/content/images/chat-GPT-plus.webp',
    featured: true,
  },
];

const FlashSale = () => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 1 + 1000 * 30;
  return (
    <div className="flash-sale-container">
      <div className="flash-sale-header">
        <Title level={3} className="flash-sale-title">
          F <img className="animated-flash" loading="lazy" src="/content/images/flash.svg" /> SALE MỖI NGÀY
        </Title>
        <div className="flash-sale-timer">
          Kết thúc sau:
          <Countdown prefixCls="timer-countdown" value={deadline} />
        </div>
      </div>
      <Carousel autoplay dots={false} slidesToShow={4}>
        {products.map(product => (
          <Col key={product.id}>
            <Badge.Ribbon text={`Giảm -${product.discount}%`} color="red" className="discount-ribbon">
              <Card
                hoverable
                className="flash-sale-card"
                cover={<Image alt={product.title} src={product.img} className="flash-sale-image" />}
              >
                <div className="d-flex flex-column gap-3">
                  <Title level={5} className="mx-2 flash-sale-product-title">
                    {product.title}
                  </Title>
                  <div className="price-container">
                    <Text delete className="flash-sale-old-price">
                      {product.oldPrice.toLocaleString()}đ
                    </Text>
                    <Text strong className="flash-sale-new-price">
                      {product.newPrice.toLocaleString()}đ
                    </Text>
                  </div>
                  <div className="flash-sale-buttons">
                    <Button type="default" className="detail-button">
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
      </Carousel>
    </div>
  );
};

export default FlashSale;
