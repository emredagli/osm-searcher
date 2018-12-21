import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import MapContainer from './containers/MapContainer'
import SearchBox from './components/SearchBox'
import SearchResultList from './components/SearchResultList'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Grid fluid className="app-container">
          <Row className="search-row">
            <Col xs={12}>
              <SearchBox/>
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

    );
  }
}

export default App;
