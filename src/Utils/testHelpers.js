import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const testWrapper = (component) => {
    return <BrowserRouter>
        component
    </BrowserRouter>
}

export default testWrapper