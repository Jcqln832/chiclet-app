import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Year from './year';

describe('Year tests', () => {
    const year = (new Date().getFullYear()).toString()

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Year year={year} />
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
          .create( 
            <Year year={year} />
          )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });

    // it('renders a previous arrow if year > current year', () => {
    //     const tree = renderer
    //       .create( 
    //         <Year />
    //       )
    //       .toJSON();
    //     expect(tree).toMatchSnapshot();  
    //
});