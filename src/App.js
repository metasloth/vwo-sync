import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Verify from './components/verify/verify.js';
import Dashboard from './components/dashboard/dashboard.js';
import VWO from './lib/vwo-api.js'
import './App.css';


class App extends React.Component {
  constructor() {
    super()
    this.updateToken = this.updateToken.bind(this)
    this.state = {
      vwoToken: (localStorage.getItem('vwoToken')) ? localStorage.getItem('vwoToken') : '',
      loggedIn: false,
      
    }
  }

  updateToken(e){
    this.setState({vwoToken: e.target.value})
  }

  render() {
    const vwoToken = this.state.vwoToken
    return (
      <div className="Grad1">
        <div className="Grad2">
          <div className="App-header">
            <p>VWO Sync</p>
          </div>
          <div className='mainRoutes'>
            <Link to='/'>Home</Link>
            <Link to='/verify'>Verify</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <p>{vwoToken}</p>
          </div>
          <Switch>
            <Route exact path='/' render={() => (
              localStorage.getItem('userVerified') === 'true' ? (
                <Redirect to='/dashboard' />
              ) : (
                  <Redirect to='/verify' />
                )
            )} />
            <Route path='/verify' render={() => (
              <Verify
                vwoToken={vwoToken}
                updateToken={this.updateToken}
              />
            )} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
