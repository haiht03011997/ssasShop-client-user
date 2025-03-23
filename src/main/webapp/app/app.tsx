import 'app/config/dayjs';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Container } from 'reactstrap';

import { Layout } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import AppRoutes from 'app/routes';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './shared/error/error-boundary';
import HeaderComponent from './shared/layout/header/header';
import { authorized, clearAuth, storeAccount } from './shared/reducers/authentication';
import TopBarComponent from './shared/layout/header/top-bar';
const { Content } = Layout;
const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  const token = Cookies.get('authentication-token');
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    if (token) {
      const tokenDecoded: any = jwtDecode(token);
      const accountInfo = {
        name: tokenDecoded.sub,
      };
      dispatch(storeAccount(accountInfo));
      dispatch(authorized());
    } else {
      dispatch(clearAuth());
    }
  }, [token]);

  return (
    <BrowserRouter basename={baseHref}>
      <Layout>
        <div className="app-container">
          <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
          <TopBarComponent />
          <HeaderComponent
            isAuthenticated={isAuthenticated} isAdmin={false} ribbonEnv={''} isInProduction={false} isOpenAPIEnabled={false} currentLocale={''} />
          <div className="view-container" id="app-view-container">
            <Container>
              <Content>
                <Card className="jh-card">
                  <ErrorBoundary>
                    <AppRoutes />
                  </ErrorBoundary>
                </Card>
              </Content>
            </Container>
          </div>
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
