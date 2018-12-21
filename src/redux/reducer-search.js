import { FETCH_SEARCH_RESULTS } from './action-types'
import { InitialState } from '../constants'
import { getColorMapFromProperty, convertColorMapToColorStops } from '../libs/colorMap'
import { convertOSMOverpassResultToGeoJSON } from '../libs/geoJson'

// For Actions Dispatched from Search Box and Search Result List
function reducerSearch(state = InitialState.search, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:

      const newGeoJSON = convertOSMOverpassResultToGeoJSON(action.data);
      const colorMap = getColorMapFromProperty(newGeoJSON, action.lastSearchedKey);
      const colorStops = convertColorMapToColorStops(colorMap);

      return {
        ...state,
        geoJSON: newGeoJSON,
        lastSearchedKey: action.lastSearchedKey || null,
        resultColorMap: colorMap,
        colorStops: colorStops
      };

    default:
      return state;
  }
}

export default reducerSearch;
