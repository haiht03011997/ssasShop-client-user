import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppComponent from 'app/app';
// import setupAxiosInterceptors from 'app/config/axios-interceptor';
import { loadIcons } from 'app/config/icon-loader';
import getStore from 'app/config/store';
import { clearAuthentication } from 'app/shared/reducers/authentication';

const store = getStore();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
// setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

const render = Component =>
  root.render(
    <Provider store={store}>
      <div>
        <Component />
      </div>
    </Provider>,
  );

render(AppComponent);
