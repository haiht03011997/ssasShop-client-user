import { Table, InputNumber, Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { useAppDispatch } from "app/config/store";
import { removeFromCart, setCart, setLoadingCart } from "app/entities/cart/cart.reducer";

const CartItem = ({ cartItems }) => {
  const dispatch = useAppDispatch();

  // Cập nhật số lượng sản phẩm
  const handleUpdateQuantity = (id, value) => {
    dispatch(setLoadingCart())
    dispatch(setCart(cartItems.map(item => item.id === id ? { ...item, quantity: value } : item)));
  };

  // Xóa sản phẩm
  const handleRemoveItem = (id) => {
    dispatch(setLoadingCart())
    dispatch(removeFromCart(id));
  };

  const columns = [
    {
      title: "SẢN PHẨM",
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (_, record) => (
        <div className="d-flex align-items-center gap-2">
          <Image width={100} src={`${SERVER_API}${record?.imageUrl}`} />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "GIÁ",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => <b>{price.toLocaleString()}đ</b>,
    },
    {
      title: "SỐ LƯỢNG",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
      render: (_, record) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={record.quantity}
          onChange={(value) => handleUpdateQuantity(record.id, value)}
        />
      ),
    },
    {
      title: "TẠM TÍNH",
      key: "total",
      width: 120,
      render: (_, record) => (
        <b>{(record.price * record.quantity).toLocaleString()}đ</b>
      ),
    },
    {
      title: "",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.id)}
        />
      ),
    },
  ];

  return <Table tableLayout="fixed" columns={columns} dataSource={cartItems} rowKey="id" pagination={false} />;
};

export default CartItem;
