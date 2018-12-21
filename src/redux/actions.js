import axios from 'axios'
import { OverpassSearchUrl, GetOverpassSearchParams } from '../constants'
import { FETCH_SEARCH_RESULTS } from './action-types'

export function fetchSearchResult (selectedOsmKey) {
  return function (dispatch) {
    const url = OverpassSearchUrl + encodeURI(GetOverpassSearchParams(selectedOsmKey))
    axios.get(url).then((response) => dispatch({
      type: FETCH_SEARCH_RESULTS,
      data: response.data,
    })).catch((response) => {
      // Catch...
    });
  }
}

export function mapActionCreatorsSynced (mapSyncAction) {
  return (dispatch) => {
    dispatch(mapSyncAction);
  }
}
