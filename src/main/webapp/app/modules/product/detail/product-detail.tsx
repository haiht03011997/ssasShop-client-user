import { InfoCircleOutlined, MessageOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Image, InputNumber, Rate, Row, Table, Tabs, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { addToCart, setCart, setLoadingCart } from 'app/entities/cart/cart.reducer';
import { getEntity } from 'app/entities/netflix/netflix.reducer';
import { formatCurrencyVND } from 'app/shared/util/help';
import parse from "html-react-parser";
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductDescription from './description/product-description';
import ProductRage from './rate/product-rate';
import './style.scss';

const { Title, Text } = Typography;

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const id = location.state?.id; // Lấy id từ state
  const { slug } = useParams(); // Lấy slug từ URL

  const cartItems = useAppSelector(state => state.cart.cartItems);

  // initialize state
  const [expand, collapse] = React.useState(false);
  const [detailProduct, setDetailProduct] = React.useState(null)

  const handleExpandContent = () => {
    collapse(!expand);
  };

  const items = [
    {
      key: '1',
      label: 'Mô tả',
      children: <ProductDescription content={detailProduct?.description} expand={expand} handleExpandContent={handleExpandContent} />,
    },
    { key: '2', label: 'Đánh giá', children: <ProductRage /> },
  ];

  const data = [
    { key: '1', label: 'Thể loại', value: 'Giải trí, xem phim' },
    { key: '2', label: 'Gói đăng ký', value: 'Cấp sẵn 1 User' },
    { key: '3', label: 'Hạn gói', value: '4 Ngày' },
    { key: '4', label: 'Bảo hành', value: 'Trọn gói' },
    { key: '5', label: 'Hỗ trợ', value: 'Tất cả các thiết bị' },
    { key: '6', label: 'Cho phép', value: '1 Thiết bị cùng lúc' },
  ];

  const columns = [
    { dataIndex: 'label', key: 'label', className: 'label-column' },
    { dataIndex: 'value', key: 'value', className: 'value-column' },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleGetDetailProduct();
  }, []);

  const handleGetDetailProduct = () => {
    if (id)
      dispatch(getEntity(id)).then(res => {
        if (res && res.payload) {
          const result = (res.payload as any)
          setDetailProduct({ ...result.data, quantity: 1 })
        }
      })
  }

  const handleAddToCart = (event, product) => {
    dispatch(setLoadingCart())
    event.preventDefault();
    if (cartItems && cartItems.length > 0) {
      dispatch(setCart(cartItems.map(item => ({
        ...item,
        quantity: item.id === detailProduct?.id ? item.quantity + detailProduct.quantity : item.quantity
      }))));
    }

    else
      dispatch(addToCart(product));
  }

  const handleChangeQuantity = (value) => {
    setDetailProduct({ ...detailProduct, quantity: value })
  }

  const handleMaxQuantity = () => {
    if (cartItems && cartItems.length > 0) {
      const productInCart = _.find(cartItems, o => o.id === detailProduct?.id);
      if (productInCart) {
        return detailProduct?.stock - productInCart.quantity
      }
      return detailProduct?.stock
    }
  }

  return (
    <>
      <div className="product-detail-container d-flex flex-column gap-3">
        <div className="product-card">
          <Row gutter={16}>
            <Col span={10}>
              {handleMaxQuantity() === 0 ?
                <Badge.Ribbon text="Hết hàng" color="gray" placement="start">
                  <Image src={`${SERVER_API}${detailProduct?.imageUrl}`} alt="Netflix Premium" className="product-image" />
                </Badge.Ribbon>
                : <Badge.Ribbon text={`Giảm -${46}%`} color="red" placement="start">
                  <Image src={`${SERVER_API}${detailProduct?.imageUrl}`} alt="Netflix Premium" className="product-image" />
                </Badge.Ribbon>
              }
            </Col>
            <Col span={14} className="d-flex flex-column gap-3">
              <Title className='fw-bold' level={3}>{slug}</Title>
              <div className="d-flex gap-2">
                <Rate allowHalf defaultValue={4.5} />
                <Text type="secondary"> 2 đánh giá | Đã bán 1.5k</Text>
              </div>
              <div className="d-flex gap-2">
                <Text className='fw-bold'>Giá:</Text>
                <div className="d-flex gap-2">
                  <Text delete>{formatCurrencyVND(detailProduct?.price)}đ</Text>
                  <span className="text-danger">{detailProduct?.newPrice ? `${formatCurrencyVND(detailProduct?.newPrice)}đ` : 'Đang cập nhật'}</span>
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Text className='fw-bold'>Số lượng:</Text>
                <InputNumber disabled={handleMaxQuantity() === 0} defaultValue={1} min={1} max={handleMaxQuantity()} onChange={(value) => { handleChangeQuantity(value) }} />
              </div>
              <Row className="d-flex justify-content-between" gutter={16}>
                <Col md={12}>
                  <Button size="large" disabled={handleMaxQuantity() === 0} onClick={e => { handleAddToCart(e, detailProduct) }} className="primary w-100" icon={<ShoppingCartOutlined />}>
                    Thêm Giỏ Hàng
                  </Button>
                </Col>
                <Col md={12}>
                  <Button size="large" disabled={handleMaxQuantity() === 0} className="primary w-100">
                    Mua Ngay
                  </Button>
                </Col>
              </Row>
              <Button size="large" className="warning w-100" icon={<MessageOutlined />}>
                Liên Hệ Hỗ Trợ
              </Button>
            </Col>
          </Row>
        </div>

        {detailProduct?.note &&
          <Card prefixCls='note' className="text-start bg-gradient">
            {parse(detailProduct?.note)}
          </Card>
        }

        <Row className="w-100 card-content">
          <Col md={16} className="description-rate-card">
            <Tabs type="card" defaultActiveKey="1" items={items} />
          </Col>
          <Col md={1} />
          <Col md={7}>
            <Card className="product-info-card">
              <h4 className="font-weight-bold">
                <InfoCircleOutlined /> Thông Tin Sản Phẩm
              </h4>
              <Table dataSource={data} columns={columns} pagination={false} showHeader={false} rowClassName={() => 'table-row'} />
            </Card>
          </Col>
        </Row>

        {/* Similar Products */}
        <Title level={4} className="section-title">
          Sản phẩm tương tự
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card hoverable cover={<img src="#" alt="" className="similar-product-image" />}>
              <Title level={5}>Gói Tài Khoản VieON 12 Tháng</Title>
              <Button className="primary">Mua Ngay</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable cover={<img src="#" alt="" className="similar-product-image" />}>
              <Title level={5}>Gói Tài Khoản Galaxy Play</Title>
              <Button className="primary">Mua Ngay</Button>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
};

export default ProductDetailPage;
