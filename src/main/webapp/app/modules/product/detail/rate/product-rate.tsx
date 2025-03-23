import React, { useState } from 'react';
import { Form, Input, Button, Rate, List, Avatar, message, Progress, Divider, Card, Table } from 'antd';
import './style.scss';
import { InfoCircleOutlined } from '@ant-design/icons';
const fakeReviews = [
  {
    id: 1,
    name: 'Hoa Hạnh Thi Khanh',
    rating: 5,
    comment: 'Sản phẩm chất lượng, giá rẻ, rất hợp lý cho người dùng.',
    date: '11/03/2025',
  },
  {
    id: 2,
    name: 'Minh Nhật',
    rating: 4,
    comment: 'Sản phẩm chất lượng, giá rẻ, rất hợp lý cho người dùng.',
    date: '02/02/2025',
  },
];

const data = [
  { key: '1', label: 'Tính năng', value: 'Giải trí, xem phim' },
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

const calculateStats = values => {
  const totalReviews = values.length;
  const avgRating = totalReviews > 0 ? values.reduce((acc, cur) => acc + cur.rating, 0) / totalReviews : 0;

  const ratingCounts = [0, 0, 0, 0, 0];
  values.forEach(review => {
    ratingCounts[review.rating - 1] += 1;
  });

  return { avgRating, ratingCounts, totalReviews };
};

const ProductRage = () => {
  const [reviews, setReviews] = useState(fakeReviews);
  const { avgRating, ratingCounts, totalReviews } = calculateStats(reviews);

  const onFinish = values => {
    const newReview = {
      id: reviews.length + 1,
      name: values.name,
      rating: values.rating,
      comment: values.comment,
      date: new Date().toLocaleDateString(),
    };
    setReviews([newReview, ...reviews]);
    message.success('Đánh giá của bạn đã được gửi!');
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
        renderItem={item => (
          <List.Item className="review1-item">
            <List.Item.Meta
              avatar={<Avatar className="review1-avatar">{item.name.charAt(0)}</Avatar>}
              title={
                <div className="product-review-header">
                  <span className="product-review-name">{item.name}</span>
                  <Rate disabled value={item.rating} className="product-review-rating" />
                </div>
              }
              description={
                <div className="product-review-comment">
                  {item.comment}
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
        <Form.Item name="name" label="Tên của bạn" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
          <Input placeholder="Nhập tên của bạn" className="product-review-input" />
        </Form.Item>
        <Form.Item name="rating" label="Đánh giá" rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}>
          <Rate className="product-review-rate" />
        </Form.Item>
        <Form.Item name="comment" label="Nhận xét" rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}>
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
