import React from 'react'
import mapboxgl from 'mapbox-gl'
import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import { connect } from 'react-redux'
import {AccessTokenMapboxGL} from '../constants'
import { bindActionCreators } from 'redux'
import { mapActionCreatorsSynced } from '../redux/actions'
import { InitialState } from '../constants'

mapboxgl.accessToken = AccessTokenMapboxGL;

class Map extends React.Component {

  constructor (props) {
    super(props);
    this.mapDefaultSourceId = 'osm-search-source';
    this.map = null;
    this.mapEl = null;
  }

  componentDidUpdate (prevProps) {
    if (prevProps.geoJSON !== this.props.geoJSON) {
      this.updateSource(this.mapDefaultSourceId, this.props.geoJSON);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapEl,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: InitialState.center,
      zoom: InitialState.map.zoom
    });

    const comp = this
    this.map.on('load', () => {
      const reduxMapControl = new MapboxGLRedux.ReduxMapControl(comp.mapEl);
      comp.map.addControl(reduxMapControl);
      comp.props.mapActionCreatorsSynced(reduxMapControl.MapActionCreators.sync());

      comp.addSource(comp.mapDefaultSourceId, comp.props.geoJSON)
      comp.addLayersToSource(comp.mapDefaultSourceId)
      comp.setPaintPropertiesOfLayers()
    })
  }

  addSource (sourceId, geoJSON) {
    this.map.addSource(sourceId, {
      type: 'geojson',
      data: geoJSON,
      attribution: 'Overpass API © OpenStreetMap contributors',
      generateId: true,
    })
  }

  updateSource (sourceId, geoJSON) {
    if (this.map) {
      const source = this.map.getSource(sourceId);
      if (source) {
        source.setData(geoJSON);
      }
    }
  }

  addLayersToSource (sourceId) {
    this.map.addLayer({
      id: sourceId + '-Polygon-Layer',
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-opacity': 0.6,
        'fill-outline-color': '#000000',
      },
      filter: [
        'match',
        ['geometry-type'],
        ['Polygon', 'MultiPolygon'],
        true,
        false],
    })
  }

  setPaintPropertiesOfLayers () {
    this.setPaintPropertiesOfLayer(this.mapDefaultSourceId + '-Polygon-Layer', 'fill-color')
  }

  setPaintPropertiesOfLayer (layerId, paintProperty) {
    this.map.setPaintProperty(layerId, paintProperty, {
      type: 'categorical',
      property: this.props.lastSearchedKey,
      // TODO: Need to map props value to color function. Hash can be used for consistency.
      stops: [['grass','#FF00FF'],['residental','#FFFF00']],
    })
  }

  render() {
    return (
      <div ref={el => this.mapEl = el} className="absolute top right left bottom" />
    );
  }
}

function mapStateToProps (state) {
  return {
    geoJSON: state.search.geoJSON,
    lastSearchedKey: state.search.lastSearchedKey,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({mapActionCreatorsSynced}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)
