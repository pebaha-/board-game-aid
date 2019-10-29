import React from 'react';
import PropTypes from 'prop-types';
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
      playerName: '',
      modalBody: '',
      modalTitle: '',
      showModal: false,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  };

  handlePlayerAdd = (event) => {
    event.preventDefault();
    let { playerName } = this.state;
    playerName = playerName.trim();
    const { players } = this.props;
    if (playerName.length === 0) {
      this.setState({
        modalBody: 'You must enter a player name.',
        modalTitle: 'Error adding player',
        showModal: true,
      });
    }
    else if (players.includes(playerName)) {
      this.setState({
        modalBody: `${playerName} is already a player.`,
        modalTitle: 'Error adding player',
        showModal: true,
      });
    }
    else if (players.length === 10) {
      this.setState({
        modalBody: 'You cannot add more than ten players. Please remove a player before adding a new one.',
        modalTitle: 'Error adding player',
        showModal: true,
      });
    }
    else {
      this.setState({
        playerName: '',
      });
      const { addPlayer } = this.props;
      addPlayer(playerName);
      this.playerNameInput.focus();
    }
  }

  handlePlayerDelete = (event) => {
    event.preventDefault();
    let { playerName } = this.state;
    playerName = playerName.trim();
    const { players } = this.props;
    if (playerName.length === 0) {
      this.setState({
        modalBody: 'You must enter a player name.',
        modalTitle: 'Error removing player',
        showModal: true,
      });
      return;
    }
    if (!players.includes(playerName)) {
      this.setState({
        modalBody: `${playerName} is not a player.`,
        modalTitle: 'Error removing player',
        showModal: true,
      });
      return;
    }
    this.setState({
      playerName: '',
    });
    const { removePlayer } = this.props;
    removePlayer(playerName);
    this.playerNameInput.focus();
  }

  handlePlayerChange = (event) => {
    this.setState({
      playerName: event.target.value,
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  };

  renderPlayerList() {
    const { players } = this.props;
    const playerList = players.map((player) => <tr key={player}><td>{player}</td></tr>);
    while (playerList.length < 10) {
      playerList.push(
        <tr key={playerList.length}>
          <td className="dummy-player">`Player ${(playerList.length + 1)}`</td>
        </tr>,
      );
    }

    return playerList;
  }

  render() {
    const { showModal, modalBody, modalTitle, playerName } = this.state;
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
                  ref={(playerNameInput) => { this.playerNameInput = playerNameInput; }}
                  value={playerName}
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
        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
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

function mapStateToProps(state) {
  return {
    players: state.players,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPlayer: (player) => { dispatch({ type: 'ADD_PLAYER', player: player }); },
    removePlayer: (player) => { dispatch({ type: 'REMOVE_PLAYER', player: player }); },
  };
}

Players.propTypes = {
  players: PropTypes.arrayOf.isRequired,
  addPlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
