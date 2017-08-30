import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Verify from './verify/verify.js'
import Dashboard from './Dashboard'

const Main = () => (
  <main>
    <div className='mainRoutes'>
      <Link to='/'>Home</Link>
      <Link to='/verify'>Verify</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </div>
    <Switch>
      <Route exact path='/' render={()=> (
        localStorage.getItem('userVerified') === 'true' ? (
          <Redirect to='/dashboard' />
        ) : (
          <Redirect to='/verify' />
        )
      )} />
      <Route path='/verify' component={Verify} />
      <Route path='/dashboard' component={Dashboard} />
    </Switch>
  </main>
)

export default Main
