import React from 'react'
import './campaigns.css'

/*
  VWO Format
    campaigns = [{
      id
      name
      createdOn
      enabled
    }]
*/

function Campaign(props) {
  return (
    <div className='campaign' onClick={props.clickHandler} value={props.campaignId}>
      <p className='campaign-name'>{props.campaignName}</p>
      <p className='campaign-id'>{props.campaignId}</p>
      <p className='campaign-status'>{props.campaignStatus}</p>
    </div>
  )
}

class Campaigns extends React.Component {
  renderCampaign(id, name, status) {
    return (
      <Campaign
        key={id}
        campaignId={id}
        campaignName={name}
        campaignStatus={status}
        clickHandler={this.props.setCampaign}
      />
    )
  }

  componentDidMount(){
    if (this.props.campaigns == 0) this.props.getCampaigns()
  }

  render() {
    // Array of campaign elements
    const renderedCampaigns = []

    // Render Each 
    for (let i = 0; i < this.props.campaigns.length; ++i) {
      let tmp = this.props.campaigns[i]
        renderedCampaigns.push(this.renderCampaign(
          tmp.id,
          tmp.name,
          tmp.status
        ))
    }

    

    return (
      <div className="campaign-wrap">
        <p> oh look at all these campaigns! </p>
        <div>
          {renderedCampaigns}
        </div>
      </div>
    )
  }

}
export default Campaigns
