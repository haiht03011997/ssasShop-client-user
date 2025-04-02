import { DownOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import LoginModal from 'app/modules/login/login-modal';
import { handleLoginModal } from 'app/shared/reducers/authentication';
import React, { useEffect } from 'react';
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
  const loginSuccess = useAppSelector(context => context.authentication.loginSuccess)
  const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);
  const account = useAppSelector(state => state.account.info);

  useEffect(() => {
    if (loginSuccess)
      navigate("/")
  }, [loginSuccess])

  const handleMenuClick = (event: any) => {
    const key = event.key;
    switch (key) {
      case 'logout':
        navigate('/dang-xuat');
        break;
      case 'passwordItem':
        navigate('/tai-khoan/cap-nhat-mat-khau');
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
