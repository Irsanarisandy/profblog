import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onClick, mobileMenuState }) => (
    <nav className={`bg-dark sidebar${mobileMenuState ? ' sidebar--show' : ''}`}>
        <NavLink className="sidebar__links" exact to="/" onClick={onClick}>
            <span className="sidebar__links-text">ProfBlog</span>
        </NavLink>
        <hr className="sidebar__break" />
        <NavLink className="sidebar__links" to="/p/1" onClick={onClick}>
            <span className="sidebar__links-text">Blog Posts</span>
        </NavLink>
    </nav>
);

Sidebar.propTypes = {
    onClick: PropTypes.func,
    mobileMenuState: PropTypes.bool
}

export default Sidebar;
