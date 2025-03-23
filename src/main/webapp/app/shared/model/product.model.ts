export interface IProduct {
  id?: string | number;
  name?: string;
  price?: number;
  newPrice?: number;
  discount?: number;
  imageUrl?: string;
  slug?: string;
}

export const defaultValue: Readonly<IProduct> = {};
