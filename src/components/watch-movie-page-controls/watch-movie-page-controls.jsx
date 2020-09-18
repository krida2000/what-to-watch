import React, {PureComponent} from "react";
import PropTypes, {any} from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

class WatchMoviePageControls extends PureComponent {
  render() {
    const {isPlaying, onPlay, onPause, fullscreen, time, duration, onExitButtonClick} = this.props;

    let hours = Math.round((time / 3600) - 0.5);
    let minutes = Math.round(((time - hours * 3600) / 60) - 0.5);
    let seconds = Math.round(((time - hours * 3600 - minutes * 60)) - 0.5);

    minutes = minutes < 10 ? `0` + minutes : minutes;
    seconds = seconds < 10 ? `0` + seconds : seconds;

    return <>
      <button type="button" className="player__exit" onClick={onExitButtonClick}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={time} max={duration} />
            <div className="player__toggler" style={{left: `${(time / duration) * 100}%`}}/>
          </div>
          <div className="player__time-value">{hours}:{minutes}:{seconds}</div>
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
      </div>
      </>;
  }
}

WatchMoviePageControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  fullscreen: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
};

export default WatchMoviePageControls;
