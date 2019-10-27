import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

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
      return <Redirect push to="/sh" />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>Board Game Aid</p>
        </header>
        <div className="App-body">
          <Table borderless size="sm">
            <tbody>
              <tr>
                <td>
                  <Button variant="info" onClick={this.onSecretHitlerClick}>Secret Hitler</Button>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/players">
                    <Button variant="info">Edit players</Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
          <Form>
            <Form.Group controlId="formRoleSeconds">
              <Form.Label>Role Timer Seconds</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="60"
                placeholder="Enter role timer in seconds"
                value={seconds}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </div>
        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Not enough players</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need at least five players to play.
            Click `&apos;`Edit players`&apos;` to add more players.
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
  players: PropTypes.arrayOf.isRequired,
  seconds: PropTypes.number.isRequired,
  setTimerDuration: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
