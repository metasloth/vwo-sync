import React from 'react'
import './verify.css'
import { Redirect } from 'react-router-dom'

class Verify extends React.Component {
  constructor(props) {
    super(props)
    this.token = props.token
    this.handleChange = this.handleChange.bind(this);
    //this.tokenSubmit = this.tokenSubmit.bind(this)
    this.tokenVerified = this.tokenVerified.bind(this)
    this.state = {
      verified: false,
      verifiedStatus: 'None',
      redirectToDash: false,
      token: (localStorage.getItem('vwoToken')) ? localStorage.getItem('vwoToken') : ''
    }
  }

  // tokenSubmit() {
  //   this.setState({ verifiedStatus: 'Verifying...' })
  //   this.VWO.verifyToken(this.tokenVerified)
  // }

  tokenVerified(res) {
    if (res) {
      this.setState({ verifiedStatus: 'Verified!' })
      localStorage.setItem('userVerified', 'true')
      localStorage.setItem('vwoToken', this.state.token)
      this.setState({ redirectToDash: true })
    } else {
      this.setState({ verifiedStatus: 'What was that shit?' })
      localStorage.setItem('userVerified', 'false')
    }
  }

  handleChange(e) {
    //this.props.testVal.setState(e.target.value)
    //this.props.updateVal({props.testVal: e.target.value})
  }

  render() {
    const token = this.state.token
    const verifiedStatus = this.state.verifiedStatus
    const {redirectToDash} = this.state

    if (redirectToDash) {
      return (
        <Redirect to='/dashboard'/>
      )
    }

    return (
      <div className="verify-wrap">
        <div className="verify">
          <p className="App-intro">
            Login With Your VWO User Token
          </p>
          <input type="text" placeholder="VWO Token" value={this.props.vwoToken} onChange={this.props.updateToken} />
          <button >Log In</button>
          <p className="App-intro">{verifiedStatus}</p>
        </div>
      </div>
    )
  }
}

export default Verify
