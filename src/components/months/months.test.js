import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Months from './months';
import MONTHS from '../Utils/monthsList';
import ITEMS from '../Utils/itemsList';
import testWrapper from '../Utils/testHelpers';

describe('12-month grid test', () => {
    const div = document.createElement('div');
    const items= ITEMS
    const year = (new Date().getFullYear()).toString()
    const prevButton = false
  
    it('renders without crashing', () => {
        ReactDOM.render(
            testWrapper(
                <Months items= {items} year= {year} prevButton= {prevButton}/>
            )
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected with a few items', () => {
        const tree = renderer
          .create( 
            testWrapper(<Months items= {items} year= {year} prevButton= {prevButton} />)
          )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });

    it('renders the UI as expected when prevButton is TRUE', () => {
        const tree = renderer
          .create( 
            testWrapper(<Months items= {items} year= {year} prevButton= {true} />)
          )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});

