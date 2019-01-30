import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import BlogHome from './pages/BlogHome';
import BlogPost from './pages/BlogPost';

const Routes = () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <main className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Redirect exact from="/p" to="/p/1" />
                    <Route path="/p/:page" component={BlogHome} />
                    <Route path="/post/:slug" component={BlogPost} />
                </Switch>
            </main>
            <Footer />
        </div>
    </BrowserRouter>
);

export default Routes;
