import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Landing from './landing';
import testWrapper from '../Utils/testHelpers';

describe('landing page renders', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        testWrapper(
            <Landing />
        ),div);
    ReactDOM.unmountComponentAtNode(div);
  });
})