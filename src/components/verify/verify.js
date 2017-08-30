import React from 'react'
import './verify.css'
import VWO from '../../lib/vwo-api'
import { withRouter } from 'react-router-dom'
const vwo = new VWO()


class Verify extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.tokenSubmit = this.tokenSubmit.bind(this)
    this.tokenVerified = this.tokenVerified.bind(this)
    this.res = this.res
    this.state = {
      verified: false,
      verifiedStatus: 'None',
      token: ''
    }
  }

  tokenSubmit() {
    this.setState({verifiedStatus: 'Verifying...'})
    let vwo = new VWO(this.state.token)
    vwo.verifyToken(this.tokenVerified)

    }
  

  tokenVerified(res){
    if (res){
      localStorage.setItem('userVerified', 'true')
      localStorage.setItem('vwoToken', this.state.token)
    }
  }

  handleChange(e) {
    this.setState({token: e.target.value})
  }

  render() {
    const token = this.state.token
    const verifiedStatus = this.state.verifiedStatus
    return (
      <div className="verify-wrap">
        <div className="verify">
          <p className="App-intro">
            Login With Your VWO User Token
          </p>

            <input type="text" placeholder="VWO Token" value={token} onChange={this.handleChange}/>
            <button onClick={this.tokenSubmit}>Log In</button>

          <p className="App-intro">{verifiedStatus}</p>
        </div>
      </div>
    )
  }

  
}

export default Verify
