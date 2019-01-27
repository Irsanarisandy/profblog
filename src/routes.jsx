import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import BlogHome from './pages/BlogHome';
import BlogPost from './pages/BlogPost';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Redirect exact from="/p" to="/p/1" />
            <Route path="/p/:page" component={BlogHome} />
            <Route path="/post/:slug" component={BlogPost} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
