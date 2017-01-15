import React, { Component } from 'react';
import logo from '../logo.svg';
import './index.css';
import Routine from '../Components/Routine';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!</h2>
        </div>
        <section>
          <Routine />
        </section>
      </div>
    );
  }
}

export default App;
