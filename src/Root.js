import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import reducer from './redux/reducer';
import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'

export default ({ children, initialState = {} }) => {
  const store = createStore(reducer, applyMiddleware(ReduxThunk, MapboxGLRedux.mapMiddleware))

  return <Provider store={store}>{children}</Provider>;
};
