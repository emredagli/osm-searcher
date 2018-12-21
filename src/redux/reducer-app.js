import { InitialState } from '../constants'

// For Application Actions like loading
function reducerApp(state = InitialState.app, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducerApp;
