import React from 'react';
import PropTypes from "prop-types";


const VideoPlayer = (props) => {
  const {preview, poster, withoutSound, movieAutoPlay, movieWidth, movieHeight} = props;

  return (
    <video src={preview} width={movieWidth} height={movieHeight} autoPlay={movieAutoPlay} poster={poster} muted={withoutSound}/>
  );
};

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  withoutSound: PropTypes.bool.isRequired,
  movieAutoPlay: PropTypes.bool.isRequired,
  movieWidth: PropTypes.number.isRequired,
  movieHeight: PropTypes.number.isRequired,
};

export default VideoPlayer;
