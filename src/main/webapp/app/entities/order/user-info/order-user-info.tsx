import { Form, Input } from "antd";
import { PhoneOutlined, HomeOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { storeAccount } from "app/modules/account/account.reducer";

const OrderUserInfoForm = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const account = useAppSelector((state) => state.account.info);

  const updateAccount = (values) => {
    dispatch(
      storeAccount({
        ...account,
        ...values,
        fullName: `${values.firstName || ""} ${values.lastName || ""}`.trim(),
      })
    );
  };

  const handleChange = async (changedValues, allValues) => {
    try {
      await form.validateFields();
      updateAccount(allValues);
    } catch (errorInfo) {
      if (errorInfo.errorFields.length > 0)
        return;
      else updateAccount(allValues);
    }
  };

  useEffect(() => {
    form.setFieldsValue(account);
  }, [account, form]);

  return (
    <Form
      layout="vertical"
      form={form} // Thêm form={form}
      onValuesChange={handleChange}
    >
      <h2 style={{ textAlign: "center" }}>Thông tin thanh toán</h2>

      <Form.Item
        label="Địa chỉ email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập địa chỉ email" },
          {
            type: "email",
            message: "Địa chỉ email không hợp lệ",
          },
        ]}
      >
        <Input type="email" placeholder="Nhập địa chỉ email" prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        label="Họ"
        name="firstName"
        rules={[{ required: true, message: "Vui lòng nhập họ" }]}
      >
        <Input placeholder="Nhập họ" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        label="Tên"
        name="lastName"
        rules={[{ required: true, message: "Vui lòng nhập tên" }]}
      >
        <Input placeholder="Nhập tên" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại!" },
          { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" },
        ]}
      >
        <Input placeholder="Nhập số điện thoại" type="tel" prefix={<PhoneOutlined />} />
      </Form.Item>

      <Form.Item label="Địa chỉ" name="address">
        <Input placeholder="Nhập địa chỉ" prefix={<HomeOutlined />} />
      </Form.Item>
    </Form>
  );
};

export default OrderUserInfoForm;
