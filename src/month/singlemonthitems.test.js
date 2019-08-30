import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import SingleMonthItems from './singlemonthitems';
import ITEMS from '../Utils/itemsList';
import testWrapper from '../Utils/testHelpers';

describe('single month list items tests', () => {
    const div = document.createElement('div');
    const monthItems = ITEMS.filter(item => item.index === 201901);
             
    it('renders without crashing', () => {
        ReactDOM.render(
            testWrapper(
                <SingleMonthItems monthItems={monthItems}/>
            )
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected with a few items', () => {
        const tree = renderer
        .create( 
            testWrapper(
                <SingleMonthItems monthItems={monthItems}/>
            )
        )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});