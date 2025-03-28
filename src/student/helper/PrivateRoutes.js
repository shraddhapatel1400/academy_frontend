import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticatedS } from './index';
import { NotificationManager } from 'react-notifications';

const PrivateRoutes = ({component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticatedS() ? (
          <Component {...props} />
        ) : (
          <div>
          {NotificationManager.warning('Please login to purchase course!!!', 'Warning!', 3000)}
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
          </div>
        )
      }
    />
  );
}

export default PrivateRoutes;