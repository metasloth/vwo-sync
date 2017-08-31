import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Verify from './components/verify/verify.jsx';
import Accounts from './components/accounts/accounts.jsx';
import VWO from './lib/vwo-api.js'
import './App.css';


class App extends React.Component {
  constructor() {
    super()
    this.updateToken = this.updateToken.bind(this)
    this.getAccounts = this.getAccounts.bind(this)
    this.VWO = new VWO(localStorage.getItem('vwoToken'))
    this.state = {
      vwoToken: (localStorage.getItem('vwoToken')) ? localStorage.getItem('vwoToken') : '',
      loggedIn: false,
      redirectToVerify: false,
      vwoAccounts: [],
      vwoCampaigns: []
    }
  }

  updateToken(e) {
    this.setState({ vwoToken: e.target.value })
  }

  getAccounts() {
    this.VWO.getAccounts()
      .then(res => this.setState({ vwoAccounts: res }))
      .catch(() => {
        this.setState({ redirectToVerify: true })
      })
  }

  getCampaigns(id) {
    this.VWO.getAccounts()
      .then(res => this.setState({ vwoAccounts: res }))
      .catch(() => {
        this.setState({ redirectToVerify: true })
      })
  }

  render() {
    const vwoToken = this.state.vwoToken
    const vwoAccounts = this.state.vwoAccounts
    const { redirectToVerify } = this.state

    if (redirectToVerify) {
      this.setState({ redirectToVerify: false })
      return (
        <Redirect to='/verify' />
      )
    }

    return (
      <div className="Grad1">
        <div className="Grad2">

          <div className='route-wrap'>
          <Switch >
            <Route exact path='/' render={() => (
              localStorage.getItem('userVerified') === 'true' ? (
                <Redirect to='/accounts' />
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
            <Route path='/accounts' render={() => (
              <Accounts
                accounts={vwoAccounts}
                getAccounts={this.getAccounts}
              />
            )} />

            />
          </Switch>
          </div>
          <div className="App-header">
            <p>VWO Sync</p>
            <div className='mainRoutes'>
              <Link to='/'>Home</Link>
              <Link to='/verify'>Verify</Link>
              <Link to='/accounts'>Accounts</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
