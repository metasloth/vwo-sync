import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import Verify from './components/verify/verify.jsx'
import Accounts from './components/accounts/accounts.jsx'
import Campaigns from './components/campaigns/campaigns.jsx'
import Variations from './components/variations/variations.jsx'

import VWO from './lib/vwo-api.js'
import './App.css';


class App extends React.Component {
  constructor() {
    super()
    this.VWO = new VWO(localStorage.getItem('vwoToken'))
    this.updateToken = this.updateToken.bind(this)
    this.getVWOAccounts = this.getVWOAccounts.bind(this)
    this.setVWOAccount = this.setVWOAccount.bind(this)
    this.getVWOCampaigns = this.getVWOCampaigns.bind(this)
    this.setVWOCampaign = this.setVWOCampaign.bind(this)
    this.getVWOVariations = this.getVWOVariations.bind(this)

    this.state = {
      vwoToken: (localStorage.getItem('vwoToken')) ? localStorage.getItem('vwoToken') : '',
      loggedIn: false,
      redirectPath: false,
      vwoAccounts: [],
      vwoActiveAccout: (localStorage.getItem('vwoAccount')) ? localStorage.getItem('vwoAccount') : '',
      vwoCampaigns: [],
      vwoActiveCampaign: (localStorage.getItem('vwoCampaign')) ? localStorage.getItem('vwoCampaign') : '',
      vwoVariations: [],
      vvoActiveVariation: (localStorage.getItem('vwoVariation')) ? localStorage.getItem('vwoVariation') : '',
    }
  }

  /* ------------- Token ------------- */
  updateToken(e) {
    this.setState({ vwoToken: e.target.value })
  }

  /* ------------- Accounts ------------- */
  getVWOAccounts() {
    this.VWO.getAccounts()
      .then(res => this.setState({ vwoAccounts: res }))
      .catch(() => {
        this.setState({ redirectPath: '/verify' })
      })
  }
  setVWOAccount(e) {
    this.setState({ vwoActiveAccout: e.currentTarget.getAttribute('value') })
    localStorage.setItem('vwoAccount', e.currentTarget.getAttribute('value'))
  }


  /* ------------- Campaigns ------------- */
  getVWOCampaigns() {
    this.VWO.getCampaigns(this.state.vwoActiveAccout)
      .then(res => {
        this.setState({ vwoCampaigns: res, redirectPath: '/campaigns' })
      })
      .catch(() => {
        this.setState({ redirectPath: '/verify' })
      })
  }
  setVWOCampaign(e) {
    this.setState({ vwoActiveCampaign: e.currentTarget.getAttribute('value') })
    localStorage.setItem('vwoCampaign', e.currentTarget.getAttribute('value'))
  }

  /* ------------- Variations ------------- */
  getVWOVariations() {
    this.VWO.getVariations(this.state.vwoActiveAccout, this.state.vwoActiveCampaign)
      .then(res => {
        this.setState({ vwoVariations: res, redirectPath: '/variations' })
      })
      .catch(() => {
        this.setState({ redirectPath: '/verify' })
      })
  }
  setVWOVariation(e) {
    this.setState({ vvoActiveVariation: e.currentTarget.getAttribute('value') })
    localStorage.setItem('vwoVariation', e.currentTarget.getAttribute('value'))
  }

  /* ------------- DOM ------------- */
  clearRedirect() {
    this.setState({ redirectPath: false })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.vwoActiveAccout != this.state.vwoActiveAccout) {
      this.setState({ redirectPath: '/load' })
      this.getVWOCampaigns()
    }
    if (prevState.vwoActiveCampaign != this.state.vwoActiveCampaign) {
      this.setState({ redirectPath: '/load' })
      this.getVWOVariations()
    }

    if ((this.state.redirectPath) && (prevState.redirectPath != this.state.redirectPath)) {
      this.setState({ redirectPath: false })
    }
  }



  render() {
    const vwoToken = this.state.vwoToken
    const vwoAccounts = this.state.vwoAccounts
    const vwoCampaigns = this.state.vwoCampaigns
    const vwoVariations = this.state.vwoVariations

    const redirectPath = this.state.redirectPath
    if (redirectPath) {
      return (<Redirect to={redirectPath} />)
    }

    return (
      <div>
      <div className="Grad1"></div>
        <div className="Grad2"></div>
          <div className='route-wrap'>
            <Switch >
              <Route exact path='/' render={() => (
                localStorage.getItem('userVerified') === 'true' ? (
                  <Redirect to='/accounts' />
                ) : (
                    <Redirect to='/verify' />
                  )
              )} />
              <Route path='/load' render={() => (
                <h1 className="loading">Loading</h1>
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
                  getAccounts={this.getVWOAccounts}
                  setAccount={this.setVWOAccount}
                />
              )} />
              <Route path='/campaigns' render={() => (
                <Campaigns
                  campaigns={vwoCampaigns}
                  getCampaigns={this.getVWOCampaigns}
                  setCampaign={this.setVWOCampaign}
                />
              )} />
              <Route path='/variations' render={() => (
                <Variations
                  variations={vwoVariations}
                  getVariations={this.getVWOVariations}
                />
              )} />
            </Switch>
          </div>
          <div className="App-header">
            <p>VWO Sync</p>

            <div className='mainRoutes'>
  
              <Link to='/load'>Load</Link>
              <Link to='/variations'>Variations</Link>
              <Link to='/campaigns'>Campaigns</Link>
              <Link to='/accounts'>Accounts</Link>
              <Link to='/verify'>Verify</Link>
              <Link to='/'>Home</Link>
            </div>
          </div>
</div>
    );
  }
}

export default App;
