import { Col, Row, Typography } from 'antd';
import './footer.scss';

import { Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Contact from 'app/modules/contact/contact';

const { Text } = Typography;

const FooterComponent = () => {
  const [isOpenModalContact, setOpenModalContact] = useState(false);
  const [urlQR, setUrlQR] = useState(null);

  const handleOpenModalContact = (event) => {
    event.preventDefault();
    setUrlQR(event.target.title)
    setOpenModalContact(true);
  }

  const handleAllServices = (event) => {
    event.preventDefault();
    window.open("https://docs.google.com/spreadsheets/d/1t4xotFBk7eql843XTg72Gb1XXhK5cDqj3lsDTsleKhE/edit?usp=drive_link", "")
  }

  return (
    <Footer className="footer">
      <div className="section-content">
        <Container className="d-flex flex-column align-items-center py-3">
          <Row className="w-100 d-flex justify-content-around">
            <Col>
              <div className="d-flex gap-2 icon-box-text">
                <img src="content/images/transfer.svg" alt="logo" />
                <div className="d-flex flex-column">
                  <span>Tài khoản chính hãng</span>
                  <span>Uy tín</span>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex gap-2 icon-box-text">
                <img src="content/images/transfer.svg" alt="logo" />
                <div className="d-flex flex-column">
                  <span>Cập nhật sản phẩm</span>
                  <span>Hỗ trợ trọn đời</span>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex gap-2 icon-box-text">
                <img src="content/images/transfer.svg" alt="logo" />
                <div className="d-flex flex-column">
                  <span>Bổ sung sản phẩm</span>
                  <span>Liên tục hàng tháng</span>
                </div>
              </div>
            </Col>
            <Col>
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
            <img src="content/images/transfer.svg" alt="logo" /> <span>taikhoanai.shop</span>
            <p>
              Shop cung cấp tài khoản bản quyền chính hãng giá rẻ - Uy tín tại Việt Nam được đông đảo khách hàng tin dùng từ năm 2021 đến nay.
            </p>
          </Col>
          <Col md={1} />
          <Col span={7}>
            <h4>HƯỚNG DẪN</h4>
            <div className="d-flex align-items-start flex-column">
              <u className='text-white cursor-pointer' onClick={handleOpenModalContact}>Tư vấn các gói dịch vụ</u>
              <u className='text-white cursor-pointer' onClick={handleOpenModalContact}>Cách mua tài khoản</u>
              <u className='text-white cursor-pointer' onClick={handleOpenModalContact}>Cách bảo hành dịch vụ</u>
            </div>
          </Col>
          <Col span={8}>
            <h4>VỀ CHÚNG TÔi</h4>
            <div className="d-flex align-items-start flex-column">
              <u className='text-white cursor-pointer' onClick={handleAllServices}>Tất cả các loại dịch vụ</u>
              <u className='text-white cursor-pointer' title='https://zalo.me/g/njkjet814' onClick={handleOpenModalContact}>Nhóm khách hàng đã mua</u>
              <u className='text-white text-underline cursor-pointer' onClick={handleOpenModalContact}>Chương trình cộng tác viên, đại lý</u>
            </div>
          </Col>
        </Row>
        <div>Copyright © 2025 Bản quyền thuộc về HaiHT</div>
      </Container>
      <Contact linkQR={urlQR} handleClose={() => { setOpenModalContact(false) }} isModalOpen={isOpenModalContact} />
    </Footer >
  );
}

export default FooterComponent;
