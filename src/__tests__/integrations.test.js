import React from 'react';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import SearchBox from '../components/SearchBox';
import SearchResultList from '../components/SearchResultList';
import Root from '../Root';
import { OverpassAPIUrl } from '../constants'
import overpassApiInitialResultData from '../assets/data/initial-overpass-api-data'

describe('SearchBox', () => {

  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(OverpassAPIUrl, {
      status: 200,
      response: overpassApiInitialResultData
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('can fetch results from API', (done) => {

  // TODO: Following mount not generated from App because Mapbox GL JS mock can not be installed. After mock fix following mock part need to be changed
    const wrapped = mount(
      <Root>
        <SearchBox />
        <SearchResultList />
      </Root>
    );

    wrapped.find('button.search-button').simulate('click');

    moxios.wait(() => {
      wrapped.update();

      expect(wrapped.find('.search-result-panel .list-group-item').length).toEqual(63);

      done();
      wrapped.unmount();
    });
  });
});
