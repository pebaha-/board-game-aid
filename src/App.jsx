import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HashLink as Link, Navigate } from './navigation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      redirectToSecretHitler: false,
    };
    this.onSecretHitlerClick = this.onSecretHitlerClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSecretHitlerClick() {
    // @TODO: do not hardcore minimum required players
    const { players } = this.props;
    if (players.length < 5) {
      this.setState({
        showModal: true,
      });
    }
    else {
      this.setState({
        redirectToSecretHitler: true,
      });
    }
  };

  handleChange(event) {
    const { seconds } = this.props;
    const { setTimerDuration } = this.props;
    const newSeconds = (event.target.validity.valid) ? event.target.value : seconds;
    setTimerDuration(newSeconds);
  };

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { redirectToSecretHitler, showModal } = this.state;
    const { seconds } = this.props;
    if (redirectToSecretHitler) {
      return <Navigate to="/sh" />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <span className="eyebrow">Tabletop companion</span>
          <h1>Board Game Aid</h1>
          <p className="header-subtitle">Set up the table and get playing faster.</p>
        </header>
        <div className="App-body">
          <nav className="button-stack" aria-label="Game actions">
            <Button className="game-button" variant="primary" onClick={this.onSecretHitlerClick}>
              <span>Secret Hitler</span>
              <span aria-hidden="true">→</span>
            </Button>
            <Button className="game-button secondary-button" as={Link} to="/players" variant="outline-light">
              <span>Edit players</span>
              <span aria-hidden="true">＋</span>
            </Button>
          </nav>
          <Form className="timer-form">
            <Form.Group controlId="formRoleSeconds">
              <Form.Label>Role reveal timer</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="60"
                aria-describedby="timerHelp"
                value={seconds}
                onChange={this.handleChange}
              />
              <Form.Text id="timerHelp">Seconds each player can view their role.</Form.Text>
            </Form.Group>
          </Form>
        </div>
        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Not enough players</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need at least five players to play.
            Click 'Edit players' to add more players.
          </Modal.Body>
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
    seconds: state.seconds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTimerDuration: (seconds) => { dispatch({ type: 'SET_TIMER_DURATION', seconds: seconds }); },
  };
}

App.propTypes = {
  players: PropTypes.array.isRequired,
  seconds: PropTypes.number.isRequired,
  setTimerDuration: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
