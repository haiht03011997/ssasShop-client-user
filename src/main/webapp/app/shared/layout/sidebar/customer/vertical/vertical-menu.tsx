import { Menu } from 'antd';
import React from 'react';
import { items } from './config';
import './style.scss';
const VerticalMenu = () => {
  return <Menu className="menu-vertical h-100" mode="vertical" items={items} />;
};
export default VerticalMenu;
