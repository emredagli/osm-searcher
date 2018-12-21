import React, { Component } from 'react'
import { Panel, ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import './SearchResultList.scss'

function FeatureListItem ({color, propValue, name}) {
  return (
    <li className={'list-group-item'}>
      <span style={{color}}>="{propValue}</span>" <span>, {name}</span>
    </li>
  )
}

class SearchResultList extends Component {
  render () {
    return (
      <Panel className='search-result-panel'>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{`${this.props.features.length} feature(s) found for key="${this.props.lastSearchedKey}"`}</Panel.Title>
        </Panel.Heading>
        <ListGroup componentClass="ul">{this.props.features.map(
          (feature, index) => {
            const {properties} = feature;
            const lastSearchedKey = this.props.lastSearchedKey;
            const featurePropValue = properties[lastSearchedKey];
            const featureItemProps = {
              key: index,
              color: this.props.resultColorMap[featurePropValue],
              propValue: properties[lastSearchedKey] || '-',
              name: properties.name
            }
            return <FeatureListItem {...featureItemProps} />
          })}
        </ListGroup>
      </Panel>
    )
  }
}

function mapStateToProps (state) {
  const {geoJSON: {features}} = state.search;
  return {
    lastSearchedKey: state.search.lastSearchedKey,
    resultColorMap: state.search.resultColorMap,
    features,
  }
}

export default connect(mapStateToProps)(SearchResultList)
