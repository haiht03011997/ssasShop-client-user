import { DownOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import LoginModal from 'app/modules/login/login-modal';
import { handleLoginModal } from 'app/shared/reducers/authentication';
import React from 'react';
import { useNavigate } from 'react-router';

const accountMenuItemsAuthenticated = [
  {
    key: 'passwordItem',
    icon: <LockOutlined />,
    label: 'Cập nhật mật khẩu',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Đăng xuất',
  },
];

export const AccountMenu = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);
  const account = useAppSelector(state => state.account.info);

  const handleMenuClick = (event: any) => {
    const key = event.key;
    switch (key) {
      case 'logout':
        navigate('logout');
        break;
      case 'passwordItem':
        navigate('password');
        break;
      default:
        break;
    }
  };

  const handleOpenModalLogin = event => {
    event.preventDefault();
    dispatch(handleLoginModal(true));
  };

  const handleCloseModal = () => {
    dispatch(handleLoginModal(false));
  };

  return (
    <div className="d-flex justify-content-center">
      {!isAuthenticated ? (
        <span onClick={handleOpenModalLogin} className="text-white font-weight-bold cursor-pointer">
          Đăng Nhập
        </span>
      ) : (
        <Dropdown menu={{ items: accountMenuItemsAuthenticated, onClick: handleMenuClick }} trigger={['click']}>
          <Space>
            <span
              className="text-white"
              onClick={e => {
                e.preventDefault();
              }}
            >
              {account?.fullName}
              <DownOutlined />
            </span>
          </Space>
        </Dropdown>
      )}
      <LoginModal showModal={showModalLogin} handleClose={handleCloseModal} />
    </div>
  );
};

export default AccountMenu;
