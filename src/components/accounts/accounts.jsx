import React from 'react'
import './accounts.css'

/*
  VWO Format
    Accounts = [{
      id
      name
      createdOn
      enabled
    }]
*/

function Account(props) {
  return (
    <div className='account' key={props.accountId} value={props.accountId}>
      <p className='account-name'>{props.accountName}</p>
      <p className='account-id'>{props.accountId}</p>
      <p className='account-date'>{props.accountDate}</p>
    </div>
  )
}

class Accounts extends React.Component {
  renderAccount(id, name, date) {
    return (
      <Account
        accountId={id}
        accountName={name}
        accountDate={date}
      />
    )
  }

  render() {
    // Array of account elements
    const renderedAccounts = []

    // Check if accounts are already populated
    if (this.props.accounts.length == 0) {
      this.props.getAccounts()
    }

    // Render Each Account
    for (let i = 0; i < this.props.accounts.length; ++i) {
      let tmp = this.props.accounts[i]
      if (tmp.enabled) {
        renderedAccounts.push(this.renderAccount(
          tmp.id,
          tmp.name,
          tmp.createdOn
        ))
      }
    }

    return (
      <div className="account-wrap">
        <p> oh look at all these accounts! </p>
        <div>
          {renderedAccounts}
        </div>
      </div>
    )
  }

}
export default Accounts
