import './header.scss';

import React from 'react';

import { MenuProps } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { Container } from 'reactstrap';
import { AccountMenu } from '../menus';
import HorizontalMenu from '../sidebar/customer/horizontal/horizontal-menu';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const HeaderComponent = (props: IHeaderProps) => {
  const onClick: MenuProps['onClick'] = e => {
    console.warn('click ', e);
  };

  const handleSearch = (searchText: string) => {
    console.warn('search:', searchText);
  };

  return (
    <Header className="header">
      <Container className="d-flex gap-3 justify-content-center align-items-center">
        <Link className="link-home" to={'/'}>
          Website-demo.com.vn
        </Link>
        <HorizontalMenu />
        <Search className="w-50" size="large" placeholder="Nhập giá trị tìm kiếm" onSearch={handleSearch} enterButton />
        <AccountMenu isAuthenticated={props.isAuthenticated} />
      </Container>
    </Header>
  );
};

export default HeaderComponent;
