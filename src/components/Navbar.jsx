import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ onClick }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div className="container">
      <NavLink className="navbar-brand" exact to="/">
        <span>ProfBlog</span>
      </NavLink>
      <button className="navbar-toggler" onClick={onClick}
        type="button" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav mr-auto">
          <NavLink className="nav-link" to="/p/1">
            <span>Blog Posts</span>
          </NavLink>
        </div>
      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  onClick: PropTypes.func
};

export default Navbar;
