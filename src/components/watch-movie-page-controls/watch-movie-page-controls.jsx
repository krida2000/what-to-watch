import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import withPlayVideo from "../../hocs/with-play-video/with-play-video";

class WatchMoviePageControls extends PureComponent {
  render() {
    const {isPlaying, onPlay, onPause, fullscreen} = this.props;

    return <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value="0" max="100"></progress>
          <div className="player__toggler" style={{left: `0%`}}></div>
        </div>
        <div className="player__time-value"/>
      </div>

      <div className="player__controls-row">
        <button type="button" className={`player__play`} onClick={isPlaying ? onPause : onPlay}>
          <svg viewBox={isPlaying ? `0 0 14 21` : `0 0 19 19`} width={isPlaying ? `14` : `19`} height={isPlaying ? `21` : `19`}>
            <use xlinkHref={isPlaying ? `#pause` : `#play-s`}/>
          </svg>
          <span>{isPlaying ? `Pause` : `Play`}</span>
        </button>
        <div className="player__name visually-hidden">Transpotting</div>

        <button type="button" className="player__full-screen" onClick={fullscreen()}>
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"/>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>;
  }
}

WatchMoviePageControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  fullscreen: PropTypes.func.isRequired,
};

export default WatchMoviePageControls;
