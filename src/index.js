import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reduxStore from './reduxStore';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={reduxStore}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

registerServiceWorker();
