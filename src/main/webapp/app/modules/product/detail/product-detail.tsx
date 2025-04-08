import { InfoCircleOutlined, MessageOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Divider, Image, InputNumber, Rate, Row, Tabs, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { addToCart, listenToStockUpdates, setCart, setLoadingCart } from 'app/entities/cart/cart.reducer';
import { getEntity } from 'app/entities/category/product/category-product.reducer';
import { calculateStats, formatCurrencyVND } from 'app/shared/util/help';
import parse from "html-react-parser";
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../list/product-item';
import { getOtherEntities } from '../product.reducer';
import ProductDescription from './description/product-description';
import ProductRage from './rate/product-rate';
import './style.scss';
import Contact from 'app/modules/contact/contact';
import { getEntities as getReviews } from './rate/product-review.reducer';

const { Title, Text } = Typography;

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id; // Lấy id từ state
  const { slug } = useParams(); // Lấy slug từ URL

  const cartItems = useAppSelector(state => state.cart.cartItems);
  const othersProduct = useAppSelector(state => state.product.entities);
  const reviews = useAppSelector(context => context.productReview.entities)
  // initialize state
  const [expand, collapse] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null)
  const [isOpenModalContact, setOpenModalContact] = useState(false);

  const stats = useMemo(() => {
    return calculateStats(reviews); // return object chứa avgRating, totalReviews
  }, [reviews]);

  const { avgRating, totalReviews } = stats;

  const handleOpenModalContact = (event) => {
    event.preventDefault();
    setOpenModalContact(true);
  }

  const handleExpandContent = () => {
    collapse(!expand);
  };

  const items = [
    {
      key: '1',
      label: 'Mô tả',
      children: <ProductDescription content={detailProduct?.description} expand={expand} handleExpandContent={handleExpandContent} />,
    },
    { key: '2', label: 'Đánh giá', children: <ProductRage product={detailProduct} /> },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(listenToStockUpdates()); // Lắng nghe cập nhật stock từ SignalR
    handleGetDetailProduct();
  }, []);

  useEffect(() => {
    if (detailProduct) {
      handleFetchOtherProducts()
      dispatch(getReviews(detailProduct?.id))
    }
  }, [detailProduct])

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
      // Check if the product already exists in the cart
      const productExists = cartItems.some(item => item.id === product?.id);

      if (productExists) {
        // Update the quantity if the product already exists
        dispatch(setCart(cartItems.map(item => ({
          ...item,
          quantity: item.id === product?.id
            ? item.quantity + product.quantity
            : item.quantity
        }))));
      } else {
        // Add the new product to the cart
        dispatch(setCart([...cartItems, {
          ...product,
          quantity: product.quantity
        }]));
      }
    } else {
      // Add the product if the cart is empty
      dispatch(addToCart({
        ...product,
        quantity: product.quantity
      }));
    }
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

  const handleFetchOtherProducts = () => {
    dispatch(getOtherEntities({ categoryId: detailProduct?.categoryId, id: detailProduct?.id }))
  }

  const handleViewDetail = (record: any) => {
    navigate(`/chi-tiet/${record.slug}`, { state: { id: record.id } });
    window.location.reload(); // Reload lại trang ngay sau khi điều hướng
  };

  return (
    <>
      <div className="product-detail-container d-flex flex-column gap-3">
        <div className="product-card">
          <Row gutter={16}>
            <Col span={10}>
              {handleMaxQuantity() === 0 ?
                <Badge.Ribbon text="Hết hàng" color="gray" placement="start">
                  <Image src={`${SERVER_API}${detailProduct?.imageUrl}`} alt={detailProduct?.name} className="product-image" />
                </Badge.Ribbon>
                : detailProduct?.discount ?
                  <Badge.Ribbon text={`Giảm -${detailProduct?.discount}%`} color="red" placement="start">
                    <Image src={`${SERVER_API}${detailProduct?.imageUrl}`} alt={detailProduct?.name} className="product-image" />
                  </Badge.Ribbon>
                  :
                  <Image src={`${SERVER_API}${detailProduct?.imageUrl}`} alt={detailProduct?.name} className="product-image" />
              }
            </Col>
            <Col span={14} className="d-flex flex-column gap-3">
              <Title className='fw-bold' level={3}>{detailProduct?.name}</Title>
              <div className="d-flex gap-2">
                <Rate allowHalf disabled value={avgRating} />
                <Text type="secondary"> {totalReviews} đánh giá</Text>
              </div>
              <div className="d-flex gap-2">
                <Text className='fw-bold'>Giá:</Text>
                <div className="d-flex gap-2">
                  {detailProduct?.discount &&
                    <Text delete>{formatCurrencyVND(detailProduct?.price)}đ</Text>}
                  <span className="text-danger">{detailProduct?.newPrice ? `${formatCurrencyVND(detailProduct?.newPrice)}đ` : 'Đang cập nhật'}</span>
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Text className='fw-bold'>Số lượng:</Text>
                <InputNumber disabled={handleMaxQuantity() === 0} defaultValue={1} min={1} max={handleMaxQuantity()} onChange={(value) => { handleChangeQuantity(value) }} />
              </div>
              <Row className="d-flex justify-content-between" gutter={16}>
                {/* <Col md={12}>
                  <Button size="large" disabled={handleMaxQuantity() === 0} onClick={e => { handleAddToCart(e, detailProduct) }} className="primary w-100" icon={<ShoppingCartOutlined />}>
                    Thêm Giỏ Hàng
                  </Button>
                </Col>
                <Col md={12}>
                  <Button size="large" disabled={handleMaxQuantity() === 0} className="primary w-100">
                    Mua Ngay
                  </Button>
                </Col> */}
              </Row>
              <Button size="large" onClick={handleOpenModalContact} className="warning w-100" icon={<MessageOutlined />}>
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
              <Divider />
              <Row className='f-lex justify-content-between'>
                <Col>
                  <h6 className='text-lg'>Thể loại</h6>
                </Col>
                <Col>
                  <h6 className='text-lg'>{detailProduct?.categoryName}</h6>
                </Col>
              </Row>
              <Row className='f-lex justify-content-between'>
                <Col>
                  <h6 className='text-lg'> Thời hạn</h6>
                </Col>
                <Col>
                  <h6 className='text-lg'>{detailProduct?.durationName}</h6>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Similar Products */}
        <Title level={4} className="section-title">
          Các sản phẩm tương tự
        </Title>
        <Row gutter={[16, 16]}>
          {othersProduct.map(product => (
            <ProductCard key={product.id} handleDetail={handleViewDetail} product={product} />))}
        </Row>
        <Contact handleClose={() => { setOpenModalContact(false) }} isModalOpen={isOpenModalContact} />
      </div >
    </>
  );
};

export default ProductDetailPage;
