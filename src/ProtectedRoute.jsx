import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from './navigation';

class ProtectedRoute extends React.Component {
  render() {
    const { children, players } = this.props;
    return players.length >= 5 ? children : <Navigate to="/" replace />;
  }
}

function mapStateToProps(state) {
  return {
    players: state.players,
    seconds: state.seconds,
  };
}

export default connect(mapStateToProps)(ProtectedRoute);

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  players: PropTypes.array.isRequired,
};
