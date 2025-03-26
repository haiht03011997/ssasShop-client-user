import netflix from 'app/entities/netflix/netflix.reducer';
import youtube from 'app/entities/youtube/youtube.reducer';
import cart from 'app/entities/cart/cart.reducer';
import orders from 'app/entities/order/order.reducer';
const entitiesReducers = {
  netflix,
  youtube,
  cart,
  orders
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
