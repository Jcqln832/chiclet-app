import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MonthItems from './monthitems';
import MONTHS from '../Utils/monthsList';
import ITEMS from '../Utils/itemsList';

describe('list items test', () => {
    const div = document.createElement('div');
    const items= ITEMS
    const gridItems = items.filter(item => Number(item.index) === 201902)

    it('renders without crashing', () => {
        ReactDOM.render(
            <MonthItems gridItems= {gridItems} />
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected with a few items', () => {
        const tree = renderer
        .create( 
            <MonthItems gridItems= {gridItems} />
        )
        
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });

});
