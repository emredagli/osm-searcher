import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Panel, ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectFeature } from '../redux/actions'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import scrollIntoView from 'scroll-into-view-if-needed'

import './SearchResultList.scss'

function FeatureListItem ({color, propValue, name, selected, clickHandler}) {
  return (
    <li className={classNames('list-group-item', { active: selected })} onClick={clickHandler}>
      <span style={{color}}>="{propValue}</span>" <span>, {name}</span>
    </li>
  )
}

class SearchResultList extends Component {
  constructor (props) {
    super(props)
    this.listContainer = null;
    this.listContainerEl = null;
  }

  componentDidUpdate (prevProps) {
    if (this.props.selectedFeature && this.listContainer) {
      if (prevProps.selectedFeature !== this.props.selectedFeature) {
        scrollIntoView(this.listContainerEl.querySelector('.active'), {
          scrollMode: 'if-needed',
          block: 'center'
        })
      }
    }
  }

  componentDidMount() {
    this.listContainerEl = ReactDOM.findDOMNode(this.listContainer);
    // set el height and width etc.
  }

  featureSelected(index) {
    this.props.selectFeature(this.props.features[index]);
  }

  render () {
    const selectedFeatureKey = this.props.selectedFeature ? this.props.selectedFeature.id : null;
    return (
      <Panel className='search-result-panel'>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{`${this.props.features.length} feature(s) found for key="${this.props.lastSearchedKey}"`}</Panel.Title>
        </Panel.Heading>
        <ListGroup ref={(el) => this.listContainer = el} componentClass="ul">{this.props.features.map(
          (feature, index) => {
            const {properties} = feature;
            const lastSearchedKey = this.props.lastSearchedKey;
            const featurePropValue = properties[lastSearchedKey];
            const featureItemProps = {
              key: index,
              color: this.props.resultColorMap[featurePropValue],
              propValue: properties[lastSearchedKey] || '-',
              name: properties.name,
              selected: feature.id === selectedFeatureKey,
              clickHandler: () => this.featureSelected(index)
            }
            return <FeatureListItem {...featureItemProps} />
          })}
        </ListGroup>
      </Panel>
    )
  }
}

SearchResultList.propTypes = {
  selectedFeature: PropTypes.object,
  lastSearchedKey: PropTypes.string,
  features: PropTypes.array
}

function mapStateToProps (state) {
  const {geoJSON: {features}} = state.search;
  return {
    lastSearchedKey: state.search.lastSearchedKey,
    selectedFeature: state.search.selectedFeature,
    resultColorMap: state.search.resultColorMap,
    features,
  }
}

const mapDispatchToProps = {selectFeature};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultList)
