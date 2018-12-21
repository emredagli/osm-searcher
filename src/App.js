import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Grid, Row, Col } from 'react-bootstrap'
import MapContainer from './containers/MapContainer'
import SearchBox from './components/SearchBox'
import SearchResultList from './components/SearchResultList'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div className="app">
          <Grid fluid className="app-container">
            <Row className="search-row">
              <Col xs={12}>
                <SearchBox />
              </Col>
            </Row>
            <Row className="search-result-row">
              <Col xs={12} sm={4} className='search-result-col'>
                <SearchResultList/>
              </Col>
              <Col xs={12} sm={8} className='search-result-col'>
                <MapContainer/>
              </Col>
            </Row>
          </Grid>
        </div>
      </Provider>
    )
  }
}

export default App
