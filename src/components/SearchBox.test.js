import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBox from './SearchBox';
import Root from '../Root';

it('renders without crashing', () => {
  shallow(<SearchBox />);
});

let wrapped;

describe('SearchBox', () => {
  beforeEach(() => {
    wrapped = mount(<Root><SearchBox /></Root>);
  });

  it('shows a dropdowns', () => {
    expect(wrapped.find('select').length).toEqual(1);
  });
});

