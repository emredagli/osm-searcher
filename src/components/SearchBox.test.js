import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBox from './SearchBox';

it('renders without crashing', () => {
  shallow(<SearchBox />);
});

describe('SearchBox', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = mount(<SearchBox />);
  });

  it('shows a dropdowns', () => {
    expect(wrapped.find('select').length).toEqual(1);
  });
});

