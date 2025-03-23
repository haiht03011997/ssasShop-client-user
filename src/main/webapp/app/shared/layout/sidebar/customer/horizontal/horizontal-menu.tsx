import { Menu } from 'antd';
import React from 'react';
import { items } from './config';
import './style.scss';
const HorizontalMenu = () => {
  return <Menu className="menu-horizontal" mode="horizontal" items={items} />;
};
export default HorizontalMenu;
