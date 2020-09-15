import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reduсer";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {DefRoute} from "../../history";

const WatchMoviePage = (props) => {
  const {allFilms, match} = props;

  const film = allFilms.find((el) => +el.id === +match.params.id);

  return <div>All WORK</div>;
};

WatchMoviePage.propTypes = {
  allFilms: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    allFilms: state.allFilms,
  });
};

export default connect(mapStateToProps)(withRouter(WatchMoviePage));
