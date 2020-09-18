import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reduсer";
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {DefRoute} from "../../history";

const Header = (props) => {
  const {avatarUrl} = props;

  return <header className="page-header movie-card__head">
    <div className="logo">
      <Link to={DefRoute.ROOT} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>

    <div className="user-block">
      {avatarUrl === `` ?
        <NavLink to={DefRoute.AUTH}>Sign in</NavLink> :
        <div className="user-block__avatar">
          <img src={`https://htmlacademy-react-2.appspot.com/` + avatarUrl} alt="User avatar" width="63" height="63"/>
        </div>}
    </div>
  </header>;
};

Header.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    avatarUrl: state.avatarUrl,
  });
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
