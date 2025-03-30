import React from 'react';
import './App.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

class SecretHitler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerRoles: {},
      currentPlayer: '',
      currentRole: '',
      currentPlayerIndex: 0,
      showRole: false,
      showParty: false,
      secondsRemaining: this.props.seconds,
      disabledRoleButton: false,
      playersCycled: false,
      showModal: false,
      quitGame: false,
    };
    this.onShowRoleClick = this.onShowRoleClick.bind(this);
    this.tick = this.tick.bind(this);
    this.getOtherFascists = this.getOtherFascists.bind(this);
    this.getHitler = this.getHitler.bind(this);
    this.onPartyClick = this.onPartyClick.bind(this);
    this.onNextPlayerClick = this.onNextPlayerClick.bind(this);
    this.showQuitModal = this.showQuitModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleQuitModal = this.handleQuitModal.bind(this);
  };

  componentDidMount() {
    let rolesToAssign = [];
    const playerCount = this.props.players.length;
    let fascistCount = 0;

    switch (playerCount) {
      case 5:
      case 6:
        fascistCount = 1;
        break;
      case 7:
      case 8:
        fascistCount = 2;
        break;
      case 9:
      case 10:
        fascistCount = 3;
        break;
      default:
        break;
    }

    rolesToAssign.push('Hitler');

    for (let i = 0; i < fascistCount; i++) {
      rolesToAssign.push('Fascist');
    }

    for (let j = 0; j < playerCount - fascistCount - 1; j++) {
      rolesToAssign.push('Liberal');
    }

    rolesToAssign = this.shuffle(rolesToAssign);
    const players = this.props.players;

    this.setState({
      playerRoles: rolesToAssign.reduce(function (result, field, index) {
        result[players[index]] = field;
        return result;
      }, {}),
    }, () => {
      this.setState({
        currentPlayer: players[this.state.currentPlayerIndex],
        currentRole: this.state.playerRoles[players[this.state.currentPlayerIndex]]
      })
    });
  };

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  tick() {
    if (this.state.secondsRemaining === 0) {
      clearInterval(this.intervalHandle);
      this.setState({
        showRole: false,
        disabledRoleButton: false,
      });
      // Did we cycle through all players?
      if (this.state.currentPlayerIndex === this.props.players.length - 1) {
        this.setState({
          playersCycled: true,
        });
      }
      else {
        this.setState({
          secondsRemaining: this.props.seconds,
          currentPlayerIndex: this.state.currentPlayerIndex + 1,
        }, () => {
          this.setState({
            currentPlayer: this.props.players[this.state.currentPlayerIndex],
            currentRole: this.state.playerRoles[this.props.players[this.state.currentPlayerIndex]]
          })
        });
      }
    }
    else {
      this.setState({
        secondsRemaining: this.state.secondsRemaining - 1
      });
    }
  };

  onShowRoleClick(event) {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      showRole: true,
      disabledRoleButton: true,
    });
  };

  getOtherFascists() {
    const playerRoles = this.state.playerRoles;
    const currentPlayer = this.state.currentPlayer;
    let otherFascists = this.props.players.filter(function (player) {
      return playerRoles[player] === 'Fascist' && player !== currentPlayer;
    });
    return otherFascists.join(', ');
  };

  getHitler() {
    return this.getKeyByValue(this.state.playerRoles, 'Hitler');
  };

  getParty() {
    if (this.state.currentRole === 'Hitler') {
      return 'Fascist';
    }
    else return this.state.currentRole;
  };

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  };

  onPartyClick() {
    this.setState({
      showParty: !this.state.showParty,
    });
  };

  onNextPlayerClick() {
    let nextPlayerIndex = 0;
    // If we're not yet at the last player
    if (this.state.currentPlayerIndex < this.props.players.length - 1) {
      nextPlayerIndex = this.state.currentPlayerIndex + 1;
    }
    const players = this.props.players;
    this.setState({
      currentPlayerIndex: nextPlayerIndex,
      showParty: false,
    }, () => {
      this.setState({
        currentPlayer: players[this.state.currentPlayerIndex],
        currentRole: this.state.playerRoles[players[this.state.currentPlayerIndex]]
      })
    });
  };

  renderRoleInfo() {
    return (
      <React.Fragment>
        <tr className={this.state.showRole ? "visible-role-info" : "hidden-role-info"}>
          <td>
            <div>{'Role: ' + this.state.currentRole}</div>
          </td>
        </tr>
        <tr className={this.state.showRole ? "visible-role-info" : "hidden-role-info"}>
          <td>
            <div>{this.state.currentRole === 'Fascist' && this.props.players.length > 6 ? 'Fascists: ' + this.getOtherFascists() : ""}</div>
          </td>
        </tr>
        <tr className={this.state.showRole ? 'visible-role-info' : 'hidden-role-info'}>
          <td>
            <div>{this.state.currentRole === 'Fascist' ? 'Hitler: ' + this.getHitler() : ''}</div>
          </td>
        </tr>
        <tr className={this.state.showRole ? 'visible-role-info' : 'hidden-role-info'}>
          <td>
            <div>{this.state.currentRole === 'Hitler' && this.props.players.length < 7 ? 'Fascist: ' + this.getOtherFascists() : ''}</div>
          </td>
        </tr>
        <tr className={this.state.showRole ? 'visible-role-info' : 'hidden-role-info'}>
          <td>
            <div>{this.state.secondsRemaining}</div>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  showQuitModal() {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  };

  handleQuitModal() {
    this.setState({
      quitGame: true,
    });
  };

  render() {
    if (this.state.quitGame) {
      return <Redirect push to="/" />;
    }
    if (this.state.playerRoles.length < this.props.players.length || !this.state.currentPlayer) {
      return (
        <div className="App">
          <header className="App-header">
            <p>Secret Hitler</p>
          </header>
          <div className="App-body"/>
        </div>
      );
    }
    if (this.state.playersCycled) {
      return (
        <div className="App">
          <header className="App-header">
            <p>Secret Hitler</p>
          </header>
          <div className="App-body">
            <Table borderless size="sm" className="players-table">
              <tbody>
                <tr>
                  <td>
                    <div>{this.state.currentPlayer}</div>
                  </td>
                </tr>
                <tr className={this.state.showParty ? 'visible-party-info' : 'hidden-party-info'}>
                  <td>
                    {this.getParty()}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button variant="info" onClick={this.onPartyClick}>{this.state.showParty ? 'Hide party' : 'Show party'}</Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button variant="info" onClick={this.onNextPlayerClick}>Next player</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Button variant="danger" onClick={this.showQuitModal}>Quit game</Button>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>Quit game</Modal.Title>
            </Modal.Header>
            <Modal.Body>Would you like to quit the game and go back to the main menu?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={this.handleQuitModal}>
                Quit Game
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>Secret Hitler</p>
        </header>
        <div className="App-body">
          <Table borderless size="sm" className="players-table">
            <tbody>
              <tr>
                <td>
                  <div>{this.state.currentPlayer}</div>
                </td>
              </tr>
              {this.renderRoleInfo()}
              <tr>
                <td>
                  <Button variant="info" disabled={this.state.disabledRoleButton} onClick={this.onShowRoleClick}>Show role</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
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

export default connect(mapStateToProps)(SecretHitler);
