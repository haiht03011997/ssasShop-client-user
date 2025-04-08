import { Menu } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getAllEntities as getCategoryProduct } from 'app/entities/category/category.reducer';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { staticIconMap } from '../config';
import './style.scss';
import { toSlugKeepDiacritics } from 'app/shared/util/help';
const VerticalMenu = () => {
  const dispatch = useAppDispatch();
  const categoriesOption = useAppSelector(state => state.categories.options);

  useEffect(() => {
    dispatch(getCategoryProduct())
  }, []);

  return <Menu className="menu-vertical h-100" mode="vertical" items={categoriesOption.map((record, index) => ({
    ...record,
    key: `vertical-${record.value}`,
    label: <Link to={{ pathname: toSlugKeepDiacritics(record.label) }} state={{ category: record.label }}>{record.label}</Link>,
    icon: staticIconMap[index],
  }))} />;
};
export default VerticalMenu;
