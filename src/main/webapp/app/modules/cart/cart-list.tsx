import { Col, Row } from 'antd';
import { useAppSelector } from 'app/config/store';
import React from 'react';
import CartItem from './cart-item';
import CartSummary from './summary/cart-summary';

const CartList = () => {
  const cartItems = useAppSelector(state => state.cart.cartItems);
  return (
    <Row className="d-flex flex-column list-cart" gutter={24}>
      <div></div>
      {cartItems.length > 0 ? (
        <Row className='d-flex'>
          <Col md={17}>
            <h1 className="text-xl text-center font-bold mb-4">Giỏ hàng của tôi</h1>
            <CartItem cartItems={cartItems} />
          </Col>
          <CartSummary />
        </Row>
      ) : (
        <p className="text-gray-100 display-6 px-3">Giỏ hàng trống</p>
      )}
    </Row>
  );
};

export default CartList;
