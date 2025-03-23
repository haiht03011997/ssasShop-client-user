import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import LoginModal from 'app/modules/login/login-modal';
import { handleLoginModal } from 'app/shared/reducers/authentication';
import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import { Navigate, useNavigate } from 'react-router';

const accountMenuItemsAuthenticated = [
  {
    key: 'settings',
    icon: 'wrench',
    label: <Translate contentKey="global.menu.account.settings">Settings</Translate>,
  },
  {
    key: 'passwordItem',
    icon: 'lock',
    label: <Translate contentKey="global.menu.account.password">Settings</Translate>,
  },
  {
    key: 'logout',
    icon: 'sign-out-alt',
    label: <Translate contentKey="global.menu.account.logout">Settings</Translate>,
  },
];

const accountMenuItems = [
  {
    key: 'login',
    label: <Translate contentKey="global.menu.account.login">Sign in</Translate>,
  },
  {
    key: 'register',
    label: <Translate contentKey="global.menu.account.register"> Register</Translate>,
  },
];

export const AccountMenu = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);

  const handleMenuClick = (event: any) => {
    const key = event.key;
    switch (key) {
      case 'logout':
        navigate('logout');
        break;
      case 'settings':
        navigate('settings');
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
              <Translate contentKey="global.menu.account.main">Account</Translate>
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
