import { InitialState } from '../constants'
import { CHANGE_APP_STATE } from './action-types'

// For Application Actions like loading
function reducerApp(state = InitialState.app, action) {
  switch (action.type) {
    case CHANGE_APP_STATE:
      return {
        ...state,
        status: action.newState
      };
    default:
      return state;
  }
}

export default reducerApp;
