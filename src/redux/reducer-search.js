import { FETCH_SEARCH_RESULTS } from './action-types'
import { InitialState } from '../constants'
import { convertOSMOverpassResultToGeoJSON } from '../libs/geoJson'

// For Actions Dispatched from Search Box and Search Result List
function reducerSearch(state = InitialState.search, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      return {
        ...state,
        geoJSON: convertOSMOverpassResultToGeoJSON(action.data),
        lastSearchedKey: action.lastSearchedKey || null
      };

    default:
      return state;
  }
}

export default reducerSearch;
