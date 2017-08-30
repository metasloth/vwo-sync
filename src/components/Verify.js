import React from 'react'
import './Verify.css'

const Verify = () => (
  <div className="verify-wrap">
    <div className="verify">
      <p className="App-intro">
        Login With Your VWO User Token
      </p>
      <input type="text" placeholder="VWO Token"/>
      <button >Log In </button>
    </div>
  </div>
)

export default Verify
