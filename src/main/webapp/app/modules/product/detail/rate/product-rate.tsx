import { Avatar, Button, Divider, Form, Input, List, Progress, Rate } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import { createReview, getEntities } from './product-review.reducer';
import './style.scss';
import { calculateStats } from 'app/shared/util/help';
interface IProductProps {
  product: any;
}
const ProductRage = ({ product }: IProductProps) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const reviews = useAppSelector(context => context.productReview.entities)
  const account = useAppSelector(context => context.account.info)
  const updateSuccess = useAppSelector(context => context.productReview.updateSuccess)

  const { avgRating, ratingCounts, totalReviews } = calculateStats(reviews);

  useEffect(() => {
    if (updateSuccess) {
      form.resetFields(['content']);
      handleGetPageReviews();
    }
  }, [updateSuccess])

  const handleGetPageReviews = () => {
    dispatch(getEntities(product?.id))
  }

  const onFinish = values => {
    const payload = {
      ...values,
      productId: product?.id,
    };
    dispatch(createReview(payload))
  };

  return (
    <div className="product-review-container">
      <h2 className="product-review-title">Đánh giá sản phẩm</h2>
      <div className="review-summary">
        <div className="review-score">
          <span className="score-value">{avgRating.toFixed(1)}</span>
          <Rate disabled value={avgRating} className="score-stars" />
          <p className="score-text">ĐÁNH GIÁ TRUNG BÌNH</p>
        </div>
        <div className="review-progress">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div key={star} className="progress-item">
              <span className="progress-label">{star}★</span>
              <Progress percent={(ratingCounts[star - 1] / totalReviews) * 100 || 0} showInfo={false} strokeColor="#f5a623" />
              <span className="progress-value">
                {((ratingCounts[star - 1] / totalReviews) * 100 || 0).toFixed(0)}% | {ratingCounts[star - 1]} đánh giá
              </span>
            </div>
          ))}
        </div>
      </div>
      <List
        className="product-review-list"
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(item: any) => (
          <List.Item className="review1-item">
            <List.Item.Meta
              avatar={<Avatar className="review1-avatar">{item?.userName?.charAt(0)}</Avatar>}
              title={
                <div className="product-review-header">
                  <span className="product-review-name">{item?.userName}</span>
                  <Rate disabled value={item.rating} className="product-review-rating" />
                </div>
              }
              description={
                <div className="product-review-comment">
                  {item.content}
                  <span className="product-review-date">{item.date}</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Divider />
      <h3 className="product-review-form-title">Thêm đánh giá của bạn</h3>
      <Form onFinish={onFinish} layout="vertical" className="product-review-form">
        <Form.Item name="userName" initialValue={account?.fullName} label="Tên của bạn" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
          <Input placeholder="Nhập tên của bạn" className="product-review-input" />
        </Form.Item>
        <Form.Item name="rating" label="Đánh giá" rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}>
          <Rate className="product-review-rate" />
        </Form.Item>
        <Form.Item name="content" label="Nhận xét" rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}>
          <Input.TextArea rows={4} placeholder="Nhập nhận xét của bạn" className="product-review-textarea" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="product-review-submit primary w-100">
            Gửi đánh giá
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductRage;
