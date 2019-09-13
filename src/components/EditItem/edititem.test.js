import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import EditItem from './edititem';
import ITEMS from '../Utils/itemsList';
import testWrapper from '../Utils/testHelpers';

describe('single month list items tests', () => {
    const div = document.createElement('div');
    const item = ITEMS.find(item => item.id === "01");
    const updateItem = {};
    const deleteItem = {};
             
    it('renders without crashing', () => {
        ReactDOM.render(
            testWrapper(
                <EditItem item={item}/>
            )
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create( 
            testWrapper(
                <EditItem item={item}/>
            )
        )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});


