import { Badge, Button, Card, Carousel, Col, Image, Typography } from 'antd';
import Countdown from 'antd/es/statistic/Countdown';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getEntities } from './flash-sale.reducer';
import './style.scss';
import Link from 'antd/es/typography/Link';
import dayjs from 'dayjs';
const { Title, Text } = Typography;


const FlashSale = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const products = useAppSelector(context => context.productFlashSale.entities);
  const [endOfTime, setEndOfTime] = useState(null);

  useEffect(() => {
    dispatch(getEntities());
  }, [])

  useEffect(() => {
    if (products && products.length > 0) {
      const endTime = dayjs(products[0]?.endDate).valueOf();
      setEndOfTime(endTime)
    }
  }, [products])

  const handleViewDetail = (record: any) => {
    navigate(`/chi-tiet/${record.slug}`, { state: { id: record.id } });
  };

  return (
    products && products.length > 0 &&
    (<div className="flash-sale-container">
      <div className="flash-sale-header">
        <Title level={3} className="flash-sale-title">
          F <img className="animated-flash" loading="lazy" src="/content/images/flash.svg" /> SALE MỖI NGÀY
        </Title>
        <div className="flash-sale-timer">
          Kết thúc sau:
          <Countdown prefixCls="timer-countdown" value={endOfTime} format="HH:mm:ss" />
        </div>
      </div>
      <Carousel autoplay dots={false} slidesToShow={4}>
        {products ?? [].map(product => (
          <Col key={product.id}>
            <Badge.Ribbon text={`Giảm -${product.discount}%`} color="red" placement='start' className="discount-ribbon">
              <Card
                hoverable
                className="flash-sale-card"
                cover={<Image alt={product.name} src={`${SERVER_API}${product.imageUrl}`} className="flash-sale-image" />}
              >
                <div className="d-flex flex-column gap-3">
                  <Title level={5} className="mx-2 flash-sale-product-title">
                    <Link onClick={() => { handleViewDetail(product) }}>{product.name}</Link>
                  </Title>
                  <div className="price-container">
                    <Text delete className="flash-sale-old-price">
                      {product.price?.toLocaleString()}đ
                    </Text>
                    <Text strong className="flash-sale-new-price">
                      {product.newPrice?.toLocaleString()}đ
                    </Text>
                  </div>
                  <div className="flash-sale-buttons">
                    <Button size="large" onClick={() => { handleViewDetail(product) }} type="default" className="detail-button w-100">
                      Chi tiết
                    </Button>
                    <Button size="large" className="buy-button primary w-100">
                      Mua ngay
                    </Button>
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Carousel>
    </div>)
  );
};

export default FlashSale;
