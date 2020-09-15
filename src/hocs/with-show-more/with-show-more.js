import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withShowMore = (Component) => {
  class WithShowMore extends PureComponent {
    constructor(props) {
      super(props);

      this.incrementStateCount = this.incrementStateCount.bind(this);
      this.showMoreButtonRender = this.showMoreButtonRender.bind(this);

      this.state = {
        count: 8,
      };
    }

    incrementStateCount() {
      this.setState((prevState) => ({count: prevState.count + 20}));
    }

    showMoreButtonRender() {
      const {movies} = this.props;

      if (this.state.count < movies.length) {
        return <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={this.incrementStateCount}>Show more</button>
        </div>;
      } else {
        return null;
      }
    }

    render() {
      const {movies} = this.props;

      return <Component
        {...this.props}
        movies={movies.slice(0, this.state.count)}
        showMoreButtonRender={this.showMoreButtonRender}
      />;
    }
  }

  WithShowMore.propTypes = {
    movies: PropTypes.array.isRequired,
  };

  return WithShowMore;
};

export default withShowMore;
