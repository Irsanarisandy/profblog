import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
    }

    onClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        let { isOpen } = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <div className="container">
                    <NavLink className="navbar-brand" exact to="/">ProfBlog</NavLink>
                    <button className={`navbar-toggler${isOpen ? '' : ' collapsed'}`}
                        onClick={this.onClick}
                        type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded={isOpen}
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className={`collapse navbar-collapse${isOpen ? ' show' : ''}`} id="navbarSupportedContent">
                        <div className="navbar-nav mr-auto">
                            <NavLink className="nav-link" exact to="/">
                                Home
                            </NavLink>
                            <NavLink className="nav-link" to="/p/1">
                                Blog Posts
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
