import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Shablon-style.css';

import SinglePost from './SinglePost';
import MainPage from './MainPage';
import FirstPage from './FirstPage';

export default function Home () {

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={FirstPage}   />
            <Route exact path="/post" component={MainPage} />
            <Route exact path="/post:slug" component={SinglePost} />
          </Switch>
        </Router>
      </div>
    )
}