import React from 'react'
import mapboxgl from 'mapbox-gl'
import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import { connect } from 'react-redux'
import {AccessTokenMapboxGL} from '../constants'
import { bindActionCreators } from 'redux'
import { mapActionCreatorsSynced } from '../redux/actions'

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

    const comp = this
    this.map.on('load', () => {
      const reduxMapControl = new MapboxGLRedux.ReduxMapControl(comp.mapEl);
      comp.map.addControl(reduxMapControl);
      comp.props.mapActionCreatorsSynced(reduxMapControl.MapActionCreators.sync());
    })
  }

  render() {
    return (
      <div ref={el => this.mapEl = el} className="absolute top right left bottom" />
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({mapActionCreatorsSynced}, dispatch)
}
export default connect(null, mapDispatchToProps)(Map)
