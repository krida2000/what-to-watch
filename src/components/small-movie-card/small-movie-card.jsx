import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player";
import {Link, withRouter, NavLink} from 'react-router-dom';
import {DefRoute} from "../../history";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movie, id, isPlaying, mouseEnterHandler, mouseLeaveHandler} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}>
        <div className="small-movie-card__image">
          {!isPlaying ?
            <img src={movie.background_image} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"/> :
            <VideoPlayer preview={movie.preview_video_link} withoutSound={true} movieAutoPlay={true} movieWidth={280} movieHeight={175} poster={movie.background_image}/>}
        </div>
        <h3 className="small-movie-card__title">
          <NavLink className="small-movie-card__link" to={`${DefRoute.MOVIE_PAGE}${id}`}>{movie.name}</NavLink>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    background_image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    preview_video_link: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  mouseEnterHandler: PropTypes.func.isRequired,
  mouseLeaveHandler: PropTypes.func.isRequired,
};

export default SmallMovieCard;
