import { Card, Col, Row } from 'antd';
import React from 'react';
import CartOrder from '../../modules/cart/summary/cart-order';
import OrderUserInfoForm from './user-info/order-user-info';

const OrderDetail = () => {

  return (
    <Row className="d-flex w-100">
      <Col md={11}>
        <Card>
          <OrderUserInfoForm />
        </Card>
      </Col>
      <Col md={1} />
      <Col md={12}>
        <CartOrder />
      </Col>
    </Row>
  );
};

export default OrderDetail;
