import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export function HashLink({ children, to, ...props }) {
  return <a {...props} href={`#${to}`}>{children}</a>;
}

HashLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export function Navigate({ to }) {
  useEffect(() => {
    window.location.hash = to;
  }, [to]);

  return null;
}

Navigate.propTypes = {
  to: PropTypes.string.isRequired,
};
