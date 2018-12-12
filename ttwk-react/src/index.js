import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import './static/css/common.scss'

import './static/js/common'

import Home from './view/home/home'

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact to="/" component={Home} />
            <Route component={Home} />
        </Switch>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
