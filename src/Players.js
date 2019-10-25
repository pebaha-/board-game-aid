import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
    };
  };

  handlePlayerAdd = (event) => {
    event.preventDefault();
    const playerName = this.state.playerName.trim();
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
  }

  handlePlayerDelete = (event) => {
    event.preventDefault();
    let playerName = this.state.playerName.trim();
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
  }

  handlePlayerChange = (event) => {
    this.setState({
      playerName: event.target.value
    });
  }

  renderPlayerList() {
    const players = this.props.players;
    const playerList = players.map((player) =>
      <li className="player-element" key={player}>
        {player}
      </li>
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
          <Form className="players-form">
            <Form.Row>
              <Form.Group controlId="formPlayer">
                <Form.Control
                  type="text"
                  placeholder="Enter player name"
                  value={this.state.playerName}
                  onChange={this.handlePlayerChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="flex-container">
              <div>
                <Button variant="success" onClick={this.handlePlayerAdd}>
                  Add
              </Button>
              </div>
              <div>
                <Button variant="danger" onClick={this.handlePlayerDelete}>
                  Remove
              </Button>
              </div>
            </Form.Row>
          </Form>
          <ul>
            <ListGroup className="players-list">
              {this.renderPlayerList()}
            </ListGroup>
          </ul>
          <div>
            <Link to="/">
              <Button variant="secondary">
                Go back
            </Button>
            </Link>
          </div>
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
