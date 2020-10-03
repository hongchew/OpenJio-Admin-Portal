// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react';
import AuthService from './Services/AuthService';
import {Redirect, Route} from 'react-router-dom';

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

const PrivateRoute = ({component: Component, ...rest}) => {
  // Add your own authentication on the below line.
  const isLoggedIn = AuthService.isLoggedIn();

  const {userInfo} = props;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: '/admin/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

export default connect(mapStateToProps)(PrivateRoute);
