import { Button, Card } from 'antd';
import React from 'react';
import './style.scss';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface ProductDescription {
  handleExpandContent: () => void;
  expand: boolean;
}
const ProductDescription = ({ expand, handleExpandContent }: ProductDescription) => {
  return (
    <Card className={`${expand ? 'product-description-full' : 'product-description'}`}>
      <div id="entity-image-top" className="ac-container ac-adaptiveCard">
        <div id="ftwp-container-outer" className="ftwp-in-post ftwp-float-center">
          <div id="ftwp-container" className="ftwp-wrap ftwp-middle-left ftwp-minimize">
            <button type="button" id="ftwp-trigger" className="ftwp-shape-round ftwp-border-bold" title="Bấm vào để phóng to Mục lục">
              <span className="ftwp-trigger-icon ftwp-icon-bullet"></span>
            </button>
            <nav id="ftwp-contents" className="ftwp-shape-round ftwp-border-medium" data-colexp="collapse">
              <header id="ftwp-header">
                <button
                  type="button"
                  id="ftwp-header-minimize"
                  className="ftwp-icon-collapse"
                  aria-labelledby="ftwp-header-title"
                  aria-label="Expand or collapse"
                ></button>
                <h3 id="ftwp-header-title">Nội dung chính</h3>
              </header>
              <ol
                id="ftwp-list"
                className="ftwp-liststyle-decimal ftwp-effect-bounce-to-right ftwp-list-nest ftwp-strong-first ftwp-colexp ftwp-colexp-icon"
              >
                <li className="ftwp-item">
                  <a className="ftwp-anchor" href="#ftoc-heading-1">
                    Mua Netflix Premium Chính Hãng
                  </a>
                </li>
                <li className="ftwp-item">
                  <a className="ftwp-anchor" href="#ftoc-heading-2">
                    Netflix Premium Chính Hãng Là Gì?
                  </a>
                </li>
                <li className="ftwp-item ftwp-has-sub ftwp-expand">
                  <button type="button" aria-label="Expand or collapse" className="ftwp-icon-expand"></button>
                  <a className="ftwp-anchor" href="#ftoc-heading-3">
                    Tại Sao Nên Mua Netflix Premium?
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <h3 id="ftoc-heading-1" className="ftwp-heading ftwp-heading-target">
          <strong>Mua Netflix Premium Chính Hãng Việt Nam – Giá Rẻ, Uy Tín</strong>
        </h3>
        <p>
          🔥 <strong>Bạn đang tìm kiếm tài khoản Netflix Premium chính hãng?</strong> Muataikhoan.vn cung cấp tài khoản với giá rẻ nhất!
        </p>
        <figure className="wp-caption alignnone">
          <img
            className="wp-image-3443 size-large"
            src="https://muataikhoan.vn/wp-content/uploads/2022/07/profile-netflix-1024x482.png"
            alt="Profile Netflix Premium Chính Chủ"
            width="1024"
            height="482"
          />
          <figcaption className="wp-caption-text">Profile Netflix Premium Chính Chủ</figcaption>
        </figure>
        <hr />
        <h2 id="ftoc-heading-2" className="ftwp-heading">
          ✅ Netflix Premium Chính Hãng Là Gì?
        </h2>
        <p>Netflix Premium là gói cao cấp nhất của Netflix, cung cấp trải nghiệm xem phim chất lượng 4K HDR.</p>
        <div className="btn-expand-content d-flex justify-content-center w-100">
          <Button
            onClick={() => {
              handleExpandContent();
            }}
            size="large"
            className="primary w-25"
            icon={!expand ? <DownOutlined /> : <UpOutlined />}
            iconPosition="end"
          >
            {!expand ? 'Xem Thêm' : 'Thu gọn'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default ProductDescription;
