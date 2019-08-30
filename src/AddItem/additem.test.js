import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AddItem from './additem';
import ITEMS from '../Utils/itemsList';
import testWrapper from '../Utils/testHelpers';

describe('single month list items tests', () => {
    const div = document.createElement('div');
             
    it('renders without crashing', () => {
        ReactDOM.render(
            testWrapper(
                <AddItem />
            )
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create( 
            testWrapper(
                <AddItem />
            )
        )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});

// month = {props.monthName}
// monthIndex = {props.monthIndex}
// addItem = {props.addItem}
// monthItems = {props.monthItems}