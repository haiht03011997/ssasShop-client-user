import { SendOutlined, ShoppingCartOutlined, TagOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Space, Typography } from "antd";
import { useAppSelector } from 'app/config/store';
import _ from 'lodash';
import React from "react";
import { useNavigate } from 'react-router';
import './style.scss';

const { Title, Text } = Typography;
const CartSummary = () => {
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const navigate = useNavigate()

  const handlePayment = () => {
    navigate("/dat-hang")
  }

  return (
    <Col md={7} className='cart-summary'>
      <Card className='h-100 w-100 cart-title'>
        <Text className='fw-bold d-flex gap-2'> <ShoppingCartOutlined className="cart-icon" />TỔNG CỘNG GIỎ HÀNG</Text>
        <Divider />
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <Text>Tạm tính</Text>
            <Text className='fw-bold'>{_.sumBy(cartItems, (o: any) => (o.price * o.quantity)).toLocaleString()}đ</Text>
          </div>
          <div className='d-flex justify-content-between'>
            <Text>Tổng</Text>
            <Text className='fw-bold'>{_.sumBy(cartItems, (o: any) => (o.price * o.quantity)).toLocaleString()}đ</Text>
          </div>
        </div>
        <Divider />
        <Title level={5} className='d-flex gap-2'><TagOutlined className='discount-icon' />Nhập mã ưu đãi</Title>
        <Space>
          <Input placeholder="Mã ưu đãi" />
          <Button type="default">Áp dụng</Button>
        </Space>
        <Divider />
        <Button onClick={() => { handlePayment() }} className='primary w-100 d-flex gap-2' size="large"><SendOutlined />Đặt hàng</Button>
      </Card>
    </Col>
  )
}
export default CartSummary
