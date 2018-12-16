import React from 'react'
import mapboxgl from 'mapbox-gl'
import {AccessTokenMapboxGL} from '../constants'

mapboxgl.accessToken = AccessTokenMapboxGL;

class Map extends React.Component {
  map;

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapEl,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [0, 0],
      zoom: 2
    });
  }

  render() {
    return (
      <div ref={el => this.mapEl = el} className="absolute top right left bottom" />
    );
  }
}

export default Map;
