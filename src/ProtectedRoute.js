import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={props => (
          // @TODO: do not hardcore minimum required players
          this.props.players.length >= 5 ? <Component {...props} /> : <Redirect to="/" />
        )}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.players,
    seconds: state.seconds,
  };
}

export default connect(mapStateToProps)(ProtectedRoute);
