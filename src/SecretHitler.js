import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SecretHitler extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Secret Hitler</p>
        </header>
        <div className="App-body">
          <table>
            <tbody>
              <tr>
                <td>
                  <Link to="/">
                    <button type="button">Go back</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                </td>
              </tr>
            </tbody>
          </table>
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

export default connect(mapStateToProps)(SecretHitler);