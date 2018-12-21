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
    this.polygonLayerSuffix = '-polygon-layer';
    this.lineLayerSuffix = '-line-layer';
    this.pointLayerSuffix = '-point-layer';
    this.map = null;
    this.mapEl = null;
  }

  componentDidUpdate (prevProps) {
    if (prevProps.geoJSON !== this.props.geoJSON) {
      this.updateSource(this.mapDefaultSourceId, this.props.geoJSON);
    }

    if (prevProps.colorStops !== this.props.colorStops) {
      this.setPaintPropertiesOfLayers()
    }

  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapEl,
      style: 'mapbox://styles/mapbox/light-v9',
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
      id: sourceId + this.polygonLayerSuffix,
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
    });

    this.map.addLayer({
      id: sourceId + this.lineLayerSuffix,
      type: 'line',
      source: sourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-opacity': 0.7,
        'line-width': 4,
      },
      filter: ['==', '$type', 'LineString'],
    });

    this.map.addLayer({
      id: sourceId + this.pointLayerSuffix,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#000000',
      },
      filter: ['==', '$type', 'Point'],
    });

  }

  setPaintPropertiesOfLayers () {
    this.setPaintPropertiesOfLayer(this.mapDefaultSourceId + this.polygonLayerSuffix, 'fill-color');
    this.setPaintPropertiesOfLayer(this.mapDefaultSourceId + this.lineLayerSuffix, 'line-color');
    this.setPaintPropertiesOfLayer(this.mapDefaultSourceId + this.pointLayerSuffix, 'circle-color');
  }

  setPaintPropertiesOfLayer (layerId, paintProperty) {
    this.map.setPaintProperty(layerId, paintProperty, {
      type: 'categorical',
      property: this.props.lastSearchedKey,
      stops: this.props.colorStops
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
    colorStops: state.search.colorStops
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({mapActionCreatorsSynced}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)
