import './footer.scss';

import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const FooterComponent = () => (
  <Footer className="footer">
    <div className="section-content">
      <Container className="d-flex flex-column align-items-center py-3">
        <Row className="w-100">
          <Col span={6}>
            <div className="d-flex gap-2 icon-box-text">
              <img src="content/images/transfer.svg" alt="logo" />
              <div className="d-flex flex-column">
                <span>Tài khoản chính hãng</span>
                <span>Uy tín</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="d-flex gap-2 icon-box-text">
              <img src="content/images/transfer.svg" alt="logo" />
              <div className="d-flex flex-column">
                <span>Cập nhật sản phẩm</span>
                <span>Hỗ trợ trọn đời</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="d-flex gap-2 icon-box-text">
              <img src="content/images/transfer.svg" alt="logo" />
              <div className="d-flex flex-column">
                <span>Bổ sung sản phẩm</span>
                <span>Liên tục hàng tháng</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="d-flex gap-2 icon-box-text">
              <img src="content/images/transfer.svg" alt="logo" />
              <div className="d-flex flex-column">
                <span>Đặt hàng thanh toán</span>
                <span>Linh hoạt, bảo mật</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <Container className="d-flex flex-column align-items-center py-2">
      <Row>
        <Col span={8}>
          <img src="content/images/transfer.svg" alt="logo" /> <span>website demo.com.vn</span>
          <p>
            Shop cung cấp tài khoản bản quyền chính hãng giá rẻ - Uy tín tại Việt Nam được đông đảo khách hàng tin dùng từ năm 2021 đến nay.
          </p>
        </Col>
        <Col span={8}>
          <div>
            <p>HƯỚNG DẪN</p>
            <div>Hướng dẫn đăng ký tài khoản</div>
            <div>Hướng dẫn nạp tiền</div>
            <div> Hướng dẫn mua tài khoản</div>
            <div> Chương trình cộng tác viên</div>
          </div>
        </Col>
        <Col span={8}>
          <div>
            <p>VỀ CHÚNG TÔi</p>
            <div>Giới thiệu</div>
            <div>Chính sách bảo mật</div>
            <div>Điều khoản và điều kiện</div>
          </div>
        </Col>
      </Row>
      <div>Copyright © 2025 Bản quyền thuộc về HaiHT</div>
    </Container>
  </Footer>
);

export default FooterComponent;
