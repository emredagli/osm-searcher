import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import reducer from './redux/reducer';

export default ({ children, initialState = {} }) => {
  const store = createStore(reducer, applyMiddleware(ReduxThunk))

  return <Provider store={store}>{children}</Provider>;
};
