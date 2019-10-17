import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SecretHitler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerRoles: {},
      currentPlayer: "",
      currentRole: "",
      currentPlayerIndex: 0,
      showRole: false,
      secondsRemaining: this.props.seconds,
      disabledRoleButton: false,
      playersCycled: false,
    };
    this.onShowRoleClick = this.onShowRoleClick.bind(this);
    this.tick = this.tick.bind(this);
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
    }, () => {
      this.setState({
        currentPlayer: this.props.players[this.state.currentPlayerIndex],
        currentRole: this.state.playerRoles[this.state.currentPlayerIndex][this.props.players[this.state.currentPlayerIndex]]
      })
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
  };

  tick() {
    if (this.state.secondsRemaining === 0) {
      clearInterval(this.intervalHandle);
      this.setState({
        showRole: false,
        disabledRoleButton: false,
      });
      // Did we cycle through all players?
      if (this.state.currentPlayerIndex === this.props.players.length - 1) {
        this.setState({
          playersCycled: true,
        });
      }
      else {
        this.setState({
          secondsRemaining: this.props.seconds,
          currentPlayerIndex: this.state.currentPlayerIndex + 1,
        }, () => {
          this.setState({
            currentPlayer: this.props.players[this.state.currentPlayerIndex],
            currentRole: this.state.playerRoles[this.state.currentPlayerIndex][this.props.players[this.state.currentPlayerIndex]]
          })
        });
      }
    }
    else {
      this.setState({
        secondsRemaining: this.state.secondsRemaining - 1
      });
    }
  }

  onShowRoleClick(event) {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      showRole: true,
      disabledRoleButton: true,
    });
  };

  render() {
    if (this.state.playerRoles.length < this.props.players.length) {
      return (
        <div className="App">
          <header className="App-header">
            <p>Secret Hitler</p>
          </header>
          <div className="App-body">
          </div>
        </div>
      );
    }
    if (this.state.playersCycled) {
      return (
        <div className="App">
          <header className="App-header">
            <p>Secret Hitler</p>
          </header>
          <div className="App-body">
            <p>Done cycling players!</p>
          </div>
          <div>
            <Link to="/">
              <button type="button">Quit game</button>
            </Link>
          </div>
        </div>
      );
    }
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
                  <div>{this.state.currentPlayer}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>{this.state.showRole ? this.state.currentRole : ""}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>{this.state.showRole ? this.state.secondsRemaining : ""}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <button type="button" disabled={this.state.disabledRoleButton} onClick={this.onShowRoleClick}>Show role</button>
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
