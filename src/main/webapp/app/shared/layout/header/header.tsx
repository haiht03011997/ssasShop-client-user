import './header.scss';

import React, { useEffect, useState } from 'react';

import { Badge, MenuProps } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { Container } from 'reactstrap';
import { AccountMenu } from '../menus';
import HorizontalMenu from '../sidebar/customer/horizontal/horizontal-menu';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector } from 'app/config/store';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const HeaderComponent = (props: IHeaderProps) => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    if (cartItems) {
      setCartUpdated(true);
      const timeoutId = setTimeout(() => { setCartUpdated(false); }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [cartItems]);

  const onClick: MenuProps['onClick'] = e => {
    console.warn('click ', e);
  };

  const handleSearch = (searchText: string) => {
    console.warn('search:', searchText);
  };

  const openCart = (event) => {
    event.preventDefault();
    navigate("/gio-hang");
  }

  return (
    <Header className="header">
      <Container className="d-flex gap-3 justify-content-center align-items-center">
        <Link className="link-home" to={'/'}>
          Website-demo.com.vn
        </Link>
        <HorizontalMenu />
        <Search className="w-50" size="large" placeholder="Nhập giá trị tìm kiếm" onSearch={handleSearch} enterButton />
        <div className="d-flex justify-content-center gap-3 align-items-center">
          <AccountMenu isAuthenticated={props.isAuthenticated} />
          <Badge count={cartItems.length}><ShoppingCartOutlined onClick={e => { openCart(e) }} className={`cursor-pointer display-6 text-white cart-container ${cartUpdated ? 'cart-updated' : ''}`} /></Badge>
        </div>
      </Container>
    </Header>
  );
};

export default HeaderComponent;
