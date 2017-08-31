import React from 'react'
import './variations.css'

/*
  VWO Format
    variations = [{
      id
      name
      createdOn
      enabled
    }]
*/

function Variation(props) {
  return (
    <div className='variation' value={props.variationId}>
      <p className='variation-name'>{props.variationName}</p>
      <p className='variation-id'>{props.variationId}</p>
      <p className='variation-status'>{props.campaignStatus}</p>
    </div>
  )
}

class Variations extends React.Component {
  renderCampaign(id, name, status) {
    return (
      <Variation
        key={id}
        variationId={id}
        variationName={name}
        campaignStatus={status}
        clickHandler={this.props.setAccount}
      />
    )
  }

  render() {
    // Array of variation elements
    const renderedVariations = []

    // Render Each 
    for (let i = 0; i < this.props.variations.length; ++i) {
      let tmp = this.props.variations[i]
        renderedVariations.push(this.renderCampaign(
          tmp.id,
          tmp.name,
          tmp.status
        ))
    }

    return (
      <div className="variation-wrap">
        <p> oh look at all these variations! </p>
        <div>
          {renderedVariations}
        </div>
      </div>
    )
  }

}
export default Variations
