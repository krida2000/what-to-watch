import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
// import Films from './mocks/films.js';
import {reducer, Operation, ActionCreator} from "./reduсer";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api.js";
import {BrowserRouter} from "react-router-dom";
import history from "./history";


import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

function init() {
  const onUnauthorized = () => {
    store.dispatch(ActionCreator.setAuthorizationRequired(true));
  };

  const api = createAPI(onUnauthorized);

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadFilms());
  store.dispatch(Operation.loadFavorite());
  store.dispatch(Operation.checkAuthorization());

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`));
}

init();
