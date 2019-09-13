import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Registration from './register';

describe('Registration form', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Registration />
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

});