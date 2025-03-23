import { Button, Card } from 'antd';
import React from 'react';
import './style.scss';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import parse from "html-react-parser";

interface ProductDescription {
  handleExpandContent: () => void;
  expand: boolean;
  content?: string;
}
const ProductDescription = ({ expand, handleExpandContent, content }: ProductDescription) => {
  return (
    <Card className={`${expand ? 'product-description-full' : 'product-description'}`}>
      <div className="text-start">
        {content && parse(content)}
      </div>
      <div className="btn-expand-content d-flex justify-content-center w-100">
        <Button
          onClick={() => {
            handleExpandContent();
          }}
          size="large"
          className="primary w-25"
          icon={!expand ? <DownOutlined /> : <UpOutlined />}
          iconPosition="end"
        >
          {!expand ? 'Xem Thêm' : 'Thu gọn'}
        </Button>
      </div>
    </Card>
  );
};
export default ProductDescription;
