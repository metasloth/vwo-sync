import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './components/Main'
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to VWO Sync</h2>
        </div>
        <p className="App-intro">
          Login Using Your VWO User Token
        </p>
        <input type="text" placeholder="VWO Token"/>
        <button >Log In </button>
        <Main />
      </div>
    );
  }
}

export default App;
