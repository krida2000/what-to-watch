import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reduсer";
import {DefRoute} from "../../history";
import {Link, NavLink} from "react-router-dom";
import Header from "../header/header.jsx";
import {withRouter} from "react-router-dom";
import MoviesListWrapped from "../movies-list/movies-list";

class MoviePage extends PureComponent {
  render() {
    const {allFilms, history, changeMovieStatusFavorite} = this.props;
    const id = this.props.match.params.id;
    const film = allFilms.find((el) => +el.id === +id);

    const similarFilms = allFilms.filter((el) => (el.genre === film.genre && el.id !== film.id));

    if (!film) {
      return <Header />;
    }

    const {is_favorite} = film;

    return <>
        <section className="movie-card movie-card--full" style={{backgroundColor: film.background_color}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={`${film ? film.background_image : ``}`} alt="The Grand Budapest Hotel"/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{film.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{film.genre}</span>
                  <span className="movie-card__year">{film.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button"
                    onClick={() => history.push(DefRoute.MOVIE_PAGE + id + `/watch`)}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button"
                    onClick={() => changeMovieStatusFavorite(film.id, Number(!is_favorite))}>
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={is_favorite ? `#in-list` : `#add`} />
                    </svg>
                    <span>My list</span>
                  </button>
                  {/* <a href="add-review.html" className="btn movie-card__button">Add review</a>*/}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={`${film.poster_image}`} alt="The Grand Budapest Hotel poster" width="218"
                  height="327"/>
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    {/* <li className="movie-nav__item movie-nav__item--active">*/}
                    {/*  <a href="#" className="movie-nav__link">Overview</a>*/}
                    {/* </li>*/}
                    {/* <li className="movie-nav__item">*/}
                    {/*  <a href="#" className="movie-nav__link">Details</a>*/}
                    {/* </li>*/}
                    {/* <li className="movie-nav__item">*/}
                    {/*  <a href="#" className="movie-nav__link">Reviews</a>*/}
                    {/* </li>*/}
                  </ul>
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{film.rating}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level"/>
                    <span className="movie-rating__count">{film.scores_count} ratings</span>
                  </p>
                </div>

                <div className="movie-card__text">
                  {film.description}

                  <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

                  <p className="movie-card__starring"><strong>Starring: {film.starring[0]}{film.starring.map((it, index) => {
                    if (index === 0) {
                      return null;
                    } else {
                      return `, ` + it;
                    }
                  })}
                  and
                  other</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesListWrapped movies={similarFilms}/>
        </section>
      </div>
      </>;
  }
}

MoviePage.propTypes = {
  match: PropTypes.object.isRequired,
  allFilms: PropTypes.array.isRequired,
  history: PropTypes.shape({push: PropTypes.func.isRequired}).isRequired,
  changeMovieStatusFavorite: PropTypes.func.isRequired,
};

// const mapStateToProps = (state, ownProps) => {
//   return Object.assign({}, ownProps, {
//     allFilms: state.allFilms,
//   });
// };

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    allFilms: state.allFilms,
  });
};

const mapDispatchToProps = (dispatch) => ({
  changeMovieStatusFavorite: (movieId, isFavorite) => dispatch(Operation.changeMovieStatusFavorite(movieId, isFavorite)),
});

export {MoviePage};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviePage));
