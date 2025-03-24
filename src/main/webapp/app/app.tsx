import 'app/config/dayjs';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect } from 'react';
import { Card, Container } from 'reactstrap';

import { Layout } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import AppRoutes from 'app/routes';
import Cookies from 'js-cookie';
import { BrowserRouter } from 'react-router-dom';
import FloatButtonComponent from './modules/float-button/float-button';
import ErrorBoundary from './shared/error/error-boundary';
import FooterComponent from './shared/layout/footer/footer';
import HeaderComponent from './shared/layout/header/header';
import TopBarComponent from './shared/layout/header/top-bar';
import { authorized, clearAuth } from './shared/reducers/authentication';
const { Content } = Layout;
const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  const token = Cookies.get('authentication-token');
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const account = useAppSelector(state => state.account.info);

  useEffect(() => {
    if (token) {
      dispatch(authorized());
    } else {
      dispatch(clearAuth());
    }
  }, [token]);

  return (
    <BrowserRouter basename={baseHref}>
      <Layout>
        <div className="app-container">
          <TopBarComponent />
          <HeaderComponent
            isAuthenticated={isAuthenticated} isAdmin={false} ribbonEnv={''} isInProduction={false} isOpenAPIEnabled={false} currentLocale={''} />
          <div className="view-container" id="app-view-container">
            <Container>
              <Content>
                <Card className="p-2">
                  <ErrorBoundary>
                    <AppRoutes />
                  </ErrorBoundary>
                </Card>
              </Content>
            </Container>
            <FooterComponent />
            <FloatButtonComponent />
          </div>
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
