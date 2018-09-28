import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'
import {render} from 'react-dom';
import App from 'option/containers/App';
import 'css/index.scss';
import 'rsuite/styles/less/index.less';

render(
        <Router>
            <App/>
        </Router>
    , document.getElementById('app'));