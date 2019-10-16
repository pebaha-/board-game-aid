import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SecretHitler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerRoles: {},
    };
  };

  componentDidMount() {
    let rolesToAssign = [];
    const playerCount = this.props.players.length;
    let fascistCount = 0;

    switch (playerCount) {
      case 5:
      case 6:
        fascistCount = 1;
        break;
      case 7:
      case 8:
        fascistCount = 2;
        break;
      case 9:
      case 10:
        fascistCount = 3;
        break;
      default:
        break;
    }

    rolesToAssign.push("Hitler");

    for (let i = 0; i < fascistCount; i++) {
      rolesToAssign.push("Fascist");
    }

    for (let j = 0; j < playerCount - fascistCount - 1; j++) {
      rolesToAssign.push("Liberal");
    }

    rolesToAssign = this.shuffle(rolesToAssign);

    this.setState({
      playerRoles: this.props.players.map(function (player) {
        return { [player]: rolesToAssign.pop() };
      }),
    });
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

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
                    <button type="button">Quit game</button>
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