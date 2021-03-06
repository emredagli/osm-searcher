import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import { connect } from 'react-redux'
import {AccessTokenMapboxGL} from '../constants'
import { bindActionCreators } from 'redux'
import { mapActionCreatorsSynced, selectFeature  } from '../redux/actions'
import { InitialState } from '../constants'
import { getCenterOfGeoJSONFeature } from '../libs/geoJson'
import './Map.scss'

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
    this.selectedFeaturePopup = null;
    this.hoveredStateId =  null;
  }

  componentDidUpdate (prevProps) {
    if (prevProps.geoJSON !== this.props.geoJSON) {
      this.updateSource(this.mapDefaultSourceId, this.props.geoJSON);
    }

    if (prevProps.colorStops !== this.props.colorStops) {
      this.setPaintPropertiesOfLayers()
    }

    if (this.props.selectedFeature) {
      if (prevProps.selectedFeature !== this.props.selectedFeature) {
        this.setMapCenterByFeature(this.props.selectedFeature);
        this.displaySelectedFeatureProperties();
      }
    } else {
      this.hideSelectedFeatureProperties()
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
      comp.setLayersEvents(comp.mapDefaultSourceId)
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
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.9,
          0.6,
        ],
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
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.6,
        ],
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
        'circle-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.5,
        ]
      },
      filter: ['==', '$type', 'Point'],
    });

  }

  setLayersEvents (sourceId) {
    const self = this

    const layerMouseMove = function (e) {
      if (e.features.length > 0) {
        if (self.hoveredStateId) {
          self.map.setFeatureState({source: sourceId, id: self.hoveredStateId}, {hover: false})
        }
        self.hoveredStateId = e.features[0].id
        self.map.setFeatureState({source: sourceId, id: self.hoveredStateId}, {hover: true})
        self.map.getCanvas().style.cursor = 'pointer';
      }
    }

    const layerMoveLeave = function () {
      if (self.hoveredStateId) {
        self.map.setFeatureState({source: sourceId, id: self.hoveredStateId}, {hover: false})
      }
      self.hoveredStateId = null
      self.map.getCanvas().style.cursor = ''
    }

    const layerClick = function (e) {
      if (e.features.length > 0 && self.props.geoJSON) {
        const clickedMapFeatureId = e.features[0].properties.id;
        const foundFeature = self.props.geoJSON.features.find((feature) => feature.id === clickedMapFeatureId);
        if (foundFeature) {
          self.props.selectFeature(foundFeature);
        }
      }
    }

    this.map.on('mousemove', sourceId + this.polygonLayerSuffix, layerMouseMove)
    this.map.on('mouseleave', sourceId + this.polygonLayerSuffix, layerMoveLeave)
    this.map.on('click', sourceId + this.polygonLayerSuffix, layerClick)

    this.map.on('mousemove', sourceId + this.pointLayerSuffix, layerMouseMove)
    this.map.on('mouseleave', sourceId + this.pointLayerSuffix, layerMoveLeave)
    this.map.on('click', sourceId + this.pointLayerSuffix, layerClick)

    this.map.on('mousemove', sourceId + this.lineLayerSuffix, layerMouseMove)
    this.map.on('mouseleave', sourceId + this.lineLayerSuffix, layerMoveLeave)
    this.map.on('click', sourceId + this.lineLayerSuffix, layerClick)
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

  isPointInBounds(point, bounds) {
    return (
      (bounds._ne.lng > point.lng && bounds._sw.lng < point.lng) &&
      (bounds._ne.lat > point.lat && bounds._sw.lat < point.lat)
    );
  }

  setMapCenterByFeature (feature) {
    const center = getCenterOfGeoJSONFeature(feature);
    if (!this.isPointInBounds(new mapboxgl.LngLat(center[0], center[1]), this.map.getBounds())) {
      this.map.flyTo({center});
    }
  }

  displaySelectedFeatureProperties () {
    if (this.selectedFeaturePopup) {
      this.selectedFeaturePopup.remove();
    }

    const selectedFeatureProps = this.props.selectedFeature.properties;
    const placeholder = document.createElement('div');
    ReactDOM.render(<div>
      <h5>{selectedFeatureProps.name}</h5>
      <p>[{this.props.lastSearchedKey}={selectedFeatureProps[this.props.lastSearchedKey]}] features highlighted</p>
    </div>, placeholder);

    const feature = this.props.selectedFeature;
    this.selectedFeaturePopup = new mapboxgl.Popup({
        closeOnClick: false,
        className: 'app-map-popup'
      })
      .setLngLat(getCenterOfGeoJSONFeature(feature))
      .setDOMContent(placeholder)
      .addTo(this.map);
  }

  hideSelectedFeatureProperties () {
    // TODO: check unmountComponentAtNode is required or not.
    if (this.selectedFeaturePopup) {
      this.selectedFeaturePopup.remove();
    }
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
    selectedFeature: state.search.selectedFeature,
    lastSearchedKey: state.search.lastSearchedKey,
    colorStops: state.search.colorStops
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({mapActionCreatorsSynced, selectFeature}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)
