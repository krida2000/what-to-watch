import React, {Fragment, PureComponent} from 'react';
import PropTypes from "prop-types";
import history, {DefRoute} from "../../history";
import {Redirect, withRouter} from "react-router-dom";
import Header from "../header/header.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import MoviesListWrapped from "../movies-list/movies-list";
import {ActionCreator, Operation} from "../../reduсer";
import {connect} from "react-redux";

class MainPage extends PureComponent {
  render() {
    const {favoriteFilms, isAuthorizationRequired} = this.props;

    if (isAuthorizationRequired) {
      return <Redirect to={DefRoute.AUTH}/>;
    }

    return <Fragment>
      <Header/>
      <div className="page-content">
        <section className="catalog">
          <MoviesListWrapped movies={favoriteFilms}/>
        </section>
      </div>
    </Fragment>;
  }
}

MainPage.propTypes = {
  favoriteFilms: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    favoriteFilms: state.favoriteFilms,
    isAuthorizationRequired: state.isAuthorizationRequired,
  });
};


export default connect(mapStateToProps)(MainPage);
