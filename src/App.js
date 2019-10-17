import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSecretHitlerClick = this.onSecretHitlerClick.bind(this);
  }
  componentDidMount() {
    this.secondsInput.focus();
  };

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
          <table>
            <tbody>
              <tr>
                <td>
                  <Link to="/sh">
                    <button type="button" onClick={this.onSecretHitlerClick}>Secret Hitler</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/players">
                    <button type="button">Edit players</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <p>Role Timer Seconds</p>
          <input
            label="test"
            ref={(input) => { this.secondsInput = input; }}
            type="text"
            pattern="[0-9]*"
            value={this.props.seconds}
            onChange={this.handleChange.bind(this)}
          />
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