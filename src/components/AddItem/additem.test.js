import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AddItem from './additem';
import ITEMS from '../../Utils/itemsList';
import testWrapper from '../../Utils/testHelpers';

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
                <AddItem month={"January"} monthIndex={201901} addItem={()=>{}} monthItems={ITEMS.filter(item => item.index === 201901)}/>
            )
        )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});