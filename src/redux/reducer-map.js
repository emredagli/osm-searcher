import { MapActionTypes } from '@mapbox/mapbox-gl-redux'
import { InitialState } from '../constants'

// For Actions Dispatched from Map
function reducerMap(state = InitialState.map, action) {
  const map = action.map;
  switch (action.type) {
    case MapActionTypes.sync:
    case MapActionTypes.zoomend:
    case MapActionTypes.moveend:
      console.log('reducerMap, action.type: ', action.type);
      // Since getBounds returns not a plan object following part is needed:
      const {_sw:{lat:sw_lat,lng:sw_lng},_ne:{lat:ne_lat,lng:ne_lng}} = map.getBounds();
      return {
        ...state,
        zoom: map.getZoom(),
        bounds: {_sw:{lat:sw_lat,lng:sw_lng},_ne:{lat:ne_lat,lng:ne_lng}}
      }
    default:
      return state;
  }
}

export default reducerMap;
