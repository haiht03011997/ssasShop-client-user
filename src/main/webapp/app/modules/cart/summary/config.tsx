import React from "react";
import { BankOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Flex } from "antd";
import { CategoryOrderNames, CategoryOrderOptions } from "app/shared/model/enum/category-order.enum";

export const CategoryOrder = CategoryOrderOptions.map(x => ({
  ...x,
  label: <Flex gap="small" justify="center" align="center">
    {x.value === 1 ? <BankOutlined /> : <CreditCardOutlined />}
    {CategoryOrderNames[x.value]}
  </Flex>
}))
