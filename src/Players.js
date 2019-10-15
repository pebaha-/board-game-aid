import React from 'react';
import { Link } from 'react-router-dom';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {},
    };
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <p>Players</p>
          <MainButton />
        </header>
      </div>
    );
  }
}

function MainButton() {
  return (
    <Link to="/">
      <button type="button">Go back to main page</button>
    </Link>
  );
}


export default Players;