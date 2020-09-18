import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withPlayVideo = (Component) => {
  class WithPlayVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.onPlay = this.onPlay.bind(this);
      this.onPause = this.onPause.bind(this);
      this.setTime = this.setTime.bind(this);

      this.state = {
        isPlaying: false,
        time: 0,
      };
    }

    onPlay() {
      this.setState(() => ({isPlaying: true}));
    }

    onPause() {
      this.setState(() => ({isPlaying: false}));
    }

    setTime(curTime) {
      this.setState(() => ({time: curTime}));
    }

    renderControls() {
      return <div>controls</div>;
    }

    render() {
      return <Component
        {...this.props}
        isPlaying={this.state.isPlaying}
        onPlay={this.onPlay}
        onPause={this.onPause}
        setTime={this.setTime}
        time={this.state.time}
        renderControls={this.renderControls}
      />;
    }
  }

  WithPlayVideo.propTypes = {
  };

  return WithPlayVideo;
};

export default withPlayVideo;
