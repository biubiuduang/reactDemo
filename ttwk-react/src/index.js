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
import List from './view/list/list'
import Header from './component/header/header'
import Detail from "./view/detail/detail";


ReactDOM.render(
    <Router>
        <div className="content-body">
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/list" component={List} />
                <Route exact path="/detail" component={Detail} />
                <Route component={Home} />
            </Switch>

        </div>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
