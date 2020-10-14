import {createSelector} from 'reselect';

const genreFromState = (state) => state.genre;
const filmsFromState = (state) => state.allFilms;

const genreSelector = createSelector(
    genreFromState,
    filmsFromState,
    (genre, films) => films.filter((it) => genre === `all` || it.genre === genre));

// const getFilmsWithGenre = (genre, films) => {
//   return films.filter((it) => genre === `all` || it.genre === genre);
// };

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
      });
  },

  loadFavorite: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorite(response.data));
      });
  },

  changeMovieStatusFavorite: (movieId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/${status}`)
      .then(() => {
        dispatch(ActionCreator.changeMovieStatusFavorite(movieId, Boolean(status)));
        Operation.loadFavorite();
      })
      .catch((err) => {
        throw err;
      });
  },

  checkAuthorization: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((data) => {
        console.log(data);
        dispatch(ActionCreator.setAuthorizationRequired(false));
        dispatch(ActionCreator.setUserData(data.data));
      })
      .catch((err) => {
        dispatch(ActionCreator.setAuthorizationRequired(true));
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {email: authData.login, password: authData.password})
      .then((data) => {
        dispatch(ActionCreator.setAuthorizationRequired(false));
        dispatch(ActionCreator.setUserData(data.data));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const ActionCreator = {
  changeGenre: (genre) => {
    return {
      type: `CHANGE_GENRE`,
      payload: genre,
    };
  },

  changeCurrentFilm: (id) => {
    return {
      type: `CHANGE_CURRENT_FILM`,
      payload: id,
    };
  },

  updateFilms: () => {
    return {
      type: `UPDATE_FILMS`,
    };
  },

  loadFilms: (films) => {
    console.log(films);
    return {
      type: `LOAD_FILMS`,
      payload: films,
    };
  },

  loadFavorite: (films) => {
    return {
      type: `LOAD_FAVORITE`,
      payload: films,
    };
  },

  changeMovieStatusFavorite: (movieId, isFavorite) => {
    return {
      type: `CHANGE_MOVIE_STATUS_FAVORITE`,
      payload: {movieId, isFavorite},
    };
  },

  setAuthorizationRequired: (isAuthorizationRequired) => {
    return {
      type: `UPDATE_AUTHORIZATION`,
      payload: isAuthorizationRequired,
    };
  },

  setUserData: (data) => {
    return {
      type: `SET_USER_DATA`,
      payload: data,
    };
  },

  reset: () => {
    return {
      type: `RESET`,
    };
  }
};

const initialState = {
  genre: `all`,
  curFilms: [],
  curFilmIndex: -1,
  allFilms: [],
  favoriteFilms: [],
  isAuthorizationRequired: undefined,
  avatarUrl: ``,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_GENRE`: return Object.assign({}, state, {
      genre: action.payload,
    });

    case `CHANGE_CURRENT_FILM`: return Object.assign({}, state, {
      curFilmIndex: action.payload,
    });

    case `UPDATE_FILMS`: return Object.assign({}, state, {
      curFilms: genreSelector(state),
    });

    case `LOAD_FILMS`: return Object.assign({}, state, {
      curFilms: action.payload,
      allFilms: action.payload,
    });

    case `LOAD_FAVORITE`: return Object.assign({}, state, {
      favoriteFilms: action.payload,
    });
    // {movieId, isFavorite}
    case `CHANGE_MOVIE_STATUS_FAVORITE`: return Object.assign({}, state, {
      allFilms: state.allFilms.map((it) => {
        if (it.id === action.payload.movieId) {
          it.is_favorite = action.payload.isFavorite;
        }
        return it;
      }),
    });

    case `UPDATE_AUTHORIZATION`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });

    case `SET_USER_DATA`: return Object.assign({}, state, {
      avatarUrl: action.payload.avatar_url,
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};

export {reducer, ActionCreator, Operation};
