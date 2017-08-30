import React, { Component } from 'react';
import Main from './components/Main';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="Grad1">
        <div className="Grad2">
        <div className="App-header">
          <p>VWO Sync</p>
        </div>
        <Main />
        </div>
      </div>
    );
  }
}

export default App;
