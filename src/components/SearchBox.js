import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSearchResult } from '../redux/actions'
import { FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap'
import classNames from 'classnames'
import { SearchOSMKeys, InitialState } from '../constants'

class SearchBox extends Component {
  constructor (props) {
    super(props)

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this)

    this.state = {
      value: props.value,
    }
  }

  onSearchChange (event) {
    this.setState({value: event.target.value})
    this.search();
  }

  onSearchFormSubmit (event) {
    event.preventDefault();
    this.search();
  }

  search () {
    if (this.props.searchDisabled) {return;}
    // Fetch Data From Overpass Api
    this.props.fetchSearchResult(this.state.value, this.props.bounds);
  }

  render () {
    let buttonAttributes = {};
    if (this.props.searchDisabled) {
      buttonAttributes.title = `Please zoom the map in to search. \nThe zoom level should be greater than ${InitialState.map.zoom}.`;
    }

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
              <Button type="submit" className={classNames('btn-primary', 'search-button', {disabled:this.props.searchDisabled})} {...buttonAttributes}>Search on the map</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return {
    bounds: state.map.bounds,
    value: state.search.lastSearchedKey,
    searchDisabled: state.map.zoom < InitialState.map.zoom
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchSearchResult}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)

