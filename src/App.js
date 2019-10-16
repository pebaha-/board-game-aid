import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 15,
    };
    this.onSecretHitlerClick = this.onSecretHitlerClick.bind(this);
  };

  componentDidMount() {
    this.secondsInput.focus();
  };

  handleChange(event) {
    const seconds = (event.target.validity.valid) ? event.target.value : this.state.seconds;
    this.setState({ seconds });
  };

  onSecretHitlerClick(event) {

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
                  <button onClick={this.onSecretHitlerClick.bind(this)}>Secret Hitler</button>
                </td>
              </tr>
              <tr>
                <td>
                  <PlayersButton />
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
            value={this.state.seconds}
            onChange={this.handleChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function PlayersButton() {
  return (
    <Link to="/players">
      <button type="button">Edit players</button>
    </Link>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    players: state.players,
  };
}

export default connect(mapStateToProps)(App);