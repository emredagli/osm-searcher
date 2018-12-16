import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import Map from '../components/Map'

class MapContainer extends Component {
  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Results on Map</Panel.Title>
        </Panel.Heading>
        <Panel.Body className='map-container'>
          <Map/>
        </Panel.Body>
      </Panel>
    )
  }
}

export default MapContainer
