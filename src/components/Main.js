import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Verify from './Verify'
import Dashboard from './Dashboard'

//const electron = window.require('electron');
// const fs = electron.remote.require('fs');
// const ipcRenderer  = electron.ipcRenderer;

localStorage.setItem('userVerified', 'false')


const Main = () => (
  <main>
    <Link to='/'>Home</Link><br/>
    <Link to='/verify'>Verify</Link><br/>
    <Link to='/dashboard'>Dashboard</Link>
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
