import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSecretHitlerClick = this.onSecretHitlerClick.bind(this);
  }

  handleChange(event) {
    const seconds = (event.target.validity.valid) ? event.target.value : this.props.seconds;
    this.props.setTimerDuration(seconds);
  };

  onSecretHitlerClick(event) {
    // @TODO: do not hardcore minimum required players
    if (this.props.players.length < 5) {
      alert("You need at least five players to play. Click 'Edit players' to add more players.")
      return;
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Board Game Aid</p>
        </header>
        <div className="App-body">
          <Table borderless size="sm">
            <tbody>
              <tr>
                <td>
                  <Link to="/sh">
                    <Button variant="info" onClick={this.onSecretHitlerClick}>Secret Hitler</Button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/players">
                    <Button variant="info">Edit players</Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
          <Form>
            <Form.Group controlId="formRoleSeconds">
              <Form.Label>Role Timer Seconds</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="60"
                placeholder="Enter role timer in seconds"
                value={this.props.seconds}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    players: state.players,
    seconds: state.seconds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTimerDuration: (seconds) => { dispatch({ type: 'SET_TIMER_DURATION', seconds: seconds }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);