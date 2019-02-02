import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import BlogHome from './pages/BlogHome';
import BlogPost from './pages/BlogPost';

class Routes extends React.Component {
    constructor() {
        super();
        this.state = {
            mobileMenuState: false
        }
    }

    openMobileMenu = () => {
        this.setState({ mobileMenuState: true }, () => {
            // activates after the state has been set
            document.body.style.overflow = 'hidden';
        });
    };

    closeMobileMenu = () => {
        this.setState({ mobileMenuState: false }, () => {
            // activates after the state has been set
            document.body.style.overflow = 'visible';
        });
    }

    render() {
        let { mobileMenuState } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Sidebar onClick={this.closeMobileMenu} mobileMenuState={mobileMenuState} />
                    <Navbar onClick={this.openMobileMenu} />
                    <div className={`overlay${mobileMenuState ? '--show' : ''}`} onClick={this.closeMobileMenu} />
                    <main className="container">
                        <Helmet>
                            <title>ProfBlog (React)</title>
                        </Helmet>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Redirect exact from="/p" to="/p/1" />
                            <Redirect exact from="/post" to="/p/1" />
                            <Route path="/p/:page" component={BlogHome} />
                            <Route path="/post/:slug" component={BlogPost} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default Routes;
