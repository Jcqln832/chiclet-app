import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AppNav from './nav';

describe('Nav tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <AppNav />
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected -- loggedIn false', () => {
        const tree = renderer
          .create( 
            <AppNav />
          )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });

    it('renders the UI as expected -- loggedIn true', () => {
        const tree = renderer
          .create( 
            <AppNav isLoggedin={true} />
          )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});