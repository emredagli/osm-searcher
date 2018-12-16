import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

class SearchResultList extends Component {
  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Search Results</Panel.Title>
        </Panel.Heading>
        <Panel.Body>Search Result List</Panel.Body>
      </Panel>
    )
  }
}

export default SearchResultList
