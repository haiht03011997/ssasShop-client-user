import { DownOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useAppSelector } from 'app/config/store';
import { toSlugKeepDiacritics } from 'app/shared/util/help';
import React from 'react';
import { Link } from 'react-router-dom';
import { staticIconMap } from '../config';
import './style.scss';

const HorizontalMenu = () => {
  const categoriesOption = useAppSelector(state => state.categories.options);

  return <Menu className="menu-horizontal" mode="horizontal" items={[
    {
      key: 'category-horizontal',
      icon: <DownOutlined />,
      label: <Link to={'#'}>Danh mục</Link>,
      children: categoriesOption.map((record, index) => {
        return {
          key: `horizontal-${record.value}`,
          label: <Link to={{ pathname: toSlugKeepDiacritics(record.label) }} state={{ category: record.label }}>{record.label}</Link>,
          icon: staticIconMap[index],
        };
      })
    }
  ]} />;
};
export default HorizontalMenu;
