import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorWidget from './ErrorWidget';

Enzyme.configure({ adapter: new Adapter() });

function setup(error) {
  const props = {
    error
  };
  const enzymeWrapper = shallow(<ErrorWidget {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('CityContainer component', () => {
  it('should render error from response', () => {
    const message = 'Error has occurred 19475';
    const {enzymeWrapper} = setup({
      response: {
        body: {
          message
        }
      }
    });
    expect(enzymeWrapper.find('p').text()).toEqual(message);
  });
  it('should render generic error message if response body missing', () => {
    const genericMessage = 'Unknown error occurred. Please try again later';
    const {enzymeWrapper} = setup({
      response: {
      }
    });
    expect(enzymeWrapper.find('p').text()).toEqual(genericMessage);
  });
});
