import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import MapContainer from './containers/MapContainer'
import SearchBox from './components/SearchBox'
import SearchResultList from './components/SearchResultList'
import classNames from 'classnames';
import { AppStates } from './constants'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import PropTypes from 'prop-types'

class App extends Component {
  render () {
    return (
      <div className={classNames('app', {loading: this.props.status === AppStates.LOADING})}>
        <Grid fluid className="app-container">
          <Row className="search-row">
            <Col xs={12}>
              <SearchBox value={this.props.lastSearchedKey}/>
            </Col>
          </Row>
          <Row className="search-result-row">
            <Col xsHidden sm={4} className='no-padding-right'>
              <SearchResultList/>
            </Col>
            <Col xs={12} sm={8}>
              <MapContainer/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

App.propTypes = {
  status: PropTypes.oneOf(Object.keys(AppStates)).isRequired
}

App.defaultProps = {
  status: AppStates.IDLE
};

function mapStateToProps (state) {
  return {
    status: state.app.status,
    lastSearchedKey: state.search.lastSearchedKey
  }
}

export default connect(mapStateToProps)(App)
