import React, { Component } from 'react'
import { FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap'

class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this)
  }

  onSearchFormSubmit (event) {
    event.preventDefault()
    // We need to fetch From Overpass Api
  }

  render () {
    return (
      <form onSubmit={this.onSearchFormSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>
              <a href="https://wiki.openstreetmap.org/wiki/Map_Features" target="_blank" rel="noopener noreferrer">Please select an OSM [key]:</a>
            </InputGroup.Addon>
            <FormControl componentClass="select" placeholder="Please Select an OSM Key">
              <option key={'key1'} value='landuse'>landuse</option>
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

export default SearchBox

