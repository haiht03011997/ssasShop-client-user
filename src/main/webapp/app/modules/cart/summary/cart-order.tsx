import { CreditCardOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Radio, Typography } from "antd";
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createOrder } from 'app/entities/order/order.reducer';
import { storeAccount } from 'app/modules/account/account.reducer';
import _ from 'lodash';
import React, { useState } from "react";
import { useNavigate } from 'react-router';
import { CategoryOrder } from './config';
import './style.scss';



const { Title, Text } = Typography;
const CartOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const account = useAppSelector(state => state.account.info);

  const [categoryOrder, setCategoryOrder] = useState(1)

  const handleChangeCategoryOrder = e => {
    setCategoryOrder(e.target.value)
  }

  const handleOrderOrder = () => {
    if (!account.email || !account.phone || !account.firstName || !account.lastName) return;
    const payload = {
      ...account,
      totalAmount: _.sumBy(cartItems, (o: any) => (o.price * o.quantity)),
      orderItems: cartItems.map(prd => ({
        productId: prd.id,
        price: prd.price,
        quantity: prd.quantity
      }))
    }
    dispatch(createOrder(payload)).then(res => {
      if (res && res.payload) {
        const result = res.payload as any;
        const deadline = Date.now() + 10 * 60 * 1000; // 10 phút từ thời điểm hiện tại
        dispatch(storeAccount({ ...account, orderCode: result.data, deadline }))
        navigate("/thanh-toan", {
          state: {
            categoryOrder
          }
        })
      }
    })
  }

  return (
    <Col className='cart-summary w-100'>
      <Card className='h-100 w-100 cart-title'>
        <Text className='fw-bold d-flex gap-2'> <ShoppingOutlined className="cart-icon" />ĐƠN HÀNG CỦA BẠN</Text>
        <Divider />
        {cartItems.map(item => {
          return <div key={item.id} className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <Text className='d-flex gap-2'>{item.name} x{item.quantity}</Text>
              <Text className='fw-bold'>{(item.price * item.quantity).toLocaleString()}đ</Text>
            </div>
            <Divider />
          </div>
        })}
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
        <Radio.Group
          className='d-flex flex-column'
          value={categoryOrder}
          options={CategoryOrder} onChange={(e) => { handleChangeCategoryOrder(e) }} />
        <Divider />
        <Button className='primary w-100 d-flex gap-2' size="large" onClick={() => { handleOrderOrder() }}><CreditCardOutlined />Tiến hành thanh toán</Button>
      </Card>
    </Col>
  )
}
export default CartOrder
