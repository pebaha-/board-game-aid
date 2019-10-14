import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 15,
    };
  };

  componentDidMount() {
    this.secondsInput.focus();
  };

  handleChange(event) {
    const seconds = (event.target.validity.valid) ? event.target.value : this.state.seconds;
    this.setState({ seconds });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Board Game Aid</p>
        </header>
        <div className="App-body">
          <table>
            <tbody>
              <tr>
                <td>
                  <button color="red">Secret Hitler</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button>Edit Players</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p>Role Timer Seconds</p>
          <input
            label="test"
            ref={(input) => { this.secondsInput = input; }}
            type="text"
            pattern="[0-9]*"
            value={this.state.seconds}
            onInput={this.handleChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
