import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'
import {render} from 'react-dom';
import App from 'panel/containers/App';
import 'css/index.scss';

render(
        <Router>
            <App/>
        </Router>
    , document.getElementById('app'));