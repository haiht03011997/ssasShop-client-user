import netflix from 'app/entities/netflix/netflix.reducer';
import cart from 'app/entities/cart/cart.reducer';
import orders from 'app/entities/order/order.reducer';
const entitiesReducers = {
  netflix,
  cart,
  orders
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
