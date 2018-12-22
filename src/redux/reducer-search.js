import { FETCH_SEARCH_RESULTS, SELECT_FEATURE } from './action-types'
import { InitialState } from '../constants'
import { getColorMapFromProperty, convertColorMapToColorStops, getHighlightedColorStops } from '../libs/colorMap'
import { convertOSMOverpassResultToGeoJSON, sortGeoJSONFeaturesByProperty } from '../libs/geoJson'

// For Actions Dispatched from Search Box and Search Result List
function reducerSearch(state = InitialState.search, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:

      const lastSearchedKey = action.lastSearchedKey || null;
      const newGeoJSON = convertOSMOverpassResultToGeoJSON(action.data);
      sortGeoJSONFeaturesByProperty(newGeoJSON, lastSearchedKey);
      const colorMap = getColorMapFromProperty(newGeoJSON, action.lastSearchedKey);

      return {
        ...state,
        geoJSON: newGeoJSON,
        lastSearchedKey,
        resultColorMap: colorMap,
        selectedFeature: null,
        colorStops: convertColorMapToColorStops(colorMap)
      };
    case SELECT_FEATURE:
      const selectedFeature = state.selectedFeature === action.feature ? null : action.feature;
      const selectedFeaturePropValue = selectedFeature ? selectedFeature.properties[state.lastSearchedKey] : null;
      const colorStops = selectedFeature ?
                            getHighlightedColorStops(state.resultColorMap, selectedFeaturePropValue) :
                            convertColorMapToColorStops(state.resultColorMap);
      return {
        ...state,
        selectedFeature: selectedFeature,
        colorStops: colorStops
      };
    default:
      return state;
  }
}

export default reducerSearch;
