import React from 'react';
import './App.css';
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
  }

  handleChange(event) {
    const seconds = (event.target.validity.valid) ? event.target.value : this.props.seconds;
    this.props.setTimerDuration(seconds);
  };

  onSecretHitlerClick() {
    // @TODO: do not hardcore minimum required players
    if (this.props.players.length < 5) {
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

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  };

  render() {
    if (this.state.redirectToSecretHitler) {
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
                value={this.props.seconds}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Group>
          </Form>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Not enough players</Modal.Title>
          </Modal.Header>
          <Modal.Body>You need at least five players to play. Click 'Edit players' to add more players.</Modal.Body>
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
    seconds: state.seconds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTimerDuration: (seconds) => { dispatch({ type: 'SET_TIMER_DURATION', seconds: seconds }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);