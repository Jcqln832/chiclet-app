import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import SingleMonth from './month';
import MONTHS from '../../Utils/monthsList';
import ITEMS from '../../Utils/itemsList';
import testWrapper from '../../Utils/testHelpers';

describe('single month tests', () => {
    const div = document.createElement('div');

    const month = MONTHS.find(month => month.id === "01");
    const doRedirect = () => history.push('/months');
    const year = new Date().getFullYear();
    const monthName = month.name;
    const monthItems = ITEMS.filter(item => item.index === 201901);
             

    it('renders without crashing', () => {
        ReactDOM.render(
            testWrapper(
                <SingleMonth doRedirect={doRedirect} year={year} monthName={monthName} monthIndex={201901} monthItems={monthItems}/>
            )
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected with a few items', () => {
        const tree = renderer
        .create( 
            testWrapper(
                <SingleMonth doRedirect={doRedirect} year={year} monthName={monthName} monthIndex={201901} monthItems={monthItems}/>
            )
        )
          .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});