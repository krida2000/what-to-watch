import React from 'react';
import {PureComponent} from 'react';
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page";
import AuthorizationScreen from "../authorization-screen/authorization-screen";
import WatchMoviePage from "../watch-movie-page/watch-movie-page";
import history, {DefRoute} from '../../history';
import {Switch, Route, Redirect, BrowserRouter, Router} from "react-router-dom";

import {Operation} from "../../reduсer";
import {connect} from "react-redux";
import MainPage from "../main-page/main-page";

class App extends PureComponent {
  render() {
    return <>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path={DefRoute.ROOT}>
            <MainPage/>
          </Route>
          <Route exact path={DefRoute.AUTH}>
            <AuthorizationScreen/>
          </Route>
          <Route exact path={`${DefRoute.MOVIE_PAGE}:id`} component={MoviePage}/>
          <Route exact path={`${DefRoute.MOVIE_PAGE}:id/watch`}>
            <WatchMoviePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>;
  }
}

App.propTypes = {
  checkAuthorization: PropTypes.func.isRequired,
  loadMovies: PropTypes.func.isRequired,
  allFilms: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    allFilms: state.allFilms,
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadMovies: () => dispatch(Operation.loadFilms()),
  checkAuthorization: () => dispatch(Operation.checkAuthorization())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
