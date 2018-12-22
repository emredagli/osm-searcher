import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import Map from '../components/Map'
import './MapContainer.scss'
import PropTypes from 'prop-types'

class MapContainer extends Component {
  render () {
    return (
      <Panel className='map-container'>
        <Panel.Heading>
          <Panel.Title componentClass="h3"><span>Results on Map</span><span className={'zoom-info'}>Current Zoom: {this.props.zoom.toFixed(1)}</span></Panel.Title>
        </Panel.Heading>
        <Panel.Body className='mapbox-container'>
          <Map/>
        </Panel.Body>
      </Panel>
    )
  }
}

MapContainer.propTypes = {
  zoom: PropTypes.number.isRequired
}


function mapStateToProps (state) {
  return {
    zoom: state.map.zoom
  }
}

export default connect(mapStateToProps)(MapContainer)
