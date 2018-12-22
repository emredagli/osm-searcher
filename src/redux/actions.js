import axios from 'axios'
import { OverpassSearchUrl, GetOverpassSearchParams, AppStates } from '../constants'
import { FETCH_SEARCH_RESULTS, CHANGE_APP_STATE, SELECT_FEATURE } from './action-types'

export function fetchSearchResult (selectedOsmKey, bbox) {
  return function (dispatch) {
    changeAppState(AppStates.LOADING)(dispatch);
    const url = OverpassSearchUrl + encodeURI(GetOverpassSearchParams(selectedOsmKey, bbox))
    axios.get(url).then((response) => dispatch({
      type: FETCH_SEARCH_RESULTS,
      data: response.data,
      lastSearchedKey: selectedOsmKey
    })).catch((response) => dispatch({
      type: FETCH_SEARCH_RESULTS,
      data: {elements: []},
    })).finally(() => {
      changeAppState(AppStates.IDLE)(dispatch)
    });
  }
}

export function mapActionCreatorsSynced (mapSyncAction) {
  return (dispatch) => {
    dispatch(mapSyncAction);
  }
}

export function changeAppState (newState) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_APP_STATE,
      newState: newState,
    })
  }
}

export function selectFeature (feature) {
  return (dispatch) => {
    dispatch({
      type: SELECT_FEATURE,
      feature: feature,
    })
  }
}
