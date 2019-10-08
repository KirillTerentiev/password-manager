import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import { string, bool } from 'prop-types';

const {Provider, Consumer: AuthConsumer} = React.createContext({
  isAuthorized: false,
});

class AuthProvider extends Component {
  state = {
    isAuthorized: localStorage.getItem('isAuthorized'),
    errorName: false,
    errorPassword: false,
    errorUser: false,
    passwordError: false
  };

  authorize = () => {
    localStorage.setItem('isAuthorized', 'true');
    this.setState({
      isAuthorized: localStorage.getItem('isAuthorized'),
    }, () => {
      this.props.history.push('/dashboard');
    });
  };

  validate = (name, password, checkName, checkPassword, checkUser) => {
    if (name !== checkName || password !== checkPassword || checkUser === null) {
      this.setState({
        errorName: true,
        errorPassword: true,
        errorUser: true
      });
    } else {
      this.setState({
        errorName: false,
        errorPassword: false,
        errorUser: false
      });
    }
  };
  clearErrors = () => {
    this.setState({
      errorName: false,
      errorPassword: false
    });
  };

  render() {
    const {isAuthorized} = this.state;
    return (
      <Provider value={{
        isAuthorized,
        authorize: this.authorize,
        validate: this.validate,
        clearErrors: this.clearErrors,
        state: this.state,
      }}>
        {this.props.children}
      </Provider>
    );
  };
}

export function withAuth(WrappedComponent) {
  return class AuthHOC extends Component {
    render() {
      return (
        <AuthConsumer>
          {contextProps => (
            <WrappedComponent {...contextProps} {...this.props}/>
          )}
        </AuthConsumer>
      );
    };
  };
}

const AuthProviderWithRouter = withRouter(AuthProvider);

export {AuthProviderWithRouter as AuthProvider}

AuthProvider.propTypes ={
  isAuthorized: string,
  errorName: bool,
  errorPassword: bool,
  errorUser: bool,
  passwordError: bool,
};