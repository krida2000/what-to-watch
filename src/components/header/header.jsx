import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reduсer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
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
        <a href={`#`}>Sign in</a> :
        <div className="user-block__avatar">
          <img src="https://hollow-art.com/files/bases/2019/04/20190411/29806/ralph-fiennes-grand-budapest-hotel-base-icons-3854129.png" alt="User avatar" width="63" height="63"/>
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
