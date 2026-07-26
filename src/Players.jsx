import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HashLink as Link } from './navigation';

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
    if (players.length === 0) {
      return <li className="empty-state">No players added yet.</li>;
    }
    return players.map((player) => <li key={player}>{player}</li>);
  }

  render() {
    const { showModal, modalBody, modalTitle, playerName } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <span className="eyebrow">Player setup</span>
          <h1>Players</h1>
          <p className="header-subtitle">{this.props.players.length} of 10 seats filled</p>
        </header>
        <div className="App-body">
          <Form className="players-form">
            <Form.Group className="player-input" controlId="formPlayer">
              <Form.Label>Player name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Alex"
                ref={(playerNameInput) => { this.playerNameInput = playerNameInput; }}
                value={playerName}
                onChange={this.handlePlayerChange}
              />
            </Form.Group>
            <div className="player-actions">
              <Button variant="primary" onClick={this.handlePlayerAdd}>Add player</Button>
              <Button variant="outline-light" onClick={this.handlePlayerDelete}>Remove</Button>
            </div>
            <ol className="players-list" aria-label="Players">
              {this.renderPlayerList()}
            </ol>
          </Form>
          <Button className="back-button" as={Link} to="/" variant="link">
            <span aria-hidden="true">←</span> Back to games
          </Button>
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
  players: PropTypes.array.isRequired,
  addPlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
