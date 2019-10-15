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

  componentDidMount() {
    this.playerNameInput.focus();
  };

  handlePlayerAdd = (event) => {
    event.preventDefault();
    const playerName = this.state.playerName;
    const players = this.state.players;
    if (playerName.length == 0) {
      alert("You must enter a player name");
      return;
    }
    else if (players.includes(playerName)) {
      alert(playerName + " is already a player");
      return;
    }
    this.setState({
      players: players.concat(playerName),
      playerName: "",
    });
  }

  handlePlayerDelete = (event) => {
    event.preventDefault();
    let playerName = this.state.playerName;
    let players = this.state.players;
    if (playerName.length == 0) {
      alert("You must enter a player name");
      return;
    }
    else if (!players.includes(playerName)) {
      alert(playerName + " is not a player");
      return;
    }
    let filteredPlayers = players.filter(function (name) {
      return name !== playerName;

    });
    this.setState({
      players: filteredPlayers,
      playerName: "",
    });
  }

  handlePlayerChange = (event) => {
    this.setState({
      playerName: event.target.value
    });
  }

  renderPlayerList() {
    const players = this.state.players;
    const playerList = players.map((player) =>
      <div key={player}>
        {player}
      </div>
    );
    return playerList;
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
              ref={(playerNameInput) => { this.playerNameInput = playerNameInput; }}
              value={this.state.playerName}
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
          {this.renderPlayerList()}
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
