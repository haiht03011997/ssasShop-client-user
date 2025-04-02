import { GlobalOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Image, Modal, QRCode, Typography } from "antd";
import React from "react";
import './style.scss';

const { Text } = Typography;
interface IContactProps {
  isModalOpen: boolean,
  handleClose: () => void,
  linkQR?: string,
}
const Contact = ({ isModalOpen, linkQR, handleClose }: IContactProps) => {
  return (
    <Modal
      title={null}
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
      maskClosable={false}
      width={400}
    >
      <div className="text-center contact-zalo">
        {/* Tiêu đề */}
        <Typography.Title level={4}>
          {linkQR ? 'Thông tin khách hàng đã mua' : 'Liên hệ với tôi dễ dàng qua Zalo!'}
        </Typography.Title>

        {/* Ảnh đại diện + QR Code */}
        <div className="d-flex justify-content-center align-items-center gap-2">
          <Image
            src="/path/to/avatar.jpg" // Thay bằng ảnh đại diện
            alt="Avatar"
            width={40}
            style={{ borderRadius: "50%" }}
            preview={false}
          />
          {linkQR
            ?
            <QRCode
              value={linkQR}
              size={200}
              icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
            :
            <Image
              src="/content/images/contact/contact-zalo.jpg" // Thay bằng ảnh QR Code
              alt="QR Code"
              width={200}
            />
          }
        </div>

        {/* Thông tin liên hệ */}
        <div className="mt-3 d-flex align-items-start flex-column">
          <p><PhoneOutlined /> <Text strong> +84326 112 214 </Text></p>
        </div>
      </div>
    </Modal>
  );
}
export default Contact
