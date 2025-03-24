import { Button, Card, Col, Descriptions, Divider, Image, QRCode, Row, Space, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import React from 'react';
import CartOrder from '../../modules/cart/summary/cart-order';
import { useAppSelector } from 'app/config/store';
import _ from 'lodash';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CategoryOrderNames } from 'app/shared/model/enum/category-order.enum';
import { userPaymentInfo } from './config';
import Countdown from 'antd/es/statistic/Countdown';

const { Text, Title } = Typography;

const PaymentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const account = useAppSelector((state) => state.account.info);
  const categoryOrder = location?.state.categoryOrder; // Lấy id từ state


  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    // Optionally, provide user feedback (e.g., a message or notification)
  };

  return (
    <Row className="d-flex w-100">
      <Card className='w-100'>
        <div className="d-flex align-items-center flex-column">
          <Text type="warning">Đơn hàng sẽ hết hạn sau</Text>
          <Countdown value={account?.deadline} format="mm:ss"
            onFinish={() => navigate("/gio-hang")} />
        </div>

        <Divider />

        <Row >
          <Col md={12}>
            <Card title="Thông tin thanh toán">
              <Space direction="vertical" size="middle">
                <Space className='d-flex gap-2'>
                  <Image preview={false} src='/content/images/logo-bidv.png' alt='logo-bidv' width={100} loading='lazy' />
                  <Text>Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam</Text>
                </Space>
                <Text strong>Chủ tài khoản:</Text>
                <Text>HOÀNG THANH HẢI</Text>
                <Text strong>Số tài khoản:</Text>
                <Space className='d-flex gap-2 justify-content-between'>
                  <Text>{userPaymentInfo.accountNumber}</Text>
                  <Button size="small" icon={<CopyOutlined />} onClick={() => handleCopy(userPaymentInfo.accountNumber)}>Sao chép</Button>
                </Space>
                <Text strong>Số tiền:</Text>
                <Space className='d-flex justify-content-between gap-2'>
                  <Text>{_.sumBy(cartItems, (o: any) => (o.price * o.quantity)).toLocaleString()}</Text>
                  <Button size="small" icon={<CopyOutlined />} onClick={() => handleCopy(_.sumBy(cartItems, (o: any) => (o.price * o.quantity)))}>Sao chép</Button>
                </Space>
                <Text strong>Nội dung đơn hàng:</Text>
                <Space className='d-flex gap-2 justify-content-between'>
                  <Text>{account?.orderCode}</Text>
                  <Button size="small" icon={<CopyOutlined />} onClick={() => handleCopy(account?.orderCode)}>Sao chép</Button>
                </Space>
                <Text type="danger">① Nhập chính xác nội dung chuyển tiền: {account?.orderCode}</Text>
              </Space>
            </Card>
          </Col>

          <Col md={12} className='d-flex flex-column gap-3'>
            <Card title="Chuyển khoản hoặc mở App để quét mã thanh toán" className="qr-code-card">
              <div className="qr-code-container d-flex justify-content-center align-items-center flex-column">
                <QRCode value="Your payment QR Code here" />
                <Text>Sử dụng app ngân hàng để quét mã</Text>
              </div>
              <div className='d-flex flex-column'>
                <Text type="secondary">Đơn hàng sẽ được xử lý tự động ngay sau khi thanh toán hoàn tất</Text>
                <Text type="secondary">*** Đang chờ bạn quét ...</Text>
              </div>
            </Card>
            <Card title="Thông tin người mua hàng">
              <Space className='w-100' direction="vertical" size="middle">
                <Row className='d-flex justify-content-between'>
                  <Col md={12} className='d-flex gap-3'>
                    <Text strong>Email:</Text>
                    <Text>{account?.email}</Text>
                  </Col>
                  <Col md={12} className='d-flex gap-3'>
                    <Text strong>Họ và tên:</Text>
                    <Text>{account?.firstName}{' '}{account?.lastName}</Text>
                  </Col>
                </Row>
                <Row className='d-flex justify-content-between w-100'>
                  <Col md={12} className='d-flex gap-3'>
                    <Text strong>Số điện thoại:</Text>
                    <Text>{account?.phone}</Text>
                  </Col>
                  <Col md={12} className='d-flex gap-3'>
                    <Text strong>Địa chỉ:</Text>
                    <Text>{account?.address}</Text>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
      <Col md={12}>
        <Card className='h-100 w-100 cart-title'>
          <Text className='fw-bold d-flex gap-2'> Chi tiết đơn hàng</Text>
          <Divider />
          {cartItems.map(item => {
            return <div key={item.id} className='d-flex flex-column'>
              <div className='d-flex justify-content-between'>
                <Text className='d-flex gap-2'><Text>{item.name}</Text> x{item.quantity}</Text>
                <Text className='fw-bold'>{(item.price * item.quantity).toLocaleString()}đ</Text>
              </div>
              <Divider />
            </div>
          })}
          <div className='d-flex flex-column'>
            <Row className='d-flex justify-content-between'>
              <Text>Tạm tính</Text>
              <Text className='fw-bold'>{_.sumBy(cartItems, (o: any) => (o.price * o.quantity)).toLocaleString()}đ</Text>
            </Row>
            <Row className='d-flex justify-content-between'>
              <Text>Phương thức thanh toán</Text>
              <Text className='fw-bold'>{CategoryOrderNames[categoryOrder]}</Text>
            </Row>
            <Row className='d-flex justify-content-between'>
              <Text>Tổng</Text>
              <Text className='fw-bold'>{_.sumBy(cartItems, (o: any) => (o.price * o.quantity)).toLocaleString()}đ</Text>
            </Row>
          </div>
        </Card>
      </Col>
    </Row >
  );
};

export default PaymentDetail;
