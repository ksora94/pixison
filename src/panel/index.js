import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'
import {render} from 'react-dom';
import App from 'panel/containers/App';
import store from './store';
import 'css/public/index.scss';

// document.oncontextmenu = function () {return false};

render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
, document.getElementById('app'));