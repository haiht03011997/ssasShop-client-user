import { Button, Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useAppDispatch } from 'app/config/store';
import { auth } from 'app/shared/reducers/authentication';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const LoginModal = ({ showModal, handleClose }: ILoginModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = values => {
    const { username, password, rememberMe = false } = values;
    dispatch(auth(username, password, rememberMe));
  };

  const handleForgotPassWord = () => {
    onClose();
    navigate('/account/reset/request');
  };

  const handleRegister = () => {
    onClose();
    navigate('/account/register');
  };

  const onClose = () => {
    handleClose();
  };

  return (
    <Modal footer={null} open={showModal} maskClosable onCancel={onClose}>
      <Form size="large" form={form} onFinish={handleLogin} layout="vertical">
        <Title level={3}>Đăng nhập</Title>
        <Row>
          <Col md={24}>
            <Form.Item rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]} label="Tên đăng nhập" name="username">
              <Input prefix={<UserOutlined />} type="email" className="w-100" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <Form.Item rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]} label="Mật khẩu" name="password">
              <Input.Password prefix={<LockOutlined />} className="w-100" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Item name="rememberMe" valuePropName="checked">
              <Checkbox>Ghi nhớ</Checkbox>
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item>
              <span
                onClick={() => {
                  handleForgotPassWord();
                }}
                className="forgot"
              >
                Quên mật khẩu?
              </span>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row className="action-form" justify="end">
            <Col md={24}>
              <Button className="w-100 primary" htmlType="submit">
                Đăng nhập
              </Button>
              <span>
                Bạn chưa có tài khoản?{' '}
                <Link
                  onClick={() => {
                    handleRegister();
                  }}
                  to={'#'}
                >
                  Đăng ký
                </Link>
              </span>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
