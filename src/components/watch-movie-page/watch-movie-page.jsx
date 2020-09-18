import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import withPlayVideo from "../../hocs/with-play-video/with-play-video";
import WatchMoviePageControls from "../watch-movie-page-controls/watch-movie-page-controls";
import {DefRoute} from "../../history";

class WatchMoviePage extends PureComponent {

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
    this.fullscreenFunc = this.fullscreen.bind(this);
  }

  play() {
    const video = this.videoRef.current;

    video.play();
    this.timeUpdateInterval = setInterval(() => this.props.setTime(video.currentTime), 1000);
  }

  pause() {
    const video = this.videoRef.current;

    video.pause();
    clearInterval(this.timeUpdateInterval);
  }

  fullscreen() {
    const video = this.videoRef.current;

    const videoParent = video.parentElement;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoParent.requestFullscreen({navigationUI: `show`});
    }
  }

  render() {
    const {allFilms, match, onPlay, onPause, isPlaying, time, history} = this.props;
    const filmId = match.params.id;

    const film = allFilms.find((el) => +el.id === +match.params.id);

    if (!film) {
      return null;
    }

    return <div className="player">
      <video ref={this.videoRef} className={`player__video`} poster={film.background_image} src={film.video_link} autoPlay={isPlaying}/>
      <WatchMoviePageControls isPlaying={isPlaying}
        onPlay={() => {
          onPlay();
          this.play();
        }}
        onPause={() => {
          onPause();
          this.pause();
        }}
        fullscreen={() => this.fullscreenFunc}
        duration={this.videoRef.current ? this.videoRef.current.duration : 100}
        time={time}
        onExitButtonClick={() => {
          history.push(DefRoute.MOVIE_PAGE + filmId);
        }}/>
    </div>;
  }
}

WatchMoviePage.propTypes = {
  allFilms: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  renderControls: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    allFilms: state.allFilms,
  });
};

const WatchMoviePageWrapped = withPlayVideo(WatchMoviePage);

export default connect(mapStateToProps)(withRouter(WatchMoviePageWrapped));
