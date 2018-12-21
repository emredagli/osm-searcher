import axios from 'axios'
import { OverpassSearchUrl, GetOverpassSearchParams } from '../constants'
import { FETCH_SEARCH_RESULTS } from './action-types'

export function fetchSearchResult (selectedOsmKey, bbox) {
  return function (dispatch) {
    const url = OverpassSearchUrl + encodeURI(GetOverpassSearchParams(selectedOsmKey, bbox))
    axios.get(url).then((response) => dispatch({
      type: FETCH_SEARCH_RESULTS,
      data: response.data,
      lastSearchedKey: selectedOsmKey
    })).catch((response) => dispatch({
      type: FETCH_SEARCH_RESULTS,
      data: {elements: []},
    }));
  }
}

export function mapActionCreatorsSynced (mapSyncAction) {
  return (dispatch) => {
    dispatch(mapSyncAction);
  }
}
