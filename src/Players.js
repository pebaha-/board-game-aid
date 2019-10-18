import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
    };
  };

  componentDidMount() {
    this.playerNameInput.focus();
  };

  handlePlayerAdd = (event) => {
    event.preventDefault();
    const playerName = this.state.playerName;
    const players = this.props.players;
    if (playerName.length === 0) {
      alert("You must enter a player name");
      return;
    }
    else if (players.includes(playerName)) {
      alert(playerName + " is already a player");
      return;
    }
    else if (players.length === 10) {
      alert("You cannot add more than ten players. Please remove a player before adding a new one.");
      return;
    }
    this.setState({
      playerName: "",
    });
    this.props.addPlayer(playerName);
    this.playerNameInput.focus();
  }

  handlePlayerDelete = (event) => {
    event.preventDefault();
    let playerName = this.state.playerName;
    let players = this.props.players;
    if (playerName.length === 0) {
      alert("You must enter a player name");
      return;
    }
    else if (!players.includes(playerName)) {
      alert(playerName + " is not a player");
      return;
    }
    this.setState({
      playerName: "",
    });
    this.props.removePlayer(playerName);
    this.playerNameInput.focus();
  }

  handlePlayerChange = (event) => {
    this.setState({
      playerName: event.target.value
    });
  }

  renderPlayerList() {
    const players = this.props.players;
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
          <Form>
            <Form.Row>
              <Form.Group controlId="formPlayer">
                <Form.Control
                  type="text"
                  placeholder="Enter player name"
                  ref={(playerNameInput) => { this.playerNameInput = playerNameInput; }}
                  value={this.state.playerName}
                  onChange={this.handlePlayerChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Button variant="success" onClick={this.handlePlayerAdd}>
                Add
              </Button>
              <Button variant="danger" onClick={this.handlePlayerDelete}>
                Remove
              </Button>
            </Form.Row>
          </Form>
          {this.renderPlayerList()}
          <Link to="/">
            <Button variant="secondary">
              Go back
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    players: state.players,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPlayer: (player) => { dispatch({ type: 'ADD_PLAYER', player: player }) },
    removePlayer: (player) => { dispatch({ type: 'REMOVE_PLAYER', player: player }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
