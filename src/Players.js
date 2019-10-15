import React from 'react';
import { Link } from 'react-router-dom';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      players: [],
    };
  };

  handlePlayerAdd = (event) => {
    event.preventDefault();
    const playerName = this.state.playerName;
    const players = this.state.players;
    if (players.includes(playerName)) {
      alert(playerName + " is already a player");
      return;
    }
    this.setState({
      players: players.concat(playerName),
    });
  }

  handlePlayerDelete = (event) => {
    event.preventDefault();
    let playerName = this.state.playerName;
    let players = this.state.players;
    let filteredPlayers = players.filter(function (name) {
      return name !== playerName;

    });
    this.setState({
      players: filteredPlayers,
    });
  }

  handlePlayerChange = (event) => {
    this.setState({
      playerName: event.target.value
    });
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <p>Players</p>
        </header>
        <div className="App-body">
          <form>
            <input
              type="text"
              label="player-name"
              ref={(input) => { this.playerNameInput = input; }}
              defaultValue={this.state.playerName}
              onChange={this.handlePlayerChange}
            />
            <button
              onClick={this.handlePlayerAdd}>
              Add
            </button>
            <button onClick={this.handlePlayerDelete}>
              Delete
            </button>
          </form>
          <MainButton />
        </div>
      </div>
    );
  }
}

function MainButton() {
  return (
    <Link to="/">
      <button type="button">Go back</button>
    </Link>
  );
}


export default Players;