import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      modalBody: "",
      showModal: false,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  };

  handlePlayerAdd = (event) => {
    event.preventDefault();
    const playerName = this.state.playerName.trim();
    const players = this.props.players;
    if (playerName.length === 0) {
      this.setState({
        modalBody: "You must enter a player name.",
        showModal: true,
      });
      return;
    }
    else if (players.includes(playerName)) {
      this.setState({
        modalBody: playerName + " is already a player.",
        showModal: true,
      });
      return;
    }
    else if (players.length === 10) {
      this.setState({
        modalBody: "You cannot add more than ten players. Please remove a player before adding a new one.",
        showModal: true,
      });
      return;
    }
    else {
      this.setState({
        playerName: "",
      });
      this.props.addPlayer(playerName);
    }
  }

  handlePlayerDelete = (event) => {
    event.preventDefault();
    let playerName = this.state.playerName.trim();
    let players = this.props.players;
    if (playerName.length === 0) {
      this.setState({
        modalBody: "You must enter a player name.",
        showModal: true,
      });
      return;
    }
    else if (!players.includes(playerName)) {
      this.setState({
        modalBody: playerName + " is not a player.",
        showModal: true,
      });
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
    let playerList = players.map((player) =>
      <tr key={player}>
        <td>
          {player}
        </td>
      </tr>
    );
    while (playerList.length < 10) {
      playerList.push(<tr key={playerList.length}><td className="dummy-player">{"Player " + (playerList.length + 1)}</td></tr>);
    }

    return playerList;
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  };

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
            <Form.Row>
              <Table borderless size="sm" className="players-table">
                <tbody>
                  {this.renderPlayerList()}
                </tbody>
              </Table>
            </Form.Row>
          </Form>
          <div>
            <Link to="/">
              <Button variant="secondary">
                Go back
            </Button>
            </Link>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Error adding player</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
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
