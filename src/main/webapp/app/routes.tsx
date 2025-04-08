import EntitiesRoutes from 'app/entities/routes';
import React from 'react';
import { Route } from 'react-router-dom';
import { AUTHORITIES } from './config/constants';
import Account from './modules/account';
import PasswordResetFinish from './modules/account/password-reset/finish/password-reset-finish';
import PasswordResetInit from './modules/account/password-reset/init/reset-password';
import Home from './modules/home/home';
import Logout from './modules/login/logout';
import PrivateRoute from './shared/auth/private-route';
import ErrorBoundaryRoutes from './shared/error/error-boundary-routes';
import PageNotFound from './shared/error/page-not-found';

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route
          path="/"
          index
          element={
            <Home />
          }
        />
        <Route path="dang-xuat" element={<Logout />} />
        <Route path="tai-khoan">
          <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <EntitiesRoutes />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
