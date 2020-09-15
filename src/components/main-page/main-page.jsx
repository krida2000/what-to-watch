import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import history, {DefRoute} from "../../history";
import {Redirect} from "react-router-dom";
import Header from "../header/header.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import MoviesListWrapped from "../movies-list/movies-list";
import {ActionCreator, Operation} from "../../reduсer";
import {connect} from "react-redux";

const MainPage = (props) => {
  const {curFilms, curGenre, genreChangeHandler, allFilms, isAuthorizationRequired} = props;

  if (isAuthorizationRequired) {
    history.push(DefRoute.AUTH);
    return <Redirect to={DefRoute.AUTH} />;
  }

  return <Fragment>
    <Header />
    <div className="page-content">
      <section className="catalog">
        <GenreList movies={allFilms} curGenre={curGenre} genreChangeHandler={genreChangeHandler}/>
        <MoviesListWrapped movies={curFilms}/>
      </section>
    </div>
  </Fragment>;
};

MainPage.propTypes = {
  curFilms: PropTypes.array.isRequired,
  allFilms: PropTypes.array.isRequired,
  curGenre: PropTypes.string.isRequired,
  genreChangeHandler: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    curGenre: state.genre,
    curFilms: state.curFilms,
    allFilms: state.allFilms,
    isAuthorizationRequired: state.isAuthorizationRequired,
    avatarUrl: state.avatarUrl,
  });
};

const mapDispatchToProps = (dispatch) => ({
  genreChangeHandler: (newGenre) => {
    dispatch(ActionCreator.changeGenre(newGenre));
    dispatch(ActionCreator.updateFilms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
