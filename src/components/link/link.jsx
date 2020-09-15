// Libraries
import * as React from 'react';
import PropTypes from "prop-types";
// Constants and utils

import history from '../../history';

const PROPS_TO_EXCLUDE = [`to`];

function excludeProps(props = {}, propNames = []) {
  const temp = {};

  Object.keys(props).forEach((propName) => {
    if (!propNames.includes(propName)) {
      temp[propName] = props[propName];
    }
  });

  return temp;
}

function Link(props) {
  const {to} = props;

  const propsToParent = excludeProps(props, PROPS_TO_EXCLUDE);

  const handleClick = (evt) => {
    evt.preventDefault();

    history.push(to);
  };

  return <a {...propsToParent} href={to} onClick={handleClick}/>;
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
};

export default React.memo(Link);
