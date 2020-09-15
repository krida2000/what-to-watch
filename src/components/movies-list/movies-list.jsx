import React from 'react';
import {PureComponent, Fragment} from 'react';
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import withPlayOnHover from "../../hocs/with-play-on-hover/with-play-on-hover";
import withShowMore from "../../hocs/with-show-more/with-show-more";

const SmallMovieCardWithPlayOnHover = withPlayOnHover(SmallMovieCard);

class MoviesList extends PureComponent {
  _getScreen(props) {
    const {movies, showMoreButtonRender} = props;


    return <Fragment>
      <div className="catalog__movies-list">
        {movies.map((elem) => (<SmallMovieCardWithPlayOnHover
          movie={elem}
          id={elem.id}
          key={elem.name}/>))}
      </div>
      {showMoreButtonRender()}
    </Fragment>;
  }

  constructor(props) {
    super(props);
  }

  render() {
    // const {movies} = this.props;

    return this._getScreen(this.props);
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    background_image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    preview_video_link: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  showMoreButtonRender: PropTypes.func.isRequired,

};

const MoviesListWrapped = withShowMore(MoviesList);

export default MoviesListWrapped;
