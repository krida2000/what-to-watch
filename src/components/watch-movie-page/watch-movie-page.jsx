import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import withPlayVideo from "../../hocs/with-play-video/with-play-video";
import WatchMoviePageControls from "../watch-movie-page-controls/watch-movie-page-controls";

class WatchMoviePage extends PureComponent {

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  play() {
    const video = this.videoRef.current;

    video.play();
  }

  pause() {
    const video = this.videoRef.current;

    video.pause();
  }

  render() {
    const {allFilms, match, onPlay, onPause, isPlaying} = this.props;

    const film = allFilms.find((el) => +el.id === +match.params.id);

    if (!film) {
      return null;
    }

    return <div className="player">
      <video ref={this.videoRef} className={`player__video`} poster={film.poster_image} src={film.video_link} autoPlay={isPlaying}/>
      <WatchMoviePageControls isPlaying={isPlaying} onPlay={() => {onPlay(); this.play();}} onPause={() => {onPause(); this.pause();}}/>
    </div>;
  }
}

WatchMoviePage.propTypes = {
  allFilms: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  renderControls: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    allFilms: state.allFilms,
  });
};

const WatchMoviePageWrapped = withPlayVideo(WatchMoviePage);

export default connect(mapStateToProps)(withRouter(WatchMoviePageWrapped));
