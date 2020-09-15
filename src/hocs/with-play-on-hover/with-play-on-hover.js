import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withPlayOnHover = (Component) => {
  class WithPlayOnHover extends PureComponent {
    constructor(props) {
      super(props);

      this.timeoutFunctionId = null;

      this.setPlayAfterOneSecond = () => {
        this.timeoutFunctionId = setTimeout(() => {
          this.setState({isPlaying: true});
        }, 1000);
      };

      this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
      this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);

      this.state = {
        isPlaying: false,
      };
    }

    mouseEnterHandler() {
      this.setPlayAfterOneSecond();
    }

    mouseLeaveHandler() {
      this.setState({isPlaying: false});

      if (this.timeoutFunctionId) {
        clearTimeout(this.timeoutFunctionId);
        this.timeoutFunctionId = null;
      }
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutFunctionId);
    }

    render() {
      return <Component
        {...this.props}
        isPlaying={this.state.isPlaying}
        mouseEnterHandler={this.mouseEnterHandler}
        mouseLeaveHandler={this.mouseLeaveHandler}
      />;
    }
  }

  WithPlayOnHover.propTypes = {
    movie: PropTypes.shape({
      background_image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      preview_video_link: PropTypes.string.isRequired,
    }),
  };

  return WithPlayOnHover;
};

export default withPlayOnHover;
