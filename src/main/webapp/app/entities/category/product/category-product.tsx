import { Col, Descriptions, Pagination, Row, Select, Slider, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import ProductCard from 'app/modules/product/list/product-item';
import { DESC, ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getEntities, reset } from './category-product.reducer';
import _, { max } from 'lodash';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getPaginationState } from 'react-jhipster';

const CategoryProductList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const categoryProductList = useAppSelector(state => state.categoryProduct.entities) as any[];
  const totalItems = useAppSelector(state => state.categoryProduct.totalItems);
  const categoryParam = location.state?.category; // Lấy id từ state
  const name = location.state?.name; // Lấy name từ state

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(location, ITEMS_PER_PAGE, 'lastModifiedDate', DESC), location.search),
  );
  const [maxPrice, setMaxPrice] = useState<number>(undefined);

  useEffect(() => { dispatch(reset()) }, []);

  const calculatedMax = useMemo(() => {
    return _.maxBy(categoryProductList, 'price')?.price ?? undefined;
  }, [categoryProductList]);

  useEffect(() => {
    if (!maxPrice || calculatedMax > maxPrice) {
      setMaxPrice(calculatedMax);
    }
  }, [calculatedMax]);

  useEffect(() => {
    handleGetAllProducts();
  }, [paginationState, name]);

  const handleGetAllProducts = () => {
    dispatch(getEntities({ category: categoryParam, name, min: 0, max: maxPrice, sort: `${paginationState.sort},${paginationState.order}`, page: paginationState.activePage - 1 }));
  }

  const handleViewDetail = (record: any) => {
    navigate(`chi-tiet/${record.slug}`, { state: { id: record.id } });
  };

  const handleBuy = () => {
    console.error('a', 'View detail');
  };

  const handleAfterChange = (value) => {
    dispatch(getEntities({ category: categoryParam, min: value[0], max: value[1], sort: `${paginationState.sort},${paginationState.order}`, page: paginationState.activePage - 1 }));
  };

  const handlePageChange = (page: number) => {
    setPaginationState({
      ...paginationState,
      activePage: page,
    });
  };

  const handleChangeSortByDate = (value: number) => {
    switch (value) {
      case 1:
        setPaginationState({
          ...paginationState,
          order: 'desc',
          sort: 'createdDate',
        });
        break;
      case 2:
        setPaginationState({
          ...paginationState,
          order: 'asc',
          sort: 'createdDate',
        });
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <Row className='gap-3 justify-content-end align-items-center pb-3'>
        <Col md={4} xs={24}>
          <div className='d-flex justify-content-center align-items-center'>
            <Col md={4}>
              <Typography.Text className='fw-bold'>Giá</Typography.Text>
            </Col>
            <Col md={20}>
              <Slider
                range
                min={0}
                max={maxPrice}
                defaultValue={[0, maxPrice]}
                onChangeComplete={handleAfterChange}
              />
            </Col>
          </div>
        </Col>
        <Col md={6} xs={24}>
          <div className='d-flex justify-content-center align-items-center'>
            <Col md={8}>
              <Typography.Text className='fw-bold'>Ngày cập nhật</Typography.Text>
            </Col>
            <Col md={16}>
              <Select size='large' defaultValue={1} className='w-100' options={
                [
                  { value: 1, label: 'Mới nhất' },
                  { value: 2, label: 'Cũ nhất' }
                ]
              } onChange={handleChangeSortByDate} />
            </Col>
          </div>
        </Col>
      </Row>
      <div className="product-container">
        <Row gutter={[16, 16]}>
          {(categoryProductList ?? []).map(product => (
            <ProductCard key={product.id} handleDetail={handleViewDetail} product={product} />
          ))}
        </Row>
        <Pagination
          current={paginationState.activePage}
          showLessItems
          pageSize={paginationState.itemsPerPage}
          showSizeChanger={false}
          total={totalItems}
          className="py-2 d-flex align-items-center justify-content-center"
          onChange={page => handlePageChange(page)}
        />
      </div>
    </div>
  );
};
export default CategoryProductList;
