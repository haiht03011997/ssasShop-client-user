export enum CategoryOrder {
  Bank = 1,
  MoMo
}

export const CategoryOrderOptions = Object.entries(CategoryOrder)
  .filter(([key, value]) => typeof value === 'number')
  .map(([key, value]) => ({
    value: value as number,
    label: key,
  }));

export const CategoryOrderNames: Record<CategoryOrder, string> = {
  [CategoryOrder.Bank]: 'Thanh toán ngân hàng',
  [CategoryOrder.MoMo]: 'Thanh toán ví MoMo',
};
