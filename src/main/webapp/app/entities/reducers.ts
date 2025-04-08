import categoryProduct from 'app/entities/category/product/category-product.reducer';
import cart from 'app/entities/cart/cart.reducer';
import orders from 'app/entities/order/order.reducer';
import categories from 'app/entities/category/category.reducer';

const entitiesReducers = {
  categoryProduct,
  cart,
  orders,
  categories
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
