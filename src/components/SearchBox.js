import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSearchResult } from '../redux/actions'
import { FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap'

import { SearchOSMKeys } from '../constants'

class SearchBox extends Component {
  constructor (props) {
    super(props)

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this)

    this.state = {
      value: SearchOSMKeys[0],
    }
  }

  onSearchChange (event) {
    this.setState({value: event.target.value})
  }

  onSearchFormSubmit (event) {
    event.preventDefault()
    // We need to fetch From Overpass Api
    this.props.fetchSearchResult(this.state.value);
  }

  render () {
    return (
      <form onSubmit={this.onSearchFormSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>
              <a href="https://wiki.openstreetmap.org/wiki/Map_Features" target="_blank" rel="noopener noreferrer">Please select an OSM [key]:</a>
            </InputGroup.Addon>
            <FormControl componentClass="select" placeholder="Please Select an OSM Key" value={this.state.value} onChange={this.onSearchChange}>
              {SearchOSMKeys.map(key => <option key={key} value={key}>"{key}"</option>)}
            </FormControl>
            <InputGroup.Button>
              <Button type="submit" className='btn-primary'>Search on the map</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchSearchResult}, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBox)

