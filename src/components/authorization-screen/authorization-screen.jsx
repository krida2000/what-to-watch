import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from 'react';
import {Redirect} from "react-router-dom";
import {ActionCreator, Operation} from "../../reduсer";
import {connect} from "react-redux";

class AuthorizationScreen extends PureComponent {
  render() {
    const {onAuthorization, isAuthorizationRequired} = this.props;

    let login = React.createRef();
    let pass = React.createRef();

    if (isAuthorizationRequired === undefined) {
      return null;
    }

    if (!isAuthorizationRequired) {
      return <Redirect to={`/`}/>;
    }

    return (
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" ref={login}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" ref={pass}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit"
              onClick={(evt) => {
                evt.preventDefault();
                const log = login.current.value;
                const password = pass.current.value;
                onAuthorization({login: log, password});
              }}>Sign in</button>
          </div>
        </form>
      </div>
    );
  }
}

AuthorizationScreen.propTypes = {
  onAuthorization: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    isAuthorizationRequired: state.isAuthorizationRequired,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onAuthorization: (authData) => {
    dispatch(Operation.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen);
