import React, {PureComponent} from 'react';
import PropTypes from "prop-types";


class GenreList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, curGenre, genreChangeHandler} = this.props;
    const moviesUniqueGenre = [];

    movies.forEach((it) => {
      if (!moviesUniqueGenre.includes(it.genre)) {
        moviesUniqueGenre.push(it.genre);
      }
    });

    return (
      <ul className="catalog__genres-list">
        <li className={`catalog__genres-item` + ` ` + (curGenre === `all` ? `catalog__genres-item--active` : ``)}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => {
            evt.preventDefault();
            genreChangeHandler(`all`);
          }}>All genres</a>
        </li>
        {moviesUniqueGenre.map((it) => (
          <li className={`catalog__genres-item` + ` ` + (curGenre === it ? `catalog__genres-item--active` : ``)} key={it}>
            <a href="#" className="catalog__genres-link" onClick={(evt) => {
              evt.preventDefault();
              genreChangeHandler(it);
            }}>{it}</a>
          </li>
        ))}
      </ul>
    );
  }
}

GenreList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired
  })).isRequired,
  curGenre: PropTypes.string.isRequired,
  genreChangeHandler: PropTypes.func.isRequired,
};

export default GenreList;
