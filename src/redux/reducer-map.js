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
      return {
        ...state,
        zoom: map.getZoom()
      }
    default:
      return state;
  }
}

export default reducerMap;
